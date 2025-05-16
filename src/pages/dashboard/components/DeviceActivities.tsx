import { Button, Table, Tag, Tooltip } from "antd";
import { DeviceStats } from "../../../types/dashboard.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaChrome, FaUsb } from "react-icons/fa";
import { FaFileCircleExclamation } from "react-icons/fa6";
import { MdAppsOutage, MdOutlineFitScreen } from "react-icons/md";

dayjs.extend(relativeTime);

export default function DeviceTable({
  deviceStatus,
}: {
  deviceStatus: DeviceStats[];
}) {
  const columns: any = [
    {
      title: "DEVICE ID",
      dataIndex: "device_identifier",
      key: "device_identifier",
    },
    {
      title: "ACTIVITIES",
      dataIndex: "total_activities",
      key: "total_activities",
      render: (_: any, object: any) => (
        <div className="flex flex-col gap-1">
          <div className="font-bold">{object.total_activities}</div>
          <div className="grid grid-cols-3 items-center gap-1 font-mono w-fit text-xs">
            <Tooltip title="Screen Activities" placement="top">
              <span className="whitespace-nowrap flex items-center gap-1 rounded-md !text-black bg-[#e9d502] p-1">
                <MdOutlineFitScreen color="" /> {object?.activity_count}
              </span>
            </Tooltip>
            <Tooltip title="App Usage" placement="top">
              <span className="whitespace-nowrap flex items-center gap-1 rounded-md !text-black bg-[#e9d502] p-1">
                <MdAppsOutage color="" /> {object?.app_usage_count}
              </span>
            </Tooltip>
            <Tooltip title="Website Visits" placement="top">
              <span className="whitespace-nowrap flex items-center gap-1 rounded-md !text-black bg-[#e9d502] p-1">
                <FaChrome color="" /> {object?.website_visits}
              </span>
            </Tooltip>
            <Tooltip title="File Operations" placement="top">
              <span className="whitespace-nowrap flex items-center gap-1 rounded-md !text-black bg-[#e9d502] p-1">
                <FaFileCircleExclamation color="" /> {object?.file_operations}
              </span>
            </Tooltip>
            <Tooltip title="USB Events" placement="top">
              <span className="whitespace-nowrap flex items-center gap-1 rounded-md !text-black bg-[#e9d502] p-1">
                <FaUsb color="" /> {object?.usb_events}
              </span>
            </Tooltip>
          </div>
        </div>
      ),
    },
    {
      title: "FLAGGED",
      dataIndex: "flagged",
      align: "center",
      key: "flagged",
      render: (_: any, record: any) =>
        record.flagged_count > 0 ? (
          <Tag color="red">{record.flagged_count}</Tag>
        ) : (
          <Tag color="green">{record.flagged_count}</Tag>
        ),
    },
    {
      title: "LAST SEEN",
      dataIndex: "lastSeen",
      key: "lastSeen",
      render: (_: any, object: any) => (
        <div className="flex flex-col gap-1">
          <div className="text-xs text-neutral-400">
            {dayjs(object.last_seen).fromNow()}
          </div>
        </div>
      ),
    },
    {
      title: "DETAILS",
      key: "details",
      render: () => <Button type="link">Details</Button>,
    },
  ];
  return (
    <div className=" overflow-y-auto max-h-[50vh]">
      {/* <pre>{JSON.stringify(deviceStatus, null, 2)}</pre> */}
      <Table
        dataSource={deviceStatus}
        size="small"
        // bordered
        columns={columns}
        pagination={false}
      />
    </div>
  );
}
