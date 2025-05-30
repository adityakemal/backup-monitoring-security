import { useNavigate } from "react-router-dom";
import HeaderCustom from "../shared/components/HeaderCustom";
import LayoutCustom from "../shared/components/LayoutCustom";
import ListGroup from "./components/ListGroup";

export default function GroupContainer() {
  const navigate = useNavigate();
  return (
    <LayoutCustom>
      <div className="space-y-5">
        <HeaderCustom
          title="Group"
          addTitle="Add Group"
          handleAdd={() => navigate("/form-group")}
        />
        <ListGroup />
      </div>
    </LayoutCustom>
  );
}
