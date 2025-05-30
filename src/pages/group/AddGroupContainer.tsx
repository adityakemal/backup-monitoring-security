import React from "react";
import LayoutCustom from "../shared/components/LayoutCustom";
import HeaderCustom from "../shared/components/HeaderCustom";
import FormGroup from "./components/FormGroup";

export default function AddGroupContainer() {
  return (
    <LayoutCustom>
      <div className="space-y-5">
        <HeaderCustom title="Add Group" withBack />
        <FormGroup />
      </div>
    </LayoutCustom>
  );
}
