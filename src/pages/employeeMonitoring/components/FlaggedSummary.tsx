import { cn } from "../../../lib/helper";
import { FiCheck } from "react-icons/fi";
import { employeeMonitoringStore } from "../employeeMonitoring.store";

const flaggedData = {
  activities: 12,
  app: 15,
  web: 18,
  file: 20,
  device: 10,
};

const score =
  flaggedData.activities +
  flaggedData.app +
  flaggedData.web +
  flaggedData.file +
  flaggedData.device;

const summary = [
  { label: "Score", value: score, highlight: true, key: "score" },
  {
    label: "Flagged Activities",
    value: flaggedData.activities,
    key: "activities",
  },
  { label: "Flagged App", value: flaggedData.app, key: "app" },
  { label: "Flagged Web", value: flaggedData.web, key: "web" },
  { label: "Flagged File", value: flaggedData.file, key: "file" },
  { label: "Flagged Device", value: flaggedData.device, key: "device" },
];

export default function FlaggedSummary() {
  const { flaggedFilter, toggleFlaggedFilter } = employeeMonitoringStore();

  const handleToggle = (key: string) => {
    if (key === "score") return; // Score tidak bisa di-toggle
    toggleFlaggedFilter(key);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 w-full">
      {summary.map((item) => (
        <div
          key={item.key}
          onClick={() => handleToggle(item.key)}
          className={cn(
            "relative p-2 sm:p-3 lg:p-4 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-200",
            item.highlight
              ? "bg-mainColor text-white dark:bg-mainColorLight"
              : "bg-dynamic opacity-80 hover:opacity-100 cursor-pointer",
            flaggedFilter.includes(item.key) &&
              !item.highlight &&
              "ring-2 ring-mainColor"
          )}
        >
          {flaggedFilter.includes(item.key) && !item.highlight && (
            <div className="absolute top-1 left-1 bg-mainColor text-white rounded-full p-1">
              <FiCheck className="w-3 h-3" />
            </div>
          )}
          <div
            className={cn(
              "text-xs sm:text-sm lg:text-base font-semibold text-center",
              item.highlight ? "opacity-90" : ""
            )}
          >
            {item.label}
          </div>
          <div
            className={cn(
              "text-xl sm:text-2xl lg:text-3xl font-bold",
              item.highlight ? "opacity-100" : ""
            )}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
