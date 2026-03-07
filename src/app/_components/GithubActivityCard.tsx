import { GitHubActivity } from "@/app/_components/github-calendar-wrapper";

export default function GithubContribution() {
  return (
    <div
      style={{
        padding: "20px",
        background: "#0d1117",
        borderRadius: "10px",
      }}>
      <h2 style={{ color: "white" }}>
        My GitHub Contributions
      </h2>

      <GitHubActivity />
    </div>
  );
}
