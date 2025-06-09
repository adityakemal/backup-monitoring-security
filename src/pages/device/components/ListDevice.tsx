import React, { useState } from "react";
import { Table, Button, Tag, Tooltip, Modal, Spin, Descriptions } from "antd";
import { EyeOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetDevice, useGetDeviceDetails } from "../device.store";
import { useStorageStore } from "../../shared/storage.store";
import colors from "../../../lib/colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ListDevice = () => {
  const navigate = useNavigate();
  const { mode } = useStorageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

  const {
    data: deviceDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
    refetch: refetchDetails,
  } = useGetDeviceDetails({
    id: selectedDeviceId,
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useGetDevice({
    offset: 0,
    limit: 10,
  });

  const handleDetails = async (id: number) => {
    console.log("Opening details for device ID:", id);
    setSelectedDeviceId(id);
    setIsModalOpen(true);

    if (id) {
      refetchDetails();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDeviceId(null);
  };

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "DEVICE NAME",
      dataIndex: "device_name",
      key: "device_name",
    },
    {
      title: "IDENTIFIER",
      dataIndex: "device_identifier",
      key: "device_identifier",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
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
          <Tooltip title="Edit Device">
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
    <>
      <Table
        columns={columns}
        dataSource={data?.results}
        loading={isLoading}
        pagination={{
          size: "default",
          current: page,
          // current: parseInt(CurrentPage),
          // defaultCurrent: 1,
          onChange: (p) => {
            setPage(p);
          },
          pageSize: pageSize,
          // size: pageSize,
          showSizeChanger: true,
          total: data?.count,
          onShowSizeChange: (p, s) => {
            setPage(p);
            setPageSize(s);
          },
          showTotal: (total, range) => (
            <span style={{ left: 0, position: "absolute", fontSize: 12 }}>
              Showing {range[0]} to {range[1]} of {total} results
            </span>
          ),
        }}
      />

      <Modal
        title="Device Details"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        <Spin spinning={isLoadingDetails}>
          {detailsError ? (
            <div>Error loading device details.</div>
          ) : deviceDetails ? (
            <pre>{JSON.stringify(deviceDetails, null, 2)}</pre>
          ) : (
            <div>No details available.</div>
          )}
        </Spin>
      </Modal>
    </>
  );
};

export default ListDevice;
