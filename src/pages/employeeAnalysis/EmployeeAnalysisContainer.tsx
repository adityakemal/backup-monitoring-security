import LayoutCustom from "../shared/components/LayoutCustom";
import ListAnalysisEmployee from "./components/ListAnalysisEmployee";

export default function EmployeeAnalysisContainer() {
  return (
    <LayoutCustom>
      <div className=" space-y-4">
        <ListAnalysisEmployee />
      </div>
    </LayoutCustom>
  );
}
