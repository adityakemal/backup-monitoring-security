import FormGenerator from "../../shared/components/FormGenerator";
import { Button, Form, message, Modal, notification } from "antd";
import { usePostEmployee } from "../employee.store";
import { useNavigate } from "react-router-dom";

export default function FormEmployee() {
  const [hookFormGenerator] = Form.useForm();
  const { mutate: postEmployee } = usePostEmployee();
  const navigate = useNavigate();
  //   const { loading } = useAuthStore();
  //   const { handleToken } = useStorageStore();
  //   const { postLogin } = useAuthStore();

  const handleSubmit = async (value: any) => {
    try {
      const res: any = await postEmployee(value);
      message.success("Employee created successfully");
      navigate(-1);
      hookFormGenerator.resetFields();
    } catch (error) {
      message.error("Employee created failed");
    }
    // try {
    //   // const res: any = await postLogin(value);
    //   console.log(value);
    //   // notification.success({ message: "Login Berhasil" });
    //   const res: any = await postLogin(value);
    //   console.log(res);
    //   handleToken({
    //     token: res.access,
    //     full_name: value.email,
    //     email: value.email,
    //     role: "superadmin",
    //     refresh_token: res.refresh,
    //   });
    //   // setTimeout(() => {
    //   // }, 1000);
    //   // handleToken(res);
    // } catch (error: any) {
    //   console.log(error.response);
    //   Modal.error({
    //     title: "Failed ",
    //     content: Object?.values(error?.response?.data) || "",
    //   });
    // }
  };

  const dataForm = [
    {
      name: "full_name",
      label: "Full Name",
      type: "text",
      placeholder: "Full Name",
      //   className: "h-[44px] text-base",
      rules: [
        {
          required: true,
          // message: "Personal Number harus diisi",
        },
      ],
    },

    {
      name: "role",
      label: "Role",
      type: "text",
      placeholder: "Role",
      //   className: "h-[44px] text-base",
      rules: [
        {
          required: true,
          // message: "Personal Number harus diisi",
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
        size="default" //small , default , large
        layout="vertical" //vertical, horizontal
        // disabled={loading}
        // formStyle={{ maxWidth: "100%" }}
      />
      <div className="text-center">
        <Button
          form="dynamicForm"
          htmlType="submit"
          className="mt-3 w-full text-white"
          size="large"
          type="primary"
          // shape="round"
          //   loading={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
