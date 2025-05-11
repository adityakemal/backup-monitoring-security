import { ReactNode } from "react";
import { Grid, Layout } from "antd";
import NavbarCustom from "./NavbarCustom";
import SidebarCustom from "./SidebarCustom";
import { useSharedStore } from "../shared.store";
import { useStorageStore } from "../storage.store";
import { cn } from "../../../lib/helper";
const { Content } = Layout;

type ILayoutCustomProps = {
  children: ReactNode;
  hideOutletFilter?: boolean;
  disableSidebar?: boolean;
};
const { useBreakpoint } = Grid;

const LayoutCustom = ({ children, disableSidebar }: ILayoutCustomProps) => {
  const { collapsed } = useSharedStore();
  const { sm } = useBreakpoint();
  const { mode } = useStorageStore();

  return (
    <Layout className={cn("!m-0 !p-0 !w-full ", mode)}>
      <SidebarCustom disableSidebar={disableSidebar} />
      <Layout className="!pb-0 h-dvh">
        <NavbarCustom disableSidebar={disableSidebar} />
        <div className={` ${!collapsed && !sm && " hidden"}  transition-all`}>
          <Content className=" overflow-y-auto  !m-[0] h-[calc(100dvh-64px)] bg-dynamicBase">
            <div className="container p-4 md:p-5 mx-auto">{children}</div>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};
export default LayoutCustom;
