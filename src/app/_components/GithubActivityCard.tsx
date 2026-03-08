import ContributionCalendar from "@/app/_components/GitHubCalendar";

export default function GithubContribution() {
  return (
    <div className="w-full flex flex-col">
      {" "}
      <h2 className="text-xl font-semibold">
        My GitHub Contributions
      </h2>
      <ContributionCalendar username="jai2826" />
    </div>
  );
}
