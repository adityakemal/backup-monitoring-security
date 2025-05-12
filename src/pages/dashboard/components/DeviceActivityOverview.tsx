import { memo } from "react";
import DeviceActivities from "./DeviceActivities";
import { DashboardOverview } from "../../../types/dashboard.type";

interface DeviceActivityOverviewProps {
  overview: DashboardOverview | null;
}

const DeviceActivityOverview = ({ overview }: DeviceActivityOverviewProps) => {
  return (
    <div className="p-5 rounded-xl bg-dynamic space-y-4 max-h-[50vh]">
      <p className="font-semibold flex justify-between items-center">
        Device Activity Overview
        <span className="text-neutral-400 font-normal">
          Total Devices {overview?.total_devices}
        </span>
      </p>
      <DeviceActivities />
    </div>
  );
};

DeviceActivityOverview.displayName = "DeviceActivityOverview";

export default memo(DeviceActivityOverview);
