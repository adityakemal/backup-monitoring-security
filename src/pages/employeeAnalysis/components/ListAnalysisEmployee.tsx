import { useGetEmpoyeeAnalyticDailyInsight } from "../employeeAnalysis.store";
import { AnalyticsEmployeeDailyInsight } from "../../../types/analytics.type";
import dayjs from "dayjs";

// Fungsi untuk menentukan warna dan interpretasi risk_score
function getRiskScoreStyle(value: number) {
  if (value >= 90)
    return {
      color: "text-green-600 dark:text-green-400 font-bold",
      label: "Low risk",
    };
  if (value >= 70)
    return {
      color: "text-yellow-500 dark:text-yellow-300 font-bold",
      label: "Moderate risk",
    };
  if (value >= 40)
    return {
      color: "text-orange-500 dark:text-orange-400 font-bold",
      label: "High risk",
    };
  return {
    color: "text-red-500 dark:text-red-400 font-bold",
    label: "Critical risk",
  };
}

// Untuk skor lain (misal productivity/violations) tetap pakai 3 warna
function getScoreColor(value: number) {
  if (value >= 80) return "text-green-600 dark:text-green-400 font-bold";
  if (value >= 60) return "text-yellow-500 dark:text-yellow-300 font-bold";
  return "text-red-500 dark:text-red-400 font-bold";
}

export default function ListAnalytics() {
  const { data, isLoading } = useGetEmpoyeeAnalyticDailyInsight({
    limit: 1,
    offset: 0,
  });

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {data?.results?.map((item: AnalyticsEmployeeDailyInsight) => {
        const risk = getRiskScoreStyle(item.risk_score);
        return (
          <div
            key={item.id}
            className="border border-gray-200 px-4 py-3 rounded-xl mb-2 space-y-3"
          >
            {/* Row 1: Employee Name & Date */}
            <div className="flex justify-between items-center">
              <p className="leading-tight">{item.employee?.full_name}</p>

              <i className="leading-tight text-xs text-neutral-400">
                {dayjs(item.date).format("DD MMMM YYYY")}
              </i>
            </div>
            {/* Row 2: Risk, Summary, Behavioral Patterns (kiri) & Violations, Productivity (kanan) */}
            <div className="flex gap-4 flex-wrap md:flex-nowrap">
              {/* Kiri */}
              <div className="w-full  flex gap-4">
                <div className="">
                  <span className="font-semibold text-xs text-neutral-500 leading-tight">
                    Risk
                  </span>
                  <p className={`leading-tight text-5xl  ${risk.color}`}>
                    {item.risk_score}%
                  </p>
                  <span className={`text-xs ${risk.color}`}>{risk.label}</span>
                </div>
                <div className="">
                  <span className="font-semibold text-xs text-neutral-500 leading-tight">
                    Summary
                  </span>
                  <p className="leading-tight text-xs">{item.summary}</p>
                </div>
              </div>
              {/* Kanan */}
              <div className="w-full flex gap-4 ">
                <div className="">
                  <span className="font-semibold text-xs text-neutral-500 leading-tight">
                    Productivity
                  </span>
                  <p
                    className={`leading-tight text-5xl ${getScoreColor(
                      item.productivity_score
                    )}`}
                  >
                    {item.productivity_score}%
                  </p>
                </div>
                <div className="">
                  <span className="font-semibold text-xs text-neutral-500 leading-tight">
                    Behavioral Patterns
                  </span>
                  <p className="leading-tight text-xs">
                    {item.behavioral_patterns}
                  </p>
                  {/* <span className="font-semibold text-xs text-neutral-500 leading-tight">
                    Violations:
                  </span>
                  <p
                    className={`leading-tight text-4xl ${getScoreColor(
                      Number(item.violations || 0)
                    )}`}
                  >
                    {item.violations || 0}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
