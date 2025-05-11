// src/pages/shared/components/ThemeToggle.tsx
import { useStorageStore } from "../storage.store";
import { Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import colors from "../../../lib/colors";

export default function ThemeToggle() {
  const { mode, setMode } = useStorageStore();

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={mode === "dark"}
        onChange={(checked) => setMode(checked ? "dark" : "light")}
        checkedChildren={
          <MoonOutlined
            style={{
              color: colors.primary.contrast,
            }}
          />
        }
        unCheckedChildren={
          <SunOutlined
            style={{
              color: colors.primary.contrast,
            }}
          />
        }
        className="!bg-mainColor dark:!bg-neutral-800 "
      />
    </div>
  );
}
