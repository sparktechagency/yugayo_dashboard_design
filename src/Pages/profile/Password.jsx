import { Form, Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const TEAL = "#00AAA7";

const Password = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Password Updated:", values);
        message.success("Password updated successfully!");
        form.resetFields();
      })
      .catch(() => message.error("Please fill all fields correctly."));
  };

  const handleCancel = () => form.resetFields();

  const pwIcon = (visible) =>
    visible ? (
      <EyeOutlined className="text-gray-400" />
    ) : (
      <EyeInvisibleOutlined className="text-gray-400" />
    );

  return (
    <Form form={form} layout="vertical" requiredMark={false} className="font-poppins ">
      <div className="mb-1">
        <label className="text-sm text-gray-600 font-medium">Current Password</label>
      </div>
      <Form.Item
        name="currentPassword"
        rules={[{ required: true, message: "Please enter your current password" }]}
        className="mb-4"
      >
        <Input.Password
          placeholder="Enter current password"
          iconRender={pwIcon}
          className="h-[42px] rounded-xl border-gray-200 text-sm"
        />
      </Form.Item>

      <div className="mb-1">
        <label className="text-sm text-gray-600 font-medium">New Password</label>
      </div>
      <Form.Item
        name="newPassword"
        rules={[
          { required: true, message: "Please enter your new password" },
          { min: 6, message: "Minimum 6 characters" },
        ]}
        className="mb-4"
      >
        <Input.Password
          placeholder="Enter new password"
          iconRender={pwIcon}
          className="h-[42px] rounded-xl border-gray-200 text-sm"
        />
      </Form.Item>

      <div className="mb-1">
        <label className="text-sm text-gray-600 font-medium">Confirm New Password</label>
      </div>
      <Form.Item
        name="confirmPassword"
        dependencies={["newPassword"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) return Promise.resolve();
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
        className="mb-6"
      >
        <Input.Password
          placeholder="Confirm new password"
          iconRender={pwIcon}
          className="h-[42px] rounded-xl border-gray-200 text-sm"
        />
      </Form.Item>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="px-5 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <Button
          onClick={handleSave}
          className="px-6 h-[38px] rounded-xl text-sm font-medium text-white border-none"
          style={{ backgroundColor: TEAL }}
        >
          Update Password
        </Button>
      </div>
    </Form>
  );
};

export default Password;