import { Form, Select, Button, Modal, Input, message, Alert } from "antd";
import { useState } from "react";

import {
  useCreateLocation,
  useUpdateLocation,
  useDeleteLocation,
  useListCity,
  useListDistrict,
  useListProvince,
  useListSubDistrict,
} from "../../../hooks/useLocation";
import {
  DeleteFilled,
  //   DeleteOutlined,
  EditOutlined,
  //   EyeFilled,
  //   PlusOutlined,
} from "@ant-design/icons";
import { useIsMobile } from "../../../hooks/useIsMobile";

export default function FormLocation() {
  const isMobile = useIsMobile();
  const formSize = isMobile ? "middle" : "large";
  const [form] = Form.useForm();

  // Add mutation hooks
  const { mutate: createLocation } = useCreateLocation();
  const { mutate: updateLocation } = useUpdateLocation();
  const { mutate: deleteLocation } = useDeleteLocation();

  const watchProvinceId = Form.useWatch("province", form);
  const watchCityId = Form.useWatch("city", form);
  const watchDistrictId = Form.useWatch("district", form);
  // const watchSubDistrictId = Form.useWatch("subdistrict", form);

  // Fetch location data using custom hooks
  const { data: provinceData, isFetching: isFetchingProvince } =
    useListProvince({});

  const { data: cityData, isFetching: isFetchingCity } = useListCity({
    province: watchProvinceId,
    page_size: 1000,
  });

  const { data: districtData, isFetching: isFetchingDistrict } =
    useListDistrict({
      city: watchCityId,
      page_size: 1000,
    });

  const { data: subDistrictData, isFetching: isFetchingSubDistrict } =
    useListSubDistrict({
      district: watchDistrictId,
      page_size: 1000,
    });

  // Add state for edit mode
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedUuid, setSelectedUuid] = useState("");
  const [modalForm] = Form.useForm();

  // Update modal handlers
  const showModal = (
    type: string,
    mode: "add" | "edit" = "add",
    uuid?: string
  ) => {
    setModalType(type);
    setModalMode(mode);
    setIsModalOpen(true);
    modalForm.resetFields();

    if (mode === "edit" && uuid) {
      // console.log(uuid, "uuid");
      // console.log(mode, "mode");
      // console.log(type, "type");

      setSelectedUuid(uuid);
      const value = form.getFieldValue(type);
      const item = findItemByUuid(type, value);
      if (item) {
        modalForm.setFieldsValue({ name: item.name });
        if (type === "subdistrict") {
          modalForm.setFieldsValue({ postal_code: item.postal_code });
        }
      }
    }
  };
  // Helper function to find item by UUID
  const findItemByUuid = (type: string, uuid: string) => {
    const dataMap = {
      province: provinceData?.results,
      city: cityData?.results,
      district: districtData?.results,
      subdistrict: subDistrictData?.results,
    };
    return dataMap[type as keyof typeof dataMap]?.find(
      (item) => item.uuid === uuid
    );
  };
  const handleModalSubmit = () => {
    modalForm.validateFields().then((values) => {
      interface paramsType {
        province?: string;
        city?: string;
        district?: string;
        subdistrict?: string;
        postal_code?: string | number;
      }
      const paramsForCreate: paramsType = {};
      if (modalType === "city") {
        paramsForCreate.province = watchProvinceId;
      }
      if (modalType === "district") {
        paramsForCreate.city = watchCityId;
      }
      if (modalType === "subdistrict") {
        paramsForCreate.district = watchDistrictId;
        paramsForCreate.postal_code = values.postal_code;
      }

      if (modalMode === "add") {
        createLocation({
          type: modalType,
          name: values.name,
          ...paramsForCreate,
        });
      } else {
        updateLocation({
          type: modalType,
          uuid: selectedUuid,
          name: values.name,
          ...paramsForCreate,
        });
        message.success(`Updated successfully`);
      }
      setIsModalOpen(false);
      modalForm.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    modalForm.resetFields();
  };

  const handleDelete = (type: string) => {
    const value = form.getFieldValue(type);
    if (!value) return;

    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete this ${type}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteLocation({
          type,
          uuid: value,
        });
        form.resetFields();
        message.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`
        );
      },
    });
  };

  // Helper component for action buttons
  const ActionButtons = ({ type }: { type: string }) => {
    const value = Form.useWatch(type, form);

    // Determine if Add button should be disabled based on dependencies
    const isAddDisabled = () => {
      switch (type) {
        case "city":
          return !watchProvinceId;
        case "district":
          return !watchCityId;
        case "subdistrict":
          return !watchDistrictId;
        default:
          return false; // Province doesn't have dependencies
      }
    };

    return (
      <div className="flex gap-2">
        <Button
          onClick={() => showModal(type, "add")}
          className=""
          size={formSize}
          shape="round"
          type="primary"
          disabled={isAddDisabled()}>
          Add
        </Button>
        <Button
          onClick={() => {
            if (value) showModal(type, "edit", value);
          }}
          icon={<EditOutlined className="text-xl" />}
          type="primary"
          shape="circle"
          size={formSize}
          className="bg-yellow-500"
          disabled={!value}
        />
        <Button
          onClick={() => handleDelete(type)}
          icon={<DeleteFilled className="text-xl" />}
          shape="circle"
          danger
          size={formSize}
          type="primary"
          disabled={!value}
        />
      </div>
    );
  };

  return (
    <div className="py-6 space-y-6 container">
      <Alert
        className="w-fit !text-xs !text-gray-700"
        message={
          <p>
            Pilih lokasi terkebih dahulu untuk <strong>Edit / Delete</strong>,
            dan fungsi <strong>Add</strong> akan non aktif jika input di atas
            nya belum di pilih. <br />{" "}
            <strong className="text-red-600">
              Jika manghapus lokasi maka turunannya akan ikut terhapus.
            </strong>{" "}
            <span>
              Contoh Jika menghapus Provinsi Jawa Barat maka seruluh kota,
              kecamatan dan kelurahan di Provinsi Jawa Barat akan ikut terhapus.
            </span>
          </p>
        }
        type="info"
        showIcon
      />
      <div className="">
        <Form
          form={form}
          layout="vertical"
          size={formSize}
          onFinishFailed={(v: any) => console.log(v)}>
          <div className="flex items-center gap-x-2">
            <Form.Item
              className="w-full"
              name="province"
              label="Provinsi"
              rules={[{ required: true, message: "Please select province!" }]}>
              <Select
                placeholder="Select Province"
                loading={isFetchingProvince}
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) => {
                  const labelMatch = option.label
                    ?.toLowerCase()
                    ?.includes(input.toLowerCase());
                  const nameMatch = option.name
                    ?.toLowerCase()
                    ?.includes(input.toLowerCase());
                  return labelMatch || nameMatch;
                }}
                onChange={() => {
                  //reset
                  form.setFieldValue("city", undefined);
                  form.setFieldValue("district", undefined);
                  form.setFieldValue("subdistrict", undefined);
                }}
                options={provinceData?.results.map((item) => ({
                  value: item.uuid,
                  label: item.name,
                }))}
              />
            </Form.Item>
            <ActionButtons type="province" />
          </div>
          <div className="flex items-center gap-x-2">
            <Form.Item
              name="city"
              className="w-full"
              label="Kota/Kabupaten"
              rules={[{ required: true, message: "Please select city!" }]}>
              <Select
                placeholder="Select City"
                loading={isFetchingCity}
                disabled={!watchProvinceId}
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) => {
                  const labelMatch = option.label
                    ?.toLowerCase()
                    ?.includes(input.toLowerCase());
                  const nameMatch = option.name
                    ?.toLowerCase()
                    ?.includes(input.toLowerCase());
                  return labelMatch || nameMatch;
                }}
                onChange={() => {
                  // Reset downstream fields
                  form.setFieldValue("district", undefined);
                  form.setFieldValue("subdistrict", undefined);
                }}
                options={cityData?.results.map((item) => ({
                  value: item.uuid,
                  label: item.name,
                }))}
              />
            </Form.Item>
            <ActionButtons type="city" />
          </div>

          <div className="flex items-center gap-x-2">
            <Form.Item
              name="district"
              className="w-full"
              label="Kecamatan"
              rules={[{ required: true, message: "Please select district!" }]}>
              <Select
                placeholder="Select District"
                loading={isFetchingDistrict}
                disabled={!watchCityId}
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) => {
                  const labelMatch = option.label
                    ?.toLowerCase()
                    ?.includes(input.toLowerCase());
                  const nameMatch = option.name
                    ?.toLowerCase()
                    ?.includes(input.toLowerCase());
                  return labelMatch || nameMatch;
                }}
                onChange={() => {
                  // Reset downstream fields
                  form.setFieldValue("subdistrict", undefined);
                }}
                options={districtData?.results.map((item) => ({
                  value: item.uuid,
                  label: item.name,
                }))}
              />
            </Form.Item>
            <ActionButtons type="district" />
          </div>

          <div className="flex items-center gap-x-2">
            <Form.Item
              className="w-full"
              name="subdistrict"
              label="Kelurahan"
              rules={[
                { required: true, message: "Please select subdistrict!" },
              ]}>
              <Select
                placeholder="Select Subdistrict"
                loading={isFetchingSubDistrict}
                disabled={!watchDistrictId}
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) => {
                  const labelMatch = option.label
                    ?.toLowerCase()
                    ?.includes(input.toLowerCase());
                  const nameMatch = option.name
                    ?.toLowerCase()
                    ?.includes(input.toLowerCase());
                  return labelMatch || nameMatch;
                }}
                options={subDistrictData?.results.map((item) => ({
                  value: item.uuid,
                  label: item.name,
                  postal_code: item.postal_code,
                }))}
              />
            </Form.Item>
            <ActionButtons type="subdistrict" />
          </div>

          {/* <Form.Item>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Submit
          </button>
        </Form.Item> */}
        </Form>
      </div>

      <Modal
        title={`${modalMode === "add" ? "Add New" : "Edit"} ${
          modalType.charAt(0).toUpperCase() + modalType.slice(1)
        }`}
        open={isModalOpen}
        onOk={handleModalSubmit}
        onCancel={handleModalCancel}>
        <Form form={modalForm} layout="vertical" size={formSize}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}>
            <Input placeholder={`Enter ${modalType} name`} />
          </Form.Item>
          {modalType === "subdistrict" && (
            <Form.Item
              name="postal_code"
              label="Kode Pos"
              rules={[
                { required: true, message: "Please input the name!" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Kode pos harus berupa angka!",
                },
                { len: 5, message: "Harus 5 digit!" },
              ]}>
              <Input placeholder={`Enter postal code`} className="w-full" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}
