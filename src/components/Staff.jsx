import { Space, Table, Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { useGetData } from "../api/hooks";
import { useSelector } from "react-redux";
import Add_Staff from "./Add_Staff";
//Column Titles
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
    key: "companyName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "PhoneNumber",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Projects",
    dataIndex: "projects",
    key: "projects",
    render: (_, { projects }) => {
      return (
        <Space
          size="middle"
          style={{
            maxWidth: "100px",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {projects.map((proj) => {
            return proj.name + ",";
          })}
        </Space>
      );
    },
  },

  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button type="primary" danger>
          Delete
        </Button>
      </Space>
    ),
  },
];

const Staff = () => {
  const [openAddStaffDrawer, setOpenAddStaffDrawer] = useState(false);
  const showAddStaffDrawer = () => {
    setOpenAddStaffDrawer(true);
  };
  const closeAddStaffDrawer = () => {
    setOpenAddStaffDrawer(false);
  };
  //Staff Table Page Component
  const { tableData: staffTableData } = useSelector((state) => state.staff);
  const { getStaff } = useGetData();

  useEffect(() => {
    if (!staffTableData.length) {
      getStaff({ page: 1, limit: 10 });
    }
  }, []);
  return (
    <>
      <Button
        onClick={showAddStaffDrawer}
        style={{
          alignSelf: "end",
          marginBottom: "1rem",
          minWidth: "140px",
          minHeight: "40px",
        }}
        type="primary"
      >
        Onboard New Staff
      </Button>
      <Drawer
        title="Onboard Staff to BuildMate"
        onClose={closeAddStaffDrawer}
        open={openAddStaffDrawer}
      >
        <Add_Staff />
      </Drawer>
      <Table columns={columns} dataSource={staffTableData} />
    </>
  );
};
export default Staff;
