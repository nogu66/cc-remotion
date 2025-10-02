import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { GitHubProfile } from "./types";

interface ProfileIntroProps {
  profile: GitHubProfile;
  accentColor: string;
}

export const ProfileIntro: React.FC<ProfileIntroProps> = ({
  profile,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Avatar animation
  const avatarScale = spring({
    frame,
    fps,
    config: {
      damping: 20,
      stiffness: 80,
    },
  });

  // Name slide in
  const nameSlide = spring({
    frame: frame - 10,
    fps,
    config: {
      damping: 20,
    },
  });

  const nameOpacity = interpolate(nameSlide, [0, 1], [0, 1]);
  const nameTranslate = interpolate(nameSlide, [0, 1], [50, 0]);

  // Stats fade in
  const statsOpacity = spring({
    frame: frame - 25,
    fps,
    config: {
      damping: 30,
    },
  });

  return (
    <AbsoluteFill className="items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Avatar */}
        <div
          style={{
            transform: `scale(${avatarScale})`,
          }}
        >
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-48 h-48 rounded-full border-8"
            style={{ borderColor: accentColor }}
          />
        </div>

        {/* Name and Username */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${nameTranslate}px)`,
          }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-2 text-white">{profile.name}</h1>
          <p className="text-3xl text-white opacity-70">@{profile.username}</p>
        </div>

        {/* Stats */}
        <div
          style={{ opacity: statsOpacity }}
          className="flex gap-12 mt-4"
        >
          <div className="text-center">
            <div className="text-5xl font-bold" style={{ color: accentColor }}>
              {profile.publicRepos}
            </div>
            <div className="text-xl text-white opacity-70 mt-2">Repositories</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold" style={{ color: accentColor }}>
              {profile.followers}
            </div>
            <div className="text-xl text-white opacity-70 mt-2">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold" style={{ color: accentColor }}>
              {profile.following}
            </div>
            <div className="text-xl text-white opacity-70 mt-2">Following</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
