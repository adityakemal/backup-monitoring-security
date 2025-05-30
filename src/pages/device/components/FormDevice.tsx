import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import FormGenerator from "../../shared/components/FormGenerator";
import { usePostDevice } from "../device.store";
import { message } from "antd";

const FormDevice = () => {
  const [hookFormGenerator] = Form.useForm();
  const { mutate: postDevice } = usePostDevice();
  const navigate = useNavigate();

  const handleSubmit = async (value: any) => {
    try {
      const res: any = await postDevice(value);
      message.success("Device created successfully");
      navigate(-1);
      hookFormGenerator.resetFields();
    } catch (error) {
      message.error("Device created failed");
    }
  };

  const dataForm = [
    {
      name: "device_name",
      label: "Device Name",
      type: "text",
      placeholder: "Device Name",
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: "device_identifier",
      label: "Device Identifier",
      type: "text",
      placeholder: "Device Identifier",
      rules: [
        {
          required: true,
        },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Description",
      rules: [
        {
          required: false,
        },
      ],
    },
  ];

  return (
    <div className="w-full md:max-w-[720px] ">
      <FormGenerator
        hookForm={hookFormGenerator}
        onFinish={handleSubmit}
        data={dataForm}
        id="dynamicForm"
        size="default"
        layout="vertical"
      />
      <div className="text-center">
        <Button
          form="dynamicForm"
          htmlType="submit"
          className="mt-3 w-full text-white"
          size="large"
          type="primary"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormDevice;
