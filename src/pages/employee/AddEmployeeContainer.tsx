import React from "react";
import LayoutCustom from "../shared/components/LayoutCustom";
import HeaderCustom from "../shared/components/HeaderCustom";
import FormEmployee from "./components/FormEmployee";

export default function AddEmployeeContainer() {
  return (
    <LayoutCustom>
      <div className="space-y-5">
        <HeaderCustom title="Add Employee" withBack />
        <FormEmployee />
      </div>
    </LayoutCustom>
  );
}
