import { Grid, Layout, Menu } from "antd";
import { useSharedStore } from "../shared.store";
import { BarChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { acceptablePathList } from "../../../lib/routes";
import { GrUserSettings } from "react-icons/gr";
import { AiFillSecurityScan } from "react-icons/ai";
import LogoCustom from "./LogoCustom";

const { Sider } = Layout;
const { useBreakpoint } = Grid;

export default function SidebarCustom({
  disableSidebar,
}: {
  disableSidebar?: boolean;
}) {
  const navigate = useNavigate();
  const { xs } = useBreakpoint();

  function getItem(
    label: string,
    key: string,
    icon?: any,
    children?: any,
    disabled?: boolean
  ): any {
    const childrenList = children?.filter((f: any) => f !== undefined);
    const isSubMenuExist = key?.includes("sub_") && childrenList.length !== 0;
    if (acceptablePathList?.includes(key) || isSubMenuExist) {
      return { label, key, icon, children, disabled };
    }
    return;
  }

  const items = [
    getItem("Dashboard", "/dashboard", <BarChartOutlined />),
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

    getItem("Setting", "/setting", <GrUserSettings />, null),
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
      className={`min-h-screen  !bg-neutral-50 ${
        disableSidebar ? "hidden" : ""
      }`}
      theme="light"
      width={disableSidebar ? 0 : 230}
      // collapsible
      breakpoint="md"
      collapsedWidth={xs ? 0 : disableSidebar ? 0 : 71}
      // collapsedWidth={0}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}>
      <div
        className={`w-full flex px-6 items-center justify-center pt-6 mb-6 ${
          collapsed && " hidden"
        } `}>
        <div className="flex items-center justify-center w-fit space-x-2">
          {/* <img src="/img/bri.png" className=" object-contain h-12" alt="logo bri" /> */}
          <LogoCustom />
        </div>
      </div>
      {/* <p className="text-4xl text-center pt-6">logo</p> */}
      <Menu
        className="mt-2 !bg-neutral-50"
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
