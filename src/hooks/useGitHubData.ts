import { useState, useEffect } from 'react';

export const useGitHubData = (username:string) => {
  const [data, setData] = useState<{ [date: string]: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        const result = await response.json();
        
        // Convert array to a Map for O(1) lookup: { "2024-01-01": 2 }
        interface Contribution {
            date: string;
            level: number;
        }

        interface ContributionMap {
            [date: string]: number;
        }

        const dataMap: ContributionMap = result.contributions.reduce((acc: ContributionMap, curr: Contribution) => {
            acc[curr.date] = curr.level;
            return acc;
        }, {});
        
        setData(dataMap);
      } catch (err) {
        console.error("Failed to fetch GitHub data", err);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchData();
  }, [username]);

  return { data, loading };
};