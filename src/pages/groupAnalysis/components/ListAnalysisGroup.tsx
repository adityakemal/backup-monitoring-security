import { useGetGroupAnalyticDailyInsight } from "../groupAnalysis.store";
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

export default function ListAnalysisGroup() {
  const { data, isLoading } = useGetGroupAnalyticDailyInsight({
    limit: 1,
    offset: 0,
  });

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
