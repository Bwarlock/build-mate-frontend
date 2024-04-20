import { Space, Table, Tag, Button, Select } from "antd";

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
		title: "Workers",
		dataIndex: "workers",
		key: "workers",
		render: (_, { workers }) => {
			return (
				<Space
					size="middle"
					style={{
						maxWidth: "100px",
						textOverflow: "ellipsis",
						overflow: "hidden",
					}}>
					{workers.map((worker) => {
						return worker + ",";
					})}
				</Space>
			);
		},
	},
	{
		title: "Clients",
		dataIndex: "clients",
		key: "clients",
		render: (_, { clients }) => {
			return (
				<Space
					size="middle"
					style={{
						maxWidth: "100px",
						textOverflow: "ellipsis",
						overflow: "hidden",
					}}>
					{clients.map((client) => {
						return client + ",";
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
	// {
	// 	title: "Tags",
	// 	key: "tags",
	// 	dataIndex: "tags",
	// 	render: (_, { tags }) => (
	// 		<>
	// 			{tags.map((tag) => {
	// 				let color = tag.length > 5 ? "geekblue" : "green";
	// 				if (tag === "loser") {
	// 					color = "volcano";
	// 				}
	// 				return (
	// 					<Tag color={color} key={tag}>
	// 						{tag.toUpperCase()}
	// 					</Tag>
	// 				);
	// 			})}
	// 		</>
	// 	),
	// },
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
const data = [
	{
		key: "1",
		name: "Project 1",
		startdate: "32-20-2004",
		owner: "First Owner",
		workers: ["nice", "developer"],
		clients: ["someone"],
		tasks: ["do something"],
	},
	{
		key: "2",
		name: "Project 2",
		startdate: "32-20-2004",
		owner: "First Owner",
		workers: ["nice", "developer"],
		clients: ["someone"],
		tasks: ["do something"],
	},
	{
		key: "3",
		name: "Project 3",
		startdate: "32-20-2004",
		owner: "First Owner",
		workers: ["nice", "developer", "asjpdjaposd", "aisgdiua", "skajdi"],
		clients: ["someone"],
		tasks: ["do something"],
	},
];
const Project = () => {
	return (
		<>
			<Table columns={columns} dataSource={data} />
		</>
	);
};

export default Project;
