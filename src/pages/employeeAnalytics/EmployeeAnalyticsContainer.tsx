import LayoutCustom from "../shared/components/LayoutCustom";
import ListAnalytics from "./components/ListAnalytics";

export default function EmployeeAnalyticsContainer() {
  return (
    <LayoutCustom>
      <div className=" space-y-4">
        <ListAnalytics />
      </div>
    </LayoutCustom>
  );
}
