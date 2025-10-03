#!/usr/bin/env node

/**
 * Fetch GitHub contribution data using GraphQL API
 * Requires GITHUB_TOKEN environment variable
 */

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = 'nogu66';

if (!GITHUB_TOKEN) {
  console.error('Error: GITHUB_TOKEN environment variable is required');
  console.error('Create a token at: https://github.com/settings/tokens');
  console.error('Usage: GITHUB_TOKEN=your_token node scripts/fetch-contributions.mjs');
  process.exit(1);
}

const query = `
  query($username: String!, $from: DateTime, $to: DateTime) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
        restrictedContributionsCount
      }
    }
  }
`;

async function fetchContributions() {
  try {
    // Get date range for the past year
    const to = new Date().toISOString();
    const from = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          username: USERNAME,
          from,
          to
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      process.exit(1);
    }

    const collection = data.data.user.contributionsCollection;
    const weeks = collection.contributionCalendar.weeks;
    const totalContributions = collection.contributionCalendar.totalContributions;
    const restrictedContributions = collection.restrictedContributionsCount;

    // Convert to our format: array of weeks, each week is array of 7 days
    const contributionData = weeks.map(week =>
      week.contributionDays.map(day => day.contributionCount)
    );

    // Generate TypeScript file
    const tsContent = `// Real contribution data for ${USERNAME} fetched from GitHub API
// Total public contributions: ${totalContributions}
// Private contributions (not shown): ${restrictedContributions}
// Combined total: ${totalContributions + restrictedContributions}
// Last updated: ${new Date().toISOString()}

export const realContributionData: number[][] = ${JSON.stringify(contributionData, null, 2)};
`;

    // Write to file
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const outputPath = path.join(__dirname, '../src/GitHubPromo/contributionData.ts');
    fs.writeFileSync(outputPath, tsContent);

    console.log(`✅ Successfully fetched contributions`);
    console.log(`📊 Public contributions: ${totalContributions}`);
    console.log(`🔒 Private contributions: ${restrictedContributions}`);
    console.log(`💯 Combined total: ${totalContributions + restrictedContributions}`);
    console.log(`📝 Data written to: ${outputPath}`);
    console.log(`📅 Weeks: ${weeks.length}, Days: ${weeks.reduce((sum, w) => sum + w.contributionDays.length, 0)}`);

  } catch (error) {
    console.error('Error fetching contributions:', error.message);
    process.exit(1);
  }
}

fetchContributions();
