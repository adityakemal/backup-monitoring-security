import { Grid, Layout, Menu } from "antd";
import { useSharedStore } from "../shared.store";
import { useNavigate } from "react-router-dom";
import { acceptablePathList } from "../../../lib/routes";
import {
  RiBarChart2Line,
  RiSettings4Line,
  RiUserSearchLine,
} from "react-icons/ri";

import LogoCustom from "./LogoCustom";
import { cn } from "../../../lib/helper";
import { useStorageStore } from "../storage.store";
import React from "react";
import colors from "../../../lib/colors";

const { Sider } = Layout;
const { useBreakpoint } = Grid;

export default function SidebarCustom({
  disableSidebar,
}: {
  disableSidebar?: boolean;
}) {
  const navigate = useNavigate();
  const { xs } = useBreakpoint();
  const { mode } = useStorageStore();

  function getItem(
    label: string,
    key: string,
    icon?: any,
    children?: any,
    disabled?: boolean
  ): any {
    const childrenList = children?.filter((f: any) => f !== undefined);
    const isSubMenuExist = key?.includes("sub_") && childrenList.length !== 0;

    const themedIcon = icon
      ? React.cloneElement(icon, {
          style: {
            color:
              mode === "dark" ? colors.text.dark.primary : colors.text.primary,
          },
        })
      : null;

    if (acceptablePathList?.includes(key) || isSubMenuExist) {
      return {
        label,
        key,
        icon: themedIcon,
        children,
        disabled,
      };
    }
    return;
  }
  const items = [
    getItem(
      "Dashboard",
      "/dashboard",
      <RiBarChart2Line className="text-mainText dark:text-mainTextDark" />
    ),
    getItem(
      "User Monitoring",
      "/user-monitoring",
      <RiUserSearchLine className="text-mainText dark:text-mainTextDark" />
    ),
    // getItem("Task Management", "sub_1", <AuditOutlined />, [
    //   getItem("Mantri Task", "/task", null),
    //   getItem("Brief Report", "/brief-report", null),
    // ]),
    // getItem("List Referral", "/list-referral", <MdBusinessCenter />, null),
    // getItem(
    //   "Monitoring Referral",
    //   "/monitoring-referral",
    //   <MdOutlineInsertChart />,
    //   null
    // ),
    // getItem(
    //   "Access Management",
    //   "/access-management",
    //   <SettingOutlined />,
    //   null
    // ),
    // getItem("Location Management", "/location", <GrMapLocation />),

    getItem(
      "Setting",
      "/setting",
      <RiSettings4Line className="text-mainText dark:text-mainTextDark" />
    ),
    {
      type: "divider", // Must have
    },
  ];

  const { collapsed, setCollapsed, setOpenKeys, openKeys } = useSharedStore();

  const pathActive = `/${
    window.location.pathname.split("/").filter((f) => f !== "")[0]
  }`;
  console.log(pathActive);

  const rootSubmenuKeys: any = ["sub_1"];

  const onOpenChange = (keys: any) => {
    console.log(keys, "keys");
    const latestOpenKey = keys.find(
      (key: string) => openKeys.indexOf(key) === -1
    );
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Sider
      className={cn(
        `min-h-screen border-r border-neutral-200 dark:border-neutral-700 !border-dashed`,
        disableSidebar ? "hidden" : "",
        mode !== "light" ? "!bg-mainBgDark" : "!bg-neutral-50"
      )}
      width={disableSidebar ? 0 : 230}
      breakpoint="md"
      collapsedWidth={xs ? 0 : disableSidebar ? 0 : 71}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        className={`w-full flex px-6 items-center justify-center pt-6 mb-6 ${
          collapsed && " hidden"
        } `}
      >
        <div className="flex items-center justify-center w-fit space-x-2">
          {/* <img src="/img/bri.png" className=" object-contain h-12" alt="logo bri" /> */}
          <LogoCustom />
        </div>
      </div>
      <Menu
        className={cn(
          "mt-2 !bg-neutral-50",
          mode !== "light" ? "!bg-mainBgDark" : "!bg-neutral-50"
        )}
        style={{ border: 0 }}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        // defaultOpenKeys={["/dashboard"]}
        mode="inline"
        selectedKeys={[pathActive]}
        // style={{ minWidth: "250px" }}
        // theme="dark"
        // inlineCollapsed={false}
        onClick={(v) => navigate(v.key)}
        items={items}
      />
    </Sider>
  );
}
