import { Space, Table, Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetData } from "../api/hooks";
import { useSelector } from "react-redux";
import Add_Task from "./Add_Task";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "createdAt",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
    render: (project) => {
      return <p>{project.name}</p>;
    },
  },

  {
    title: "AssignedTo",
    dataIndex: "assignedTo",
    key: "assignedTo",
    render: (_, { assignedTo }) => {
      return (
        <Space
          size="middle"
          style={{
            maxWidth: "100px",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {assignedTo.map((staf) => {
            return staf.name + ",";
          })}
        </Space>
      );
    },
  },
  {
    title: "DueDate",
    dataIndex: "dueDate",
    key: "dueDate",
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

const Tasks = () => {
const [openAddTaskDrawer, setOpenAddTaskDrawer] = useState(false);
  const showAddTaskDrawer = () => {
    setOpenAddTaskDrawer(true);
  };
  const closeAddTaskDrawer = () => {
    setOpenAddTaskDrawer(false);
  };
  const { tableData: taskTableData } = useSelector((state) => state.task);
  const { getTasks } = useGetData();

  useEffect(() => {
    if (!taskTableData.length) {
      getTasks({ page: 1, limit: 10 });
    }
  }, []);
  return (
    <>
        <Button
          onClick={showAddTaskDrawer}
          style={{
          alignSelf: "end",
          marginBottom: "1rem",
          minWidth: "140px",
          minHeight: "40px",
        }}
          type="primary"
        >
          Create New Task
        </Button>
      <Drawer
        title="Create a new Task"
        width={720}
        onClose={closeAddTaskDrawer}
        open={openAddTaskDrawer}
      >
        <Add_Task />
      </Drawer>
      <Table columns={columns} dataSource={taskTableData} />
    </>
  );
};

export default Tasks;
