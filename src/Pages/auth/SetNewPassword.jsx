import { Form, Input, Button } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    toast.success("Your password has been updated.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center font-poppins p-4">
      <div className="w-full max-w-[650px] bg-white rounded-2xl shadow-sm p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.svg" alt="EzyGut" className="h-12 object-contain" />
        </div>

        <h1 className="text-xl font-semibold text-gray-800 mb-6">Set new password</h1>

        <Form layout="vertical" onFinish={onFinish} className="w-full">
          <div className="mb-1">
            <label className="text-sm text-gray-600 font-medium">Current Password</label>
          </div>
          <Form.Item
            name="currentPassword"
            rules={[{ required: true, message: "Please enter your current password!" }]}
            className="mb-4"
          >
            <Input.Password
              placeholder="••••••••"
              className="h-[42px] px-4 border-gray-300 rounded-lg text-sm"
            />
          </Form.Item>

          <div className="mb-1">
            <label className="text-sm text-gray-600 font-medium">New Password</label>
          </div>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your new password!" },
              { min: 6, message: "Password must be at least 6 characters long!" },
            ]}
            className="mb-4"
          >
            <Input.Password
              placeholder="••••••••"
              className="h-[42px] px-4 border-gray-300 rounded-lg text-sm"
            />
          </Form.Item>

          <div className="mb-1">
            <label className="text-sm text-gray-600 font-medium">Confirm New Password</label>
          </div>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
            className="mb-5"
          >
            <Input.Password
              placeholder="••••••••"
              className="h-[42px] px-4 border-gray-300 rounded-lg text-sm"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-[42px] rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#00AAA7", borderColor: "#00AAA7" }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SetNewPassword;