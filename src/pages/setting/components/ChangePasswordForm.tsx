import { Button, Divider, Form, Modal, notification } from "antd";
import FormGenerator from "../../shared/components/FormGenerator";
import { useSettingStore } from "../setting.store";

export default function ChangePasswordForm() {
  const [hookFormGenerator] = Form.useForm();

  const { postChangePassword } = useSettingStore();

  const handleSubmit = async (value: any) => {
    const data = {
      current_password: value.current_password,
      new_password: value.password,
    };
    console.log(data);

    try {
      const response = await postChangePassword(data);
      console.log(response);

      notification.success({ message: "Success" });
      hookFormGenerator.resetFields();
    } catch (error: any) {
      Modal.error({
        title: "Failed ",
        content: Object?.values(error?.response?.data) || "",
      });
    }
  };
  const dataForm = [
    {
      name: "current_password",
      label: "Password Saat ini",
      type: "password",
      placeholder: "Password Saat ini",
      rules: [
        { required: true, message: "This field is required!" },
        // {
        //   pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g),
        //   message:
        //     'Minimum eight characters, at least one letter and one number',
        // },
      ],
    },

    {
      name: "password",
      label: "Password Baru",
      type: "password",
      placeholder: "Password Baru",
      rules: [
        { required: true, message: "This field is required!" },
        {
          pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g),
          message:
            "Minimum eight characters, at least one letter and one number",
        },
      ],
    },
    //CONFIRMATION PASSWORD
    {
      name: "confirm",
      label: "Konfirmasi Password Baru",
      type: "confirm_password",
      confirmationWith: "password", //  name input to validate value are same
      placeholder: "Konfirmasi Password Baru",
      rules: [{ required: true, message: "This field is required!" }],
    },
  ];
  return (
    <div className="space-y-6 flex justify-center">
      <div className="max-w-[480px] p-6 rounded-md border w-full space-y-5">
        <p className=" text-center text-xl font-semibold font-secondary">
          Ubah Password
        </p>
        <FormGenerator
          hookForm={hookFormGenerator}
          onFinish={handleSubmit}
          data={dataForm}
          id="dynamicForm"
          size="large" //small , default , large
          layout="vertical" //vertical, horizontal
          //   className="space-y-6"
          // disabled={loading}
          // formStyle={{ maxWidth: "100%" }}
        />
        <Divider />
        <div className="flex justify-center">
          <Button
            form="dynamicForm"
            htmlType="submit"
            type="primary"
            size="large"
            // loading={loading}
          >
            Ubah Password
          </Button>
        </div>
      </div>
    </div>
  );
}
