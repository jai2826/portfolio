"use client";
import { useGitHubData } from "@/hooks/useGitHubData";
import { useEffect } from "react";

const ContributionCalendar = ({
  username,
}: {
  username: string;
}) => {
  const { data, loading } = useGitHubData(username);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const generateGrid = () => {
    const weeks = [];

    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 365);

    // align to Sunday
    startDate.setDate(
      startDate.getDate() - startDate.getDay(),
    );

    let current = new Date(startDate);

    for (let w = 0; w < 53; w++) {
      const week = [];

      for (let d = 0; d < 7; d++) {
        const date = new Date(current);

        week.push({
          date: date.toISOString().slice(0, 10),
          month: date.getMonth(),
          day: date.getDate(),
        });

        current.setDate(current.getDate() + 1);
      }

      weeks.push(week);
    }

    return weeks;
  };

  const grid = generateGrid();

  useEffect(() => {
    const el = document.getElementById("calendar-scroll");
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  if (loading)
    return (
      <div className="text-zinc-500 animate-pulse text-xs">
        Loading activity...
      </div>
    );

  return (
    <div className="w-full bg-background pt-2 rounded-xl  border-zinc-800">
      <div className="flex gap-3">
        {/* Day Labels */}
        <div className="flex flex-col justify-between text-[10px] text-zinc-500 mt-6 h-[90px]">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* Calendar */}
        <div
          id="calendar-scroll"
          className="overflow-x-auto w-full">
          <div className=" w-full">
            {/* Month labels */}
            <div className="flex mb-1">
              {grid.map((week, i) => {
                const first = week[0];
                const showMonth = first.day <= 7;

                return (
                  <div
                    key={i}
                    className="w-[14px] text-[10px] text-zinc-500 flex-shrink-0">
                    {showMonth ? months[first.month] : ""}
                  </div>
                );
              })}
            </div>

            {/* Contribution grid */}
            <div className="flex gap-[3px] md:gap-[5px]">
              {grid.map((week, w) => (
                <div
                  key={w}
                  className="flex flex-col gap-[3px] md:gap-[5px] flex-shrink-0">
                  {week.map((day) => {
                    const level = data?.[day.date] || 0;

                    return (
                      <div
                        key={day.date}
                        title={day.date}
                        className={`w-[11px] h-[11px] md:w-[14px] md:h-[14px] rounded-[2px] ${getLevelClass(level)}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 text-[12px] text-zinc-500">
        <span className="font-bold">
          GitHub Contributions
        </span>

        <div className="flex items-center gap-2">
          <span>Less</span>

          <div className="flex gap-[3px] ">
            {[0, 1, 2, 3, 4].map((l) => (
              <div
                key={l}
                className={`w-[10px] h-[10px] rounded-[2px] ${getLevelClass(l)}`}
              />
            ))}
          </div>

          <span>More</span>
        </div>
      </div>
    </div>
  );
};

const getLevelClass = (level: number) => {
  const levels: Record<number, string> = {
    0: "bg-[#ebedf0] dark:bg-[#161b22]",
    1: "bg-[#9be9a8] dark:bg-[#0e4429]",
    2: "bg-[#40c463] dark:bg-[#006d32]",
    3: "bg-[#30a14e] dark:bg-[#26a641]",
    4: "bg-[#216e39] dark:bg-[#39d353]",
  };

  return levels[level] || levels[0];
};

export default ContributionCalendar;
