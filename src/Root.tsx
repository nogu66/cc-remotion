import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { GitHubPromo } from "./GitHubPromo";
import { gitHubPromoSchema } from "./GitHubPromo/types";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />

      {/* GitHub Profile Promo Video */}
      <Composition
        id="GitHubPromo"
        component={GitHubPromo}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
        schema={gitHubPromoSchema}
        defaultProps={{
          profile: {
            username: "nogu66",
            name: "nogu",
            avatarUrl: "https://avatars.githubusercontent.com/u/50972802?v=4",
            publicRepos: 46,
            followers: 5,
            following: 6,
          },
          repositories: [
            {
              name: "remotion-fireship",
              description: "Fireship video made with React",
              language: "TypeScript",
              stars: 0,
              forks: 0,
            },
            {
              name: "blurry-hp",
              description: null,
              language: "TypeScript",
              stars: 0,
              forks: 0,
            },
            {
              name: "multi-youtube-reader",
              description: null,
              language: "TypeScript",
              stars: 0,
              forks: 0,
            },
            {
              name: "satorify-mcp",
              description: null,
              language: "TypeScript",
              stars: 2,
              forks: 2,
            },
          ],
          accentColor: "#6366f1",
          backgroundColor: "#0f172a",
        }}
      />
    </>
  );
};
