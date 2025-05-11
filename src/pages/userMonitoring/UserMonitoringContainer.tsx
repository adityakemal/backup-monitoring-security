import { BsActivity, BsDeviceSsd, BsFileCheck, BsUsb } from "react-icons/bs";

import LayoutCustom from "../shared/components/LayoutCustom";

import { cn } from "../../lib/helper";
import ChartActivityLevel from "./components/ChartActivityLevel";
import HoursActivities from "../dashboard/components/HoursActivities";
import FlaggedSummary from "./components/FlaggedSummary";
import HeaderFilterCustom from "../shared/components/HeaderFilterCustom";
import dayjs from "dayjs";
import UserFilters from "./components/UserFilters";

const data = [
  {
    color: "text-blue-600 bg-blue-0",
    icon: <BsDeviceSsd />,
    label: "Total Devices",
    value: 2,
  },
  {
    color: "text-green-600 bg-green-0",
    icon: <BsActivity />,
    label: "Total Activities",
    value: 42,
  },
  {
    color: "text-violet-600 bg-violet-0",
    icon: <BsUsb />,
    label: "USB Events",
    value: 21,
  },
  {
    color: "text-yellow-600 bg-yellow-0",
    icon: <BsFileCheck />,
    label: "File Operations",
    value: 22,
  },
];

export default function UserMonitoringContainer() {
  return (
    <LayoutCustom>
      <div className=" space-y-4">
        <UserFilters />
        <div className="flex w-full gap-4 ">
          <div className=" p-4 bg-dynamic w-2/5  items-center gap-3 rounded-xl">
            <ChartActivityLevel />
          </div>
          <div className=" p-4 bg-dynamic w-3/5 space-y-4 items-center gap-3 rounded-xl">
            <p className="font-semibold">24-Hour Activity Distribution</p>
            {/* <div className="  h-full w-full"> */}
            <HoursActivities />
            {/* </div> */}
          </div>
        </div>

        {/* <div className=" p-4 bg-dynamic w-2/5  items-center gap-3 rounded-xl">
            <ChartActivityLevel />
          </div>
          <div className=" p-4 bg-dynamic w-3/5 space-y-4 items-center gap-3 rounded-xl">
            <p className="font-semibold">24-Hour Activity Distribution</p>
            <HoursActivities />
          </div> */}
        <FlaggedSummary />
      </div>
    </LayoutCustom>
  );
}
