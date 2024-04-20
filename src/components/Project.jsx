import { Space, Table, Tag, Button, message } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../env/axios";

//Column Titles
const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "StartDate",
		dataIndex: "startdate",
		key: "startdate",
	},
	{
		title: "Owner",
		dataIndex: "owner",
		key: "owner",
	},
	{
		title: "Staff",
		dataIndex: "staff",
		key: "staff",
		render: (_, { staff }) => {
			return (
				<Space
					size="middle"
					style={{
						maxWidth: "100px",
						textOverflow: "ellipsis",
						overflow: "hidden",
					}}>
					{staff.map((worker) => {
						return worker + ",";
					})}
				</Space>
			);
		},
	},
	{
		title: "Client",
		dataIndex: "client",
		key: "client",
		render: (_, { client }) => {
			return (
				<Space
					size="middle"
					style={{
						maxWidth: "100px",
						textOverflow: "ellipsis",
						overflow: "hidden",
					}}>
					{client.map((clien) => {
						return clien + ",";
					})}
				</Space>
			);
		},
	},
	{
		title: "Tasks",
		dataIndex: "tasks",
		key: "tasks",
		render: (_, { tasks }) => {
			return (
				<Space
					size="middle"
					style={{
						maxWidth: "100px",
						textOverflow: "ellipsis",
						overflow: "hidden",
					}}>
					{tasks.map((task) => {
						return task + ",";
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

//Dummy Data
const data = [
	{
		key: "1",
		name: "Project 1",
		startdate: "32-20-2004",
		owner: "First Owner",
		staff: [],
		client: [],
		tasks: [],
	},
	{
		key: "2",
		name: "Project 2",
		startdate: "32-20-2004",
		owner: "First Owner",
		staff: ["nice", "developer"],
		client: ["someone"],
		tasks: ["do something"],
	},
	{
		key: "3",
		name: "Project 3",
		startdate: "32-20-2004",
		owner: "First Owner",
		staff: ["nice", "developer", "asjpdjaposd", "aisgdiua", "skajdi"],
		client: ["someone"],
		tasks: ["do something"],
	},
];

const Project = () => {
	//Projects Table Page Component
	const [data, setData] = useState([]);
	useEffect(() => {
		axiosInstance
			.get("/owner/get-projects?page=1&limit=2")
			.then((res) => {
				console.log(res.data);

				setData(
					res.data.projects.map((val, index) => {
						return {
							...val,
							key: "" + index,
							startdate: val.createdAt,
						};
					})
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e);
			});
	}, []);
	return <Table columns={columns} dataSource={data} />;
};
export default Project;
