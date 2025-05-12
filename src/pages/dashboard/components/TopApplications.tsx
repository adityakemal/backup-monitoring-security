import { memo } from "react";
import { TbAppsFilled } from "react-icons/tb";
import { TopApp } from "../../../types/dashboard.type";

interface TopApplicationsProps {
  apps: TopApp[];
}

const TopApplications = ({ apps }: TopApplicationsProps) => {
  return (
    <div className="p-5 rounded-xl bg-dynamic space-y-4">
      <p className="font-semibold flex justify-between items-center">
        Top Applications
      </p>
      {apps.map((item) => (
        <div
          key={item.name}
          className="flex justify-between items-start pb-3 last:-none"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-full flex items-center justify-center">
              <TbAppsFilled className="text-green-500 w-3 h-3" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium ">{item.name}</span>
              <span className="text-xs text-neutral-500">
                Used {item.usage_count}{" "}
                {item.usage_count > 1 ? "times" : "time"}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium ">{item.total_duration}s</span>
            <span className="text-xs text-green-500 whitespace-nowrap">
              Active: {item.active_time}s
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

TopApplications.displayName = "TopApplications";

export default memo(TopApplications);
