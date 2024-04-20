import { Space, Table, Tag, Button, Select, message } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../env/axios";
import { Link } from "react-router-dom";
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
		title: "Description",
		dataIndex: "description",
		key: "description",
	},
	{
		title: "Project",
		dataIndex: "project",
		key: "project",
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
						return staf + ",";
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

const Project = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		axiosInstance
			.get("/owner/get-tasks?page=1&limit=5")
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
	return (
		<>
			<Link
				to="/dashboard/add_staff"
				style={{
					alignSelf: "start",
					marginBottom: "1rem",
					minWidth: "100px",
				}}>
				<Button style={{ width: "100%" }} type="primary">
					Add
				</Button>
			</Link>
			<Table columns={columns} dataSource={data} />
		</>
	);
};

export default Project;
