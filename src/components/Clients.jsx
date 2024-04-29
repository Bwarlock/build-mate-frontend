import { Space, Table, Button } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetData } from "../api/hooks";
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
					}}>
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

const Clients = () => {
	//Clients Table Page Component
	const { tableData: clientTableData } = useSelector((state) => state.client);
	const { getClients } = useGetData();

	useEffect(() => {
		if (!clientTableData.length) {
			getClients({ page: 1, limit: 10 });
		}
	}, []);
	return (
		<>
			<Link
				to="/dashboard/add_client"
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
			<Table columns={columns} dataSource={clientTableData} />
		</>
	);
};
export default Clients;
