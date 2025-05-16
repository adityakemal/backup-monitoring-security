import { memo } from "react";
import DeviceActivities from "./DeviceActivities";
import { DashboardOverview, DeviceStats } from "../../../types/dashboard.type";

interface DeviceActivityOverviewProps {
  overview: DashboardOverview | null;
  deviceStatus: DeviceStats[] | null;
}

const DeviceActivityOverview = ({
  overview,
  deviceStatus,
}: DeviceActivityOverviewProps) => {
  return (
    <div className="p-5 rounded-xl bg-dynamic space-y-4 max-h-[50vh] flex flex-col">
      <p className="font-semibold flex justify-between items-center">
        Device Activity Overview
        <span className="text-neutral-400 font-normal">
          Total Devices {overview?.total_devices}
        </span>
      </p>
      <DeviceActivities deviceStatus={deviceStatus || []} />
    </div>
  );
};

DeviceActivityOverview.displayName = "DeviceActivityOverview";

export default memo(DeviceActivityOverview);
