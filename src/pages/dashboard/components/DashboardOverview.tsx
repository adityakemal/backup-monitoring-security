import { memo } from "react";
import {
  BsActivity,
  BsApp,
  BsAppIndicator,
  BsDeviceSsd,
  BsFileCheck,
  BsGlobe,
  BsUsb,
} from "react-icons/bs";
import { cn } from "../../../lib/helper";
import { DashboardOverview as DashboardOverviewType } from "../../../types/dashboard.type";

interface DashboardOverviewProps {
  overview: DashboardOverviewType | null;
}

const DashboardOverview = ({ overview }: DashboardOverviewProps) => {
  const data = [
    {
      color: "text-blue-600 bg-blue-0",
      icon: <BsDeviceSsd />,
      label: "Total Devices",
      value: overview?.total_devices,
    },
    {
      color: "text-green-600 bg-green-0",
      icon: <BsActivity />,
      label: "Total Activities",
      value: overview?.total_activity_logs,
    },
    {
      color: "text-violet-600 bg-violet-0",
      icon: <BsUsb />,
      label: "USB Events",
      value: overview?.total_usb_events,
    },
    {
      color: "text-yellow-600 bg-yellow-0",
      icon: <BsFileCheck />,
      label: "File Operations",
      value: overview?.total_file_access,
    },
    {
      color: "text-blue-400 bg-yellow-0",
      icon: <BsGlobe />,
      label: "Website Visits",
      value: overview?.total_website_visits,
    },
    {
      color: "text-yellow-600 bg-yellow-0",
      icon: <BsAppIndicator />,
      label: "App Usage",
      value: overview?.total_app_usage,
    },
  ];

  return (
    <>
      {data.map((res, i) => (
        <div
          key={i}
          className="p-4 gap-3 w-full bg-dynamic flex basis-1/6 items-center flex-wrap  rounded-xl"
        >
          <div
            className={cn(
              "p-2 aspect-square border rounded-full shrink-0 text-xl !text-mainColor dark:!text-white"
              //   res?.color
            )}
          >
            {res.icon}
          </div>
          <div className="">
            <p className="">{res.label}</p>
            <p className="text-2xl font-bold">{res.value}</p>
          </div>
        </div>
      ))}
    </>
  );
};

DashboardOverview.displayName = "DashboardOverview";

export default memo(DashboardOverview);
