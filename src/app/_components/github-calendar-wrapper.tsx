"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

// This turns off Server-Side Rendering for the calendar specifically
const DynamicGitHubCalendar = dynamic(
  () => Promise.resolve(GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="h-[150px] w-full animate-pulse bg-zinc-800 rounded-lg" />
    ),
  },
);

const githubTheme = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

export const GitHubActivity = () => {
  return (
    <div className="w-full overflow-hidden p-4">
      <DynamicGitHubCalendar
        username="jai2826"
        blockSize={12}
        blockMargin={4}
        fontSize={12}
        theme={githubTheme}
      />
    </div>
  );
};
