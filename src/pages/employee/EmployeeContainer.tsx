import { useNavigate } from "react-router-dom";
import HeaderCustom from "../shared/components/HeaderCustom";
import LayoutCustom from "../shared/components/LayoutCustom";
import ListEmployee from "./components/ListEmployee";

export default function EmployeeContainer() {
  const navigate = useNavigate();
  return (
    <LayoutCustom>
      <div className="space-y-5">
        <HeaderCustom
          title="Employee"
          addTitle="Add Employee"
          handleAdd={() => navigate("/form-employee")}
        />
        <ListEmployee />
      </div>
    </LayoutCustom>
  );
}
