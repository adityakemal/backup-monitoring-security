import { Button, Table, Tag } from "antd";

const dataSource = [
  {
    key: "1",
    deviceId: "4c-1d-96-a2-2d-2b",
    activities: {
      total: 17,
      detail: { target: 10, mobile: 5, web: 2, folder: 0, plug: 0 },
    },
    flagged: 5,
    lastSeen: "1 week, 1 day ago",
  },
  {
    key: "2",
    deviceId: "18-c0-4d-71-2f-06",
    activities: {
      total: 7,
      detail: { target: 3, mobile: 0, web: 0, folder: 3, plug: 1 },
    },
    flagged: 0,
    lastSeen: "1 week, 1 day ago",
  },
  {
    key: "3",
    deviceId: "test-device",
    activities: {
      total: 1,
      detail: { target: 1, mobile: 0, web: 0, folder: 0, plug: 0 },
    },
    flagged: 0,
    lastSeen: "1 week, 1 day ago",
  },
];

const columns: any = [
  {
    title: (
      <span className="text-gray-500 !text-xs whitespace-nowrap">
        DEVICE ID
      </span>
    ),
    dataIndex: "deviceId",
    key: "deviceId",
    render: (text: string) => (
      <div className="text-gray-700 text-xs">{text}</div>
    ),
  },
  {
    title: (
      <span className="text-gray-500 !text-xs whitespace-nowrap">
        ACTIVITIES
      </span>
    ),
    dataIndex: "activities",
    key: "activities",
    render: (activities: any) => (
      <div className="flex flex-col gap-1">
        <div className="text-main font-bold ">{activities.total}</div>
        <div className="grid grid-cols-3 items-center gap-2 font-mono text-xs text-gray-500 w-fit">
          <span className=" whitespace-nowrap">
            🎯 {activities.detail.target}
          </span>

          <span className=" whitespace-nowrap">
            📱 {activities.detail.mobile}
          </span>

          <span className=" whitespace-nowrap">🌐 {activities.detail.web}</span>

          <span className=" whitespace-nowrap">
            📁 {activities.detail.folder}
          </span>

          <span className=" whitespace-nowrap">
            🔌 {activities.detail.plug}
          </span>
        </div>
      </div>
    ),
  },
  {
    title: (
      <span className="text-gray-500 !text-xs whitespace-nowrap">FLAGGED</span>
    ),
    dataIndex: "flagged",
    align: "center",
    key: "flagged",
    render: (flagged: number) =>
      flagged > 0 ? (
        <Tag color="red" className=" ">
          {flagged}
        </Tag>
      ) : (
        <Tag color="green" className=" ">
          {flagged}
        </Tag>
      ),
  },
  {
    title: (
      <span className="text-gray-500 !text-xs whitespace-nowrap">
        LAST SEEN
      </span>
    ),
    dataIndex: "lastSeen",
    key: "lastSeen",
    render: (text: string) => (
      <div className="text-gray-500 text-xs">{text}</div>
    ),
  },
  {
    title: (
      <span className="text-gray-500 !text-xs whitespace-nowrap">DETAILS</span>
    ),
    key: "details",
    render: () => <Button type="link">Details</Button>,
  },
];

export default function DeviceTable() {
  return (
    <Table
      dataSource={dataSource}
      size="small"
      bordered
      columns={columns}
      pagination={false}
    />
  );
}
