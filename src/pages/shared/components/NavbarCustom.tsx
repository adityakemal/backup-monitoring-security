import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Grid,
  // Modal,
  // Tag,
} from "antd";
import { Header } from "antd/lib/layout/layout";
import { IoLogOut } from "react-icons/io5";
import { useStorageStore } from "../storage.store";

import { useSharedStore } from "../shared.store";
import Hamburger from "hamburger-react";

// import { useState } from "react";
// import HeaderFilterCustom from "./HeaderFilterCustom";

const { useBreakpoint } = Grid;
export default function NavbarCustom({
  disableSidebar,
}: {
  disableSidebar?: boolean;
}) {
  const { handleLogout, role, fullname, email } = useStorageStore();
  const { sm } = useBreakpoint();

  const { collapsed, setCollapsed } = useSharedStore();

  const itemsMenu: any = [
    {
      key: "info",
      label: (
        <div className="">
          <p className="text-xs text-neutral-400">Email</p>
          <p className="mb-1 font-sans tabular-nums text-main">{email}</p>
          <p className="text-xs text-neutral-400">Personal Number</p>
          <p className="mb-1 font-sans tabular-nums text-main">1827363739903</p>
        </div>
      ),
      // icon: <IoLogOut size={16} className=" fill-red-500" />,
    },

    {
      type: "divider",
    },
    {
      key: "logout",
      style: { padding: 0 },
      label: (
        <Button
          danger
          icon={<IoLogOut size={16} />}
          className=" w-full"
          onClick={handleLogout}>
          Log Out
        </Button>
      ),
    },
  ];

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <Header
      className={` border-b pl-3 pr-6 md:pl-6 h-14  ${
        disableSidebar ? "bg-main " : "bg-white"
      } `}>
      {/* <Modal
        title="Download Report"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        okText="Download"
      >
        <div className="my-10">
          <HeaderFilterCustom />
        </div>
      </Modal> */}
      <div className="flex justify-between items-center w-full  h-full">
        <div className="flex items-center gap-x-6">
          {!disableSidebar ? (
            <Hamburger
              toggled={!collapsed}
              size={24}
              toggle={() => setCollapsed(!collapsed)}
            />
          ) : (
            <div className="flex items-center  w-fit space-x-2">
              {/* <img src="/img/bri.png" className=" object-contain h-12" alt="" /> */}
              <p className="text-lg text-mainYellow font-bold  uppercase leading-6">
                Ecosystem Tree
              </p>
            </div>
          )}
          {/* <Button
            className=""
            type="primary"
            icon={<DownloadOutlined />}
            onClick={showModal}
          >
            Download Report
          </Button> */}
        </div>
        {/* <p
          className={` text-xs md:text-xl lg:text-2xl font-semibold max-w-[50%] `}>
          {title}
        </p> */}

        {/* MENU USER */}
        <Dropdown
          menu={{
            items: itemsMenu,
          }}
          className={` cursor-pointer ${!collapsed && !sm && "hidden"}`}>
          <div className="flex items-center gap-x-3">
            <div className="flex flex-col items-end space-y-0">
              <p
                className={`capitalize mb-[2px] leading-[normal] text-[10px] md:text-sm ${
                  !disableSidebar ? "text-black " : "text-white"
                }`}>
                {fullname}
              </p>

              <div className="text-[8px] md:text-[10px] md:leading-[13px] leading-[11px] flex items-center gap-x-1 ">
                <div className="h-2 w-2 rounded-full border border-white bg-main"></div>
                <span
                  className={`${
                    disableSidebar ? "text-white" : "text-main"
                  } font-semibold`}>
                  {role}
                </span>
              </div>
            </div>
            {false ? (
              <Avatar className="shadow h-8 w-8 md:h-11 md:w-11" src={""} />
            ) : (
              <Avatar
                className="shadow h-8 w-8 md:h-11 md:w-11"
                icon={<UserOutlined />}
              />
            )}
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}
