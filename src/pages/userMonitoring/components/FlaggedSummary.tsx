import { cn } from "../../../lib/helper";

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
  { label: "Score", value: score, highlight: true },
  { label: "Flagged Activities", value: flaggedData.activities },
  { label: "Flagged App", value: flaggedData.app },
  { label: "Flagged Web", value: flaggedData.web },
  { label: "Flagged File", value: flaggedData.file },
  { label: "Flagged Device", value: flaggedData.device },
];

export default function FlaggedSummary() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 w-full my-2">
      {summary.map((item, i) => (
        <div
          key={i}
          className={cn(
            item.highlight
              ? "p-2 sm:p-3 lg:p-4 bg-mainColor text-white dark:bg-mainColorLight rounded-xl flex flex-col items-center justify-center shadow-lg"
              : "p-2 sm:p-3 lg:p-4 bg-dynamic flex flex-col items-center justify-center rounded-xl opacity-80"
          )}>
          <div
            className={cn(
              "text-xs sm:text-sm lg:text-base font-semibold text-center",
              item.highlight ? "opacity-90" : ""
            )}>
            {item.label}
          </div>
          <div
            className={cn(
              "text-xl sm:text-2xl lg:text-3xl font-bold",
              item.highlight ? "opacity-100" : ""
            )}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
