import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    navigate("/verify-code");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center font-poppins p-4">
      <div className="w-full  max-w-[650px] bg-white rounded-2xl shadow-sm p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.svg" alt="EzyGut" className="h-12 object-contain" />
        </div>

        <h1 className="text-xl font-semibold text-gray-800 mb-1">Forget Password</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email address to get a verification code for resetting your password.
        </p>

        <Form layout="vertical" onFinish={onFinish} className="w-full">
          <div className="mb-1">
            <label className="text-sm text-gray-600 font-medium">Email</label>
          </div>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Email is Required" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            className="mb-5"
          >
            <Input
              placeholder="mostain@gamil.com"
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
              Send Code
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;