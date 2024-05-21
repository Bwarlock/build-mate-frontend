import { Space, Table, Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetData } from "../api/hooks";
import Add_Client from "./Add_Client";
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
	const [openAddClientDrawer, setOpenAddClientDrawer] = useState(false);
	const showAddClientDrawer = () => {
		setOpenAddClientDrawer(true);
	};
	const closeAddClientDrawer = () => {
		setOpenAddClientDrawer(false);
	};
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
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
				}}>
				<Button
					onClick={() => {
						getClients({ page: 1, limit: 10 });
					}}>
					Refetch Data
				</Button>
				<Button
					onClick={showAddClientDrawer}
					style={{
						alignSelf: "end",
						marginBottom: "1rem",
						minWidth: "140px",
						minHeight: "40px",
					}}
					type="primary">
					Onboard New Client
				</Button>
			</div>
			<Drawer
				title="Onboard a new Client to Build Mate"
				width={720}
				onClose={closeAddClientDrawer}
				open={openAddClientDrawer}>
				<Add_Client />
			</Drawer>
			<Table columns={columns} dataSource={clientTableData} />
		</>
	);
};
export default Clients;
