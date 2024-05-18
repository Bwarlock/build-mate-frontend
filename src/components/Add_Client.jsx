import { Button, ConfigProvider, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useAddData, useGetData } from "../api/hooks";
import { useSelector } from "react-redux";
import { Drawer } from "antd";

const Add_Client = () => {
  const [openAddClientDrawer, setOpenAddClientDrawer] = useState(false);
  const showAddClientDrawer = () => {
    setOpenAddClientDrawer(true);
  };
  const closeAddClientDrawer = () => {
    setOpenAddClientDrawer(false);
  };
  //Add Client Page Component
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    companyName: "",
    project: [],
  });

  const { selectData: projectSelectData } = useSelector(
    (state) => state.project
  );
  const { addClient } = useAddData();
  const { selectProjects } = useGetData();

  useEffect(() => {
    if (!projectSelectData.length) {
      selectProjects({ page: 1, limit: 10 });
    }
  }, []);

  const handleSubmit = () => {
    addClient(values);
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#283149",
        },
      }}
    >
      <Form
        name="addClient"
        style={{
          maxWidth: 600,
          backgroundColor: "white",
          padding: "2rem 2rem 0rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input Client Name!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setValues((val) => {
                return { ...val, name: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Company Name" name="companyName" rules={[]}>
          <Input
            onChange={(e) => {
              setValues((val) => {
                return { ...val, companyName: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input Client Email!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setValues((val) => {
                return { ...val, email: e.target.value };
              });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input Client password!",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => {
              setValues((val) => {
                return { ...val, password: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item
          label="PhoneNumber"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input Client PhoneNumber!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setValues((val) => {
                return { ...val, phoneNumber: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Project" name="project" rules={[]}>
          <Select
            mode="multiple"
            onChange={(e) => {
              setValues((val) => {
                return { ...val, project: [...e] };
              });
            }}
            style={{
              width: 120,
            }}
            options={projectSelectData}
          />
        </Form.Item>

        <Form.Item wrapperCol={{}}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
export default Add_Client;
