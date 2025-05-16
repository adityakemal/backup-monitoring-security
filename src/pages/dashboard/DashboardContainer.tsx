import { Spin } from "antd";
import LayoutCustom from "../shared/components/LayoutCustom";
import ActivityDistribution from "./components/ActivityDistribution";
import DashboardOverview from "./components/DashboardOverview";
import DeviceActivityOverview from "./components/DeviceActivityOverview";
import RecentScreenshots from "./components/RecentScreenshots";
import TopApplications from "./components/TopApplications";
import TopWebsites from "./components/TopWebsites";
import TopKeywords from "./components/TopKeywords";
import { useDashboardData } from "../../hooks/useDashboardApi";
import { useDashboardStore } from "./dashboard.store";
import HeaderFilterCustom from "../shared/components/HeaderFilterCustom";

const DashboardContainer = () => {
  const { dateRange, setDateRange } = useDashboardStore();

  const { data: dashboardResponse, isLoading } = useDashboardData({
    date_from: dateRange[0].format("YYYY-MM-DD"),
    date_to: dateRange[1].format("YYYY-MM-DD"),
  });

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  // if (!dashboardResponse?.overview) {
  //   return null;
  // }

  return (
    <LayoutCustom>
      <div className="space-y-6">
        <div className="flex basis-6 w-full gap-4 justify-end">
          <div className="basis-2/6">
            <p className="text-xs mb-1">Date Range</p>
            <HeaderFilterCustom
              dateRangeValue={dateRange}
              handleDateRange={(value) => {
                setDateRange(value);
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          <DashboardOverview overview={dashboardResponse?.overview || null} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DeviceActivityOverview
            overview={dashboardResponse?.overview || null}
            deviceStatus={dashboardResponse?.device_stats || []}
          />
          <ActivityDistribution
            data={dashboardResponse?.activity_distribution || []}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentScreenshots
            screenshots={dashboardResponse?.recent_screenshots || []}
          />
          <TopApplications apps={dashboardResponse?.top_apps || []} />
        </div>
        {dashboardResponse && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopWebsites websites={dashboardResponse?.top_websites || []} />
            <TopKeywords keywords={dashboardResponse?.top_keywords || []} />
          </div>
        )}
      </div>
    </LayoutCustom>
  );
};

export default DashboardContainer;
