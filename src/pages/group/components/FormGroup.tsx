import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import FormGenerator from "../../shared/components/FormGenerator";
import { usePostGroup } from "../group.store";
import { message, Modal, notification } from "antd";

const FormGroup = () => {
  const [hookFormGenerator] = Form.useForm();
  const { mutate: postGroup } = usePostGroup();
  const navigate = useNavigate();

  const handleSubmit = async (value: any) => {
    try {
      const res: any = await postGroup(value);
      message.success("Group created successfully");
      navigate(-1);
      hookFormGenerator.resetFields();
    } catch (error) {
      message.error("Group created failed");
    }
  };

  const dataForm = [
    {
      name: "name",
      label: "Group Name",
      type: "text",
      placeholder: "Group Name",
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
          required: true,
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

export default FormGroup;
