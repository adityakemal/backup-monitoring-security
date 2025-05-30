import React from "react";
import LayoutCustom from "../shared/components/LayoutCustom";
import HeaderCustom from "../shared/components/HeaderCustom";
import FormDevice from "./components/FormDevice";

export default function AddDeviceContainer() {
  return (
    <LayoutCustom>
      <div className="space-y-5">
        <HeaderCustom title="Add Device" withBack />
        <FormDevice />
      </div>
    </LayoutCustom>
  );
}
