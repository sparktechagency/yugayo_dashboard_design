import { useState } from "react";
import { Table, Modal, Button, Avatar, Tooltip, Image } from "antd";
import { MdClose } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setSelectedUser] = useState(null);
  const usersList = [
    {
      key: "1",
      id: "#1",
      name: "Mahfuz",
      gender: "male",
      email: "dXWtT@example.com",
      education: "B.Sc CSE",
      country: "Bangladesh",
      age: 26,
      avatar: "https://i.pravatar.cc/150?img=50",
      interest: ["Cricket", "Football", "Tennis"],
      livingIn: "Dhaka",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      key: "2",
      id: "#2",
      name: "Ahsan",
      gender: "male",
      email: "ahsan@example.com",
      education: "B.Sc CSE",
      country: "Bangladesh",
      age: 25,
      avatar: "https://i.pravatar.cc/150?img=51",
      interest: ["Cricket", "Coding", "Traveling"],
      livingIn: "Dhaka",
      about: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  const handleView = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: <div className="font-bold font-poppins text-xl">S.lD</div>,
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <span className="text-[15px] font-poppins text-gray-600 ">{text}</span>
      ),
    },
    {
      title: <div className="font-bold font-poppins text-xl">Full Name</div>,
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center font-poppins">
          <Avatar src={record.avatar} className="mr-2 w-10 h-10" />
          <span className="text-[15px]  text-gray-600">{text}</span>
        </div>
      ),
    },
    {
      title: <div className="font-bold font-poppins text-xl">Email</div>,
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <div className="flex items-center font-poppins">
          <span className="text-[15px]  text-gray-600">{text}</span>
        </div>
      ),
    },
    {
      title: <div className="font-bold font-poppins text-xl">Country</div>,
      dataIndex: "country",
      key: "country",
      render: (text) => (
        <span className="text-[15px] font-poppins text-gray-600">{text}</span>
      ),
    },
    {
      title: <div className="font-bold font-poppins text-xl">Gender</div>,
      dataIndex: "gender",
      key: "gender",
      render: (text) => (
        <span className="text-[15px] font-poppins text-gray-600">{text}</span>
      ),
    },
    {
      title: <div className="font-bold font-poppins text-xl">Age</div>,
      dataIndex: "age",
      key: "age",
      render: (text) => (
        <span className="text-[15px] font-poppins text-gray-600">{text}</span>
      ),
    },
    {
      title: <div className="font-bold text-xl font-poppins">Education</div>,
      dataIndex: "education",
      key: "education",
      render: (text) => (
        <span className="text-[15px] font-poppins text-gray-600">{text}</span>
      ),
    },
    {
      title: <div className="font-bold font-poppins text-xl">Action</div>,
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2 font-poppins items-center">
          <Tooltip title="View">
            <Button
              type="text"
              icon={<CgProfile size={20} className="" />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className=" min-h-screen">
      <div className="bg-white p-6 border-gray-700  border-2 rounded-md">
        <div className="flex justify-between flex-wrap mb-10">
          <h1 className="text-2xl font-bold">Users List</h1>
        </div>

        <Table
          columns={columns}
          dataSource={usersList}
          pagination={{
            defaultPageSize: 10,
            position: ["bottomCenter"],
          }}
          className="border-gray-200 rounded-lg overflow-hidden"
        />
      </div>

      {/* User Details Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        width={500}
        className="rounded-lg overflow-hidden"
        closeIcon={<MdClose className="text-white top-4 right-4 text-lg" />}
        centered
      >
        <div className="bg-gray-800 py-4 p-2 -mt-6 -mx-6 mb-6 text-white text-center relative">
          <div className="mx-auto w-24 h-24 bg-gray-300 rounded-full overflow-hidden border-4 border-white">
            <Image
              src={userDetails?.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <h2 className="text-xl font-bold mt-2 !font-poppins">
            {userDetails?.name}
          </h2>
        </div>

        <div className="px-6 !font-poppins">
          <section className="grid grid-cols-2">
            <div className="mb-4">
              <h3 className="text-gray-500 text-sm">Name</h3>
              <p>{userDetails?.name}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-gray-500 text-sm">Gender</h3>
              <p>{userDetails?.gender}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-gray-500 text-sm">Email</h3>
              <p>{userDetails?.email}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-gray-500 text-sm">Country</h3>
              <p>{userDetails?.country}</p>
            </div>
          </section>

          <section className="grid grid-cols-2">
            <div className="mb-4">
              <h3 className="text-gray-500 text-sm">Age</h3>
              <p>{userDetails?.age}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-gray-500 text-sm">Education</h3>
              <p>{userDetails?.education}</p>
            </div>
          </section>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
