import { useState } from "react";
import Password from "./Password";
import { Button, Form, Input, Upload, message } from "antd";
import {
  UploadOutlined,
  LoadingOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import profileImage from "../../assets/profile.png";

const TEAL = "#00AAA7";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "admin@ezygut.com",
    contact: "+1 555 123 4567",
    name: "Admin User",
    role: "System Administrator",
  });

  const handleUpdate = () => {
    if (isEditing) {
      form
        .validateFields()
        .then((values) => {
          setFormData({ ...formData, ...values });
          message.success("Profile updated successfully!");
          setIsEditing(false);
        })
        .catch(() => message.error("Please complete the form properly."));
    } else {
      setIsEditing(true);
    }
  };

  const handleImageUpload = (info) => {
    setImageLoading(true);
    const uploaded = info.file.originFileObj || info.file;
    if (!(uploaded instanceof File)) {
      message.error("Invalid file.");
      setImageLoading(false);
      return;
    }
    setTimeout(() => {
      try {
        setFormData({ ...formData, image: URL.createObjectURL(uploaded) });
        message.success("Profile image updated!");
      } catch {
        message.error("Error displaying image.");
      }
      setImageLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-poppins ">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage your account and preferences
        </p>
      </div>

      <div className="">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5">
          {/* Teal header banner */}
          <div
            className="h-20 rounded-t-2xl"
            style={{ background: `linear-gradient(135deg, ${TEAL}, #00d4cf)` }}
          />

          {/* Avatar + name */}
          <div className="px-6 pb-5 -mt-10">
            <div className="flex items-end justify-between">
              <div className="relative">
                <img
                  src={formData.image || profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML = `<div style="width:80px;height:80px;border-radius:50%;background:${TEAL};border:4px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.15);display:flex;align-items:center;justify-content:center;color:white;font-size:28px;font-weight:700">${formData.name[0]}</div>`;
                  }}
                />
                {isEditing && (
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleImageUpload}
                  >
                    <button
                      className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs shadow-md border-2 border-white"
                      style={{ backgroundColor: TEAL }}
                    >
                      {imageLoading ? (
                        <LoadingOutlined spin style={{ fontSize: 10 }} />
                      ) : (
                        <UploadOutlined style={{ fontSize: 10 }} />
                      )}
                    </button>
                  </Upload>
                )}
              </div>

              <div className="mb-1 text-right">
                <p className="text-base font-bold text-gray-800">
                  {formData.name}
                </p>
                <p className="text-sm text-gray-400">{formData.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100">
            {[
              { key: "profile", icon: <UserOutlined />, label: "Edit Profile" },
              {
                key: "password",
                icon: <LockOutlined />,
                label: "Change Password",
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-teal-500"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "profile" && (
              <Form form={form} layout="vertical" initialValues={formData}>
                <div className="grid grid-cols-1 gap-1">
                  <div className="mb-1">
                    <label className="text-sm text-gray-600 font-medium">
                      Email Address
                    </label>
                  </div>
                  <Form.Item name="email" className="mb-4">
                    <Input
                      disabled={!isEditing}
                      className="h-[42px] rounded-xl border-gray-200 text-sm"
                      placeholder="Email address"
                    />
                  </Form.Item>

                  <div className="mb-1">
                    <label className="text-sm text-gray-600 font-medium">
                      Contact Number
                    </label>
                  </div>
                  <Form.Item name="contact" className="mb-5">
                    <Input
                      disabled={!isEditing}
                      className="h-[42px] rounded-xl border-gray-200 text-sm"
                      placeholder="Contact number"
                    />
                  </Form.Item>
                </div>

                <div className="flex justify-end gap-2">
                  {isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        form.resetFields();
                      }}
                      className="px-5 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <Button
                    onClick={handleUpdate}
                    className="px-6 h-[38px] rounded-xl text-sm font-medium text-white border-none"
                    style={{ backgroundColor: TEAL }}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
              </Form>
            )}

            {activeTab === "password" && <Password />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
