import { useState } from "react";
import { Button, Table, Tag, Tooltip, Modal, Spin, Descriptions } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useGetEmployee, useGetEmployeeDetails } from "../employee.store";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import colors from "../../../lib/colors";
import { useStorageStore } from "../../shared/storage.store";

dayjs.extend(relativeTime);

export default function ListEmployee() {
  const { mode } = useStorageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  // Always setup the query but disabled by default
  const {
    data: employeeDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
    refetch: refetchDetails,
  } = useGetEmployeeDetails({
    id: selectedEmployeeId,
  });

  const { data, isLoading } = useGetEmployee({
    page: 1,
    page_size: 10,
  });

  const handleDetails = async (id: number) => {
    console.log("Opening details for employee ID:", id);
    setSelectedEmployeeId(id);
    setIsModalOpen(true);

    // Manually refetch when needed
    if (id) {
      refetchDetails();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployeeId(null);
  };

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "NAME",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "GROUPS",
      dataIndex: "groups",
      key: "groups",
      render: (_: any, object: any) => (
        <div className="flex flex-col gap-1">
          <div className="font-bold">
            <div className="flex flex-wrap gap-1">
              {object.groups.map((group: any) => (
                <Tooltip
                  key={group.id}
                  title={group.description}
                  placement="top"
                >
                  <Tag color="blue">{group.name}</Tag>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "",
      key: "id",
      width: 100,
      render: (res: any) => (
        <div className="flex gap-2 justify-end">
          <Tooltip title="View Details">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => handleDetails(res.id)}
              style={{
                backgroundColor:
                  mode === "dark" ? colors.neutral[700] : colors.neutral[100],
                borderColor:
                  mode === "dark" ? colors.neutral[600] : colors.neutral[300],
                color:
                  mode === "dark"
                    ? colors.text.dark.primary
                    : colors.text.primary,
              }}
              className="hover:opacity-80 transition-opacity"
            />
          </Tooltip>
          <Tooltip title="Edit Employee">
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {}}
              style={{
                backgroundColor: colors.warning.main,
                borderColor: colors.warning.main,
                color: colors.warning.contrast,
              }}
              className="hover:opacity-80 transition-opacity"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className=" overflow-y-auto max-h-[50vh]">
      <Table
        dataSource={data?.results}
        loading={isLoading}
        columns={columns}
        pagination={false}
      />
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        <Spin spinning={isLoadingDetails}>
          {detailsError ? (
            <div>Error loading employee details.</div>
          ) : employeeDetails ? (
            <pre>{JSON.stringify(employeeDetails, null, 2)}</pre>
          ) : (
            <div>No details available.</div>
          )}
        </Spin>
      </Modal>
    </div>
  );
}
