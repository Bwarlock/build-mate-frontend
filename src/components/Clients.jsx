import { Space, Table, Button, Drawer, Tooltip, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetData } from "../api/hooks";
import Add_Client from "./Add_Client";
import { horizontalScroll } from "../util/functions";
import { setClientTableParams } from "../store/clientSlice";
import { DeleteFilled } from "@ant-design/icons";

//Column Titles
const columns = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
		fixed: "left",
		width: 200,
		ellipsis: {
			showTitle: false,
		},
		render: (id) => (
			<Tooltip placement="topLeft" title={id}>
				{id}
			</Tooltip>
		),
	},
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		fixed: "left",
		width: 120,
		ellipsis: {
			showTitle: false,
		},
		render: (name) => (
			<Tooltip placement="topLeft" title={name}>
				<a>{name}</a>
			</Tooltip>
		),
	},
	{
		title: "Company Name",
		dataIndex: "companyName",
		key: "companyName",
		width: 150,
		ellipsis: {
			showTitle: false,
		},
		render: (companyName) => (
			<Tooltip placement="topLeft" title={companyName}>
				{companyName}
			</Tooltip>
		),
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
		width: 200,
		ellipsis: {
			showTitle: false,
		},
		render: (email) => (
			<Tooltip placement="topLeft" title={email}>
				{email}
			</Tooltip>
		),
	},
	{
		title: "PhoneNumber",
		dataIndex: "phoneNumber",
		key: "phoneNumber",
		width: 120,
		ellipsis: {
			showTitle: false,
		},
		render: (phoneNumber) => (
			<Tooltip placement="topLeft" title={phoneNumber}>
				{phoneNumber}
			</Tooltip>
		),
	},
	{
		title: "Projects",
		dataIndex: "projects",
		key: "projects",
		width: 400,
		ellipsis: {
			showTitle: false,
		},
		render: (_, { projects }) => {
			return (
				<Tooltip
					placement="topLeft"
					title={projects.reduce((accumulator, currentObject) => {
						return accumulator + currentObject.project_id;
					}, "")}>
					<Space
						size="small"
						style={{
							textOverflow: "ellipsis",
							overflow: "hidden",
						}}>
						{projects.map((proj, index) => {
							return (
								<Tag color={"volcano"} key={index}>
									{proj.name}
								</Tag>
							);
						})}
					</Space>
				</Tooltip>
			);
		},
	},
	{
		title: "Action",
		key: "action",
		fixed: "right",
		width: 80,
		render: () => (
			<Space
				size="small"
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
				}}>
				<Button type="primary" icon={<DeleteFilled />} danger></Button>
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
	const {
		tableData: clientTableData,
		loading: clientLoading,
		tableParams: params,
	} = useSelector((state) => state.client);
	const tableParams = params[0];
	const dispatch = useDispatch();
	const { getClients } = useGetData();

	const handleTableChange = (pagination, filters, sorter) => {
		dispatch(
			setClientTableParams({
				pagination,
				filters,
				...sorter,
			})
		);

		getClients({
			page: pagination.current,
			limit: pagination.pageSize,
		});
	};

	useEffect(() => {
		if (!clientTableData.length) {
			getClients({
				page: tableParams.pagination.current,
				limit: tableParams.pagination.pageSize,
			});
		}

		return horizontalScroll();
	}, []);
	return (
		<>
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Button
					onClick={() => {
						getClients({
							page: tableParams.pagination.current,
							limit: tableParams.pagination.pageSize,
						});
					}}>
					Refresh
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
				// width={378}
				onClose={closeAddClientDrawer}
				open={openAddClientDrawer}>
				<Add_Client />
			</Drawer>
			<div
				style={{
					width: "100%",
					overflowX: "auto",
				}}>
				<Table
					size="small"
					columns={columns}
					dataSource={clientTableData}
					scroll={{ x: 1200 }}
					loading={clientLoading}
					pagination={tableParams.pagination}
					onChange={handleTableChange}
					bordered={true}
				/>
			</div>
		</>
	);
};
export default Clients;
