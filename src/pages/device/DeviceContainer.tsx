import { useNavigate } from "react-router-dom";
import HeaderCustom from "../shared/components/HeaderCustom";
import LayoutCustom from "../shared/components/LayoutCustom";
import ListDevice from "./components/ListDevice";

export default function DeviceContainer() {
  const navigate = useNavigate();
  return (
    <LayoutCustom>
      <div className="space-y-5">
        <HeaderCustom
          title="Device"
          addTitle="Add Device"
          handleAdd={() => navigate("/form-device")}
        />
        <ListDevice />
      </div>
    </LayoutCustom>
  );
}
