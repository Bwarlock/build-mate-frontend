import { Space, Table, Tag, Button, message, Card } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../env/axios";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

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
	{
		key: "4",
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
	// const [data, setData] = useState([]);
	// useEffect(() => {
	// 	axiosInstance
	// 		.get("/owner/get-projects?page=1&limit=2")
	// 		.then((res) => {
	// 			console.log(res.data);

	// 			setData(
	// 				res.data.projects.map((val, index) => {
	// 					return {
	// 						...val,
	// 						key: "" + index,
	// 						startdate: val.createdAt,
	// 					};
	// 				})
	// 			);
	// 		})
	// 		.catch((e) => {
	// 			console.log(e);
	// 			message.error(e);
	// 		});
	// }, []);
	return (
		<>
			<div className="gridded">
				{data.map((pro, index) => {
					return (
						<Card
							className="card"
							key={index}
							title={pro.name}
							extra={
								<Link to={"/dashboard/project/" + pro.id ? pro.id : ""}>
									More
								</Link>
							}
							style={{
								width: 300,
								height: "fit-content",
								textWrap: "nowrap",
								// borderRadius: 10,
							}}>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>STAFF : </span>
								{pro.staff.join(", ")}
							</p>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>CLIENT : </span>
								{pro.client.join(", ")}
							</p>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>TASKS : </span>
								{pro.tasks.join(", ")}
							</p>
							<small>
								{pro.startdate}&nbsp;&nbsp; - &nbsp;&nbsp;{pro.owner}
							</small>
						</Card>
						// <div className="card" key={index}>
						// 	{JSON.stringify(pro)}
						// </div>
					);
				})}
				<Link
					style={{ justifySelf: "center", alignSelf: "center" }}
					to="/dashboard/add_project">
					<Card
						className="card"
						key="Add"
						hoverable
						style={{
							width: 180,
							height: 180,
							// margin: 20,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							// borderRadius: 10,
						}}>
						<PlusOutlined style={{ fontSize: 24 }} />
					</Card>
				</Link>
			</div>
			{/* <Table columns={columns} dataSource={data} />; */}
		</>
	);
};
export default Project;
