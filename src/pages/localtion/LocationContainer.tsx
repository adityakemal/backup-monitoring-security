import LayoutCustom from "../shared/components/LayoutCustom";
import HeaderCustom from "../shared/components/HeaderCustom";

import FormLocation from "./components/FormLocation";
import { GrMapLocation } from "react-icons/gr";

export default function LocationContainer() {
  return (
    <LayoutCustom>
      <main className="space-y-2 md:space-y-5 bg-white">
        <HeaderCustom
          title={
            <>
              <GrMapLocation />
              <span>Location Management</span>
            </>
          }
        />
        <div className="">
          <FormLocation />
        </div>
      </main>
    </LayoutCustom>
  );
}
