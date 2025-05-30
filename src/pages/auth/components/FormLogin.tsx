import FormGenerator from "../../shared/components/FormGenerator";
import { Button, Form, Modal, notification } from "antd";
import { useAuthStore } from "../auth.store";
import { useStorageStore } from "../../shared/storage.store";
import { Link } from "react-router-dom";

export default function FormLogin() {
  const [hookFormGenerator] = Form.useForm();

  const { loading } = useAuthStore();
  const { handleToken } = useStorageStore();
  const { postLogin } = useAuthStore();

  const handleSubmit = async (value: any) => {
    try {
      // const res: any = await postLogin(value);
      console.log(value);

      // notification.success({ message: "Login Berhasil" });
      const res: any = await postLogin(value);
      console.log(res);
      handleToken({
        token: res.access,
        full_name: value.email,
        email: value.email,
        role: "superadmin",
        refresh_token: res.refresh,
      });
      // setTimeout(() => {
      // }, 1000);
      // handleToken(res);
    } catch (error: any) {
      console.log(error.response);
      Modal.error({
        title: "Failed ",
        content: Object?.values(error?.response?.data) || "",
      });
    }
  };

  const dataForm = [
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Email",
      className: "h-[44px] text-base",
      rules: [
        {
          required: true,
          // message: "Personal Number harus diisi",
          type: "email",
        },
      ],
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      className: "h-[44px] text-base",
      rules: [{ required: true, message: "Password harus diisi" }],
    },
  ];

  return (
    <div>
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
          loading={loading}
        >
          Masuk
        </Button>
      </div>
      <div className="mt-4 text-sm flex items-center space-x-1">
        <p>Lupa password? Silahkan klik</p>
        <Link to="/forgot-password" className="text-blue-500">
          disini
        </Link>
      </div>
    </div>
  );
}
