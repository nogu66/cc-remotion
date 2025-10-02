import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { Repository } from "./types";

interface RepositoryShowcaseProps {
  repositories: Repository[];
  accentColor: string;
}

export const RepositoryShowcase: React.FC<RepositoryShowcaseProps> = ({
  repositories,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    config: {
      damping: 20,
    },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleTranslate = interpolate(titleProgress, [0, 1], [-30, 0]);

  return (
    <AbsoluteFill className="items-center justify-center px-20">
      <div className="w-full max-w-6xl">
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslate}px)`,
          }}
          className="mb-12"
        >
          <h2 className="text-5xl font-bold" style={{ color: accentColor }}>
            Featured Repositories
          </h2>
        </div>

        {/* Repository Grid */}
        <div className="grid grid-cols-2 gap-8">
          {repositories.slice(0, 4).map((repo, index) => {
            const repoProgress = spring({
              frame: frame - 15 - index * 5,
              fps,
              config: {
                damping: 20,
              },
            });

            const repoOpacity = interpolate(repoProgress, [0, 1], [0, 1]);
            const repoScale = interpolate(repoProgress, [0, 1], [0.8, 1]);

            return (
              <div
                key={repo.name}
                style={{
                  opacity: repoOpacity,
                  transform: `scale(${repoScale})`,
                  borderColor: accentColor,
                }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border-2"
              >
                <h3 className="text-3xl font-bold mb-3 text-black">{repo.name}</h3>
                <p className="text-lg text-black opacity-70 mb-4 line-clamp-2">
                  {repo.description || "No description provided"}
                </p>
                <div className="flex items-center gap-6 text-lg text-black">
                  {repo.language && (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span>⭐</span>
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔱</span>
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
