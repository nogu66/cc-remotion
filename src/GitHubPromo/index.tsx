import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { ProfileIntro } from "./ProfileIntro";
import { RepositoryShowcase } from "./RepositoryShowcase";
import { ContributionHeatmap } from "./ContributionHeatmap";
import { GitHubPromoProps } from "./types";

export const GitHubPromo: React.FC<GitHubPromoProps> = ({
  profile,
  repositories,
  accentColor,
  backgroundColor,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {/* Background Music */}
      <Audio src={staticFile("audio/未来の設計図.mp3")} volume={0.2} />

      {/* Profile Introduction: 0-90 frames (0-3 seconds) */}
      <Sequence durationInFrames={90}>
        <ProfileIntro profile={profile} accentColor={accentColor} />
      </Sequence>

      {/* Repository Showcase: 90-180 frames (3-6 seconds) */}
      <Sequence from={90} durationInFrames={90}>
        <RepositoryShowcase
          repositories={repositories}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Contribution Heatmap: 180-270 frames (6-9 seconds) */}
      <Sequence from={180} durationInFrames={90}>
        <ContributionHeatmap accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  );
};
