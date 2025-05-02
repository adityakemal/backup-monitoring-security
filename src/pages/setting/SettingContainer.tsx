import HeaderCustom from "../shared/components/HeaderCustom";
import LayoutCustom from "../shared/components/LayoutCustom";
import ChangePasswordForm from "./components/ChangePasswordForm";
import { GrUserSettings } from "react-icons/gr";

export default function SettingContainer() {
  return (
    <LayoutCustom>
      <main className="space-y-5">
        <div className="bg-white">
          <ChangePasswordForm />
        </div>
      </main>
    </LayoutCustom>
  );
}
