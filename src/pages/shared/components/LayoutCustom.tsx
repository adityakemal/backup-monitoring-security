import { ReactNode } from "react";
import { Grid, Layout } from "antd";
import NavbarCustom from "./NavbarCustom";
import SidebarCustom from "./SidebarCustom";
import { useSharedStore } from "../shared.store";
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

  return (
    <Layout className="!m-0 !p-0 !w-full">
      <SidebarCustom disableSidebar={disableSidebar} />
      <Layout className="!pb-0 bg-white h-dvh">
        <NavbarCustom disableSidebar={disableSidebar} />
        <div className={` ${!collapsed && !sm && " hidden"}  transition-all`}>
          <Content className=" overflow-y-auto  !m-[0] h-[calc(100dvh-64px)] bg-white">
            <div className="container p-4 md:p-5 mx-auto">{children}</div>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};
export default LayoutCustom;
