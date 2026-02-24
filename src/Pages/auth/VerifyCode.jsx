import { Button, Form } from "antd";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    if (index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;

    const pasteArray = paste.split("").slice(0, 4);
    const newOtp = Array(4).fill("");

    pasteArray.forEach((char, i) => {
      newOtp[i] = char;
    });

    setOtp(newOtp);

    const nextIndex = pasteArray.length < 4 ? pasteArray.length : 3;
    setTimeout(() => inputRefs.current[nextIndex]?.focus(), 0);
  };

  const onFinishOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      toast.error("Please enter full OTP");
      return;
    }
    console.log("Entered OTP:", enteredOtp);
    navigate("/reset-password");
  };

  const handleResendOtp = () => {
    toast.success("OTP sent successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center font-poppins p-4">
      <div className="w-full  max-w-[650px] bg-white rounded-2xl shadow-sm p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.svg" alt="EzyGut" className="h-12 object-contain" />
        </div>

        <h1 className="text-xl font-semibold text-gray-800 mb-1">Verify OTP</h1>
        <p className="text-sm text-gray-500 mb-6">
          Please check your email. We have sent a code to contact @gmail.com
        </p>

        <Form layout="vertical" onFinish={onFinishOtp} className="w-full">
          <Form.Item className="mb-4">
            <div
              className="flex gap-3 justify-center"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  inputMode="numeric"
                  className="w-16 h-16 border border-gray-300 rounded-lg text-center text-lg font-medium focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-gray-800"
                  style={{ caretColor: "transparent" }}
                />
              ))}
            </div>
          </Form.Item>

          <div className="flex items-center justify-between mb-5">
            <span className="text-sm text-gray-500">Didn&apos;t receive code?</span>
            <span
              className="text-sm text-gray-700 underline underline-offset-2 cursor-pointer hover:text-teal-600"
              onClick={handleResendOtp}
            >
              Resend
            </span>
          </div>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-[42px] rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#00AAA7", borderColor: "#00AAA7" }}
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyCode;