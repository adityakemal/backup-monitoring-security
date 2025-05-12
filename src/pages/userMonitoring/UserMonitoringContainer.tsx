import LayoutCustom from "../shared/components/LayoutCustom";

import ChartActivityLevel from "./components/ChartActivityLevel";
import FlaggedSummary from "./components/FlaggedSummary";

import UserFilters from "./components/UserFilters";

export default function UserMonitoringContainer() {
  return (
    <LayoutCustom>
      <div className=" space-y-4">
        <UserFilters />

        <FlaggedSummary />

        <div className="flex w-full gap-4 ">
          <div className=" p-4 bg-dynamic w-2/5  items-center gap-3 rounded-xl">
            <ChartActivityLevel />
          </div>
          <div className=" p-4 bg-dynamic w-3/5 space-y-4 items-center gap-3 rounded-xl">
            <p className="font-semibold">24-Hour Activity Distribution</p>
            {/* <div className="  h-full w-full"> */}
            {/* <HoursActivities /> */}
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
      </div>
    </LayoutCustom>
  );
}
