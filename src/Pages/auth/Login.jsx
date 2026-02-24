import { Form, Input, Button, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    toast.success("Login successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center font-poppins p-4">
      <div className="w-full  max-w-[650px] bg-white rounded-2xl shadow-sm p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.svg" alt="EzyGut" className="h-12 object-contain" />
        </div>

        <h1 className="text-xl font-semibold text-gray-800 mb-1">Login</h1>
        <p className="text-sm text-gray-500 mb-6">
          Please enter your email and password to continue.
        </p>

        <Form layout="vertical" onFinish={onFinish} className="w-full">
          <div className="mb-1">
            <label className="text-sm text-gray-600 font-medium">Email</label>
          </div>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            className="mb-4"
          >
            <Input
              placeholder="mostain@gamil.com"
              className="h-[42px] px-4 border-gray-300 rounded-lg text-sm"
            />
          </Form.Item>

          <div className="mb-1">
            <label className="text-sm text-gray-600 font-medium">
              Password
            </label>
          </div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
            className="mb-2"
          >
            <Input.Password
              placeholder="••••••••"
              className="h-[42px] px-4 border-gray-300 rounded-lg text-sm"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-5">
            <Form.Item name="remember" valuePropName="checked" className="mb-0">
              <Checkbox className="text-sm text-gray-600">
                Remember password
              </Checkbox>
            </Form.Item>
            <Link
              to="/forget-password"
              className="text-sm text-gray-500 hover:text-teal-600 underline underline-offset-2"
            >
              Forgot password?
            </Link>
          </div>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-[42px] rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#00AAA7", borderColor: "#00AAA7" }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
