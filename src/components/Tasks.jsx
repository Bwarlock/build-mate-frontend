import { Space, Table, Button } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetData } from "../api/hooks";
import { useSelector } from "react-redux";

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
					}}>
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
	const { tableData: taskTableData } = useSelector((state) => state.task);
	const { getTasks } = useGetData();

	useEffect(() => {
		if (!taskTableData.length) {
			getTasks({ page: 1, limit: 10 });
		}
	}, []);
	return (
		<>
			<Link
				to="/dashboard/add_task"
				style={{
					alignSelf: "end",
					marginBottom: "1rem",
					minWidth: "140px",
					minHeight: "40px",
				}}>
				<Button style={{ width: "100%", height: "100%" }} type="primary">
					Add
				</Button>
			</Link>
			<Table columns={columns} dataSource={taskTableData} />
		</>
	);
};

export default Tasks;
