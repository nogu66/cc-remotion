import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { realContributionData } from "./contributionData";

interface ContributionHeatmapProps {
  accentColor: string;
  contributionData?: number[][];
}

const getContributionColor = (
  count: number,
  accentColor: string
): string => {
  if (count === 0) return "rgba(255, 255, 255, 0.1)";
  if (count <= 2) return `${accentColor}40`; // 25% opacity
  if (count <= 5) return `${accentColor}80`; // 50% opacity
  if (count <= 8) return `${accentColor}CC`; // 80% opacity
  return accentColor; // 100% opacity
};

export const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({
  accentColor,
  contributionData = realContributionData,
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

  return (
    <AbsoluteFill className="items-center justify-center px-20">
      <div className="w-full max-w-7xl">
        {/* Title */}
        <div
          style={{ opacity: titleOpacity }}
          className="mb-12 text-center"
        >
          <h2 className="text-5xl font-bold mb-4" style={{ color: accentColor }}>
            Contribution Activity
          </h2>
          <p className="text-2xl text-white opacity-70">52 weeks of dedication</p>
        </div>

        {/* Heatmap Grid */}
        <div className="flex gap-1 justify-center">
          {contributionData.map((week, weekIndex) => {
            const weekProgress = spring({
              frame: frame - 20 - weekIndex,
              fps,
              config: {
                damping: 30,
                mass: 0.5,
              },
            });

            const weekOpacity = interpolate(weekProgress, [0, 1], [0, 1]);
            const weekScale = interpolate(weekProgress, [0, 1], [0.3, 1]);

            return (
              <div
                key={weekIndex}
                className="flex flex-col gap-1"
                style={{
                  opacity: weekOpacity,
                  transform: `scale(${weekScale})`,
                }}
              >
                {week.map((count, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="w-4 h-4 rounded-sm transition-all duration-300"
                    style={{
                      backgroundColor: getContributionColor(count, accentColor),
                    }}
                    title={`${count} contributions`}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div
          style={{
            opacity: interpolate(frame, [60, 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
          className="flex items-center justify-center gap-3 mt-12"
        >
          <span className="text-lg text-white opacity-70">Less</span>
          {[0, 2, 5, 8, 10].map((level) => (
            <div
              key={level}
              className="w-6 h-6 rounded-sm"
              style={{
                backgroundColor: getContributionColor(level, accentColor),
              }}
            />
          ))}
          <span className="text-lg text-white opacity-70">More</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
