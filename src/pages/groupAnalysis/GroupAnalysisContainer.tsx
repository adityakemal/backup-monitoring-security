import LayoutCustom from "../shared/components/LayoutCustom";
import ListAnalysisGroup from "./components/ListAnalysisGroup";

export default function GroupAnalysisContainer() {
  return (
    <LayoutCustom>
      <div className=" space-y-4">
        <ListAnalysisGroup />
      </div>
    </LayoutCustom>
  );
}
