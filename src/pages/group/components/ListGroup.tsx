import React, { useState } from "react";
import { Table, Button, Tag, Tooltip, Modal, Spin, Descriptions } from "antd";
import { EyeOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetGroup, useGetGroupDetails } from "../group.store";
import { useStorageStore } from "../../shared/storage.store";
import colors from "../../../lib/colors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ListGroup = () => {
  const navigate = useNavigate();
  const { mode } = useStorageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  // Always setup the query but disabled by default
  const {
    data: groupDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
    refetch: refetchDetails,
  } = useGetGroupDetails({
    id: selectedGroupId,
  });

  const { data, isLoading } = useGetGroup({
    page: 1,
    page_size: 10,
  });

  const handleDetails = async (id: number) => {
    console.log("Opening details for group ID:", id);
    setSelectedGroupId(id);
    setIsModalOpen(true);

    // Manually refetch when needed
    if (id) {
      refetchDetails();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGroupId(null);
  };

  const DetailButton = ({ onClick }: { onClick: () => void }) => (
    <Tooltip title="View Details">
      <Button
        shape="circle"
        icon={<EyeOutlined />}
        onClick={onClick}
        style={{
          backgroundColor:
            mode === "dark" ? colors.neutral[700] : colors.neutral[100],
          borderColor:
            mode === "dark" ? colors.neutral[600] : colors.neutral[300],
          color:
            mode === "dark" ? colors.text.dark.primary : colors.text.primary,
        }}
        className="hover:opacity-80 transition-opacity"
      />
    </Tooltip>
  );

  const EditButton = ({ onClick }: { onClick: () => void }) => (
    <Tooltip title="Edit Group">
      <Button
        shape="circle"
        icon={<EditOutlined />}
        onClick={onClick}
        style={{
          backgroundColor: colors.warning.main,
          borderColor: colors.warning.main,
          color: colors.warning.contrast,
        }}
        className="hover:opacity-80 transition-opacity"
      />
    </Tooltip>
  );

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "GROUP NAME",
      dataIndex: "name",
      key: "name",
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
          <Tooltip title="Edit Group">
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
        rowKey="id"
        pagination={{
          total: data?.count || 0,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      {/* Group Details Modal */}
      <Modal
        title="Group Details"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        destroyOnClose={false}
        maskClosable={true}
      >
        <Spin spinning={isLoadingDetails}>
          {detailsError ? (
            <div>Error loading group details.</div>
          ) : groupDetails ? (
            <pre>{JSON.stringify(groupDetails, null, 2)}</pre>
          ) : (
            <div>No details available.</div>
          )}
        </Spin>
      </Modal>
    </>
  );
};

export default ListGroup;
