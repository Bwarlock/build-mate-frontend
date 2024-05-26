import { Button, Table, Drawer, Tooltip, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { useGetData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import Add_Project from "./Add_Project";
import { setProjectTableParams } from "../store/projectSlice";
import { horizontalScroll } from "../util/functions";
import { DeleteFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Project_Table() {
	//Projects Page Component
	const columns = [
		// TODO: add ID column
		// Manipulate the API response in the hooks to include the ID

		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			fixed: "left",
			width: 150,
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
			width: 100,
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
			title: "createdAt",
			dataIndex: "createdAt",
			key: "createdAt",
			width: 140,
			ellipsis: {
				showTitle: false,
			},
			render: (createdAt) => (
				<Tooltip placement="topLeft" title={new Date(createdAt).toDateString()}>
					{new Date(createdAt).toDateString()}
				</Tooltip>
			),
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			width: 200,
			ellipsis: {
				showTitle: false,
			},
			render: (description) => (
				<Tooltip placement="topLeft" title={description}>
					{description}
				</Tooltip>
			),
		},

		{
			title: "Client",
			dataIndex: "client",
			key: "client",
			width: 200,
			ellipsis: {
				showTitle: false,
			},
			render: (_, { client }) => {
				return (
					<Tooltip
						placement="topLeft"
						title={client.reduce((accumulator, currentObject) => {
							return accumulator + currentObject.name + " , ";
						}, "")}>
						<Space
							size="small"
							style={{
								textOverflow: "ellipsis",
								overflow: "hidden",
							}}>
							{client.map((clien, index) => {
								return (
									<Tag color={"lightblue"} key={index}>
										{clien?.name.toUpperCase()}
									</Tag>
								);
							})}
						</Space>
					</Tooltip>
				);
			},
		},
		{
			title: "Staff",
			dataIndex: "staff",
			key: "staff",
			width: 300,
			ellipsis: {
				showTitle: false,
			},
			render: (_, { staff }) => {
				return (
					<Tooltip
						placement="topLeft"
						title={staff.reduce((accumulator, currentObject) => {
							return accumulator + currentObject.name + " , ";
						}, "")}>
						<Space
							size="small"
							style={{
								textOverflow: "ellipsis",
								overflow: "hidden",
							}}>
							{staff.map((staf, index) => {
								return (
									<Tag color={"volcano"} key={index}>
										{staf?.name.toUpperCase()}
									</Tag>
								);
							})}
						</Space>
					</Tooltip>
				);
			},
		},
		{
			title: "Tasks",
			dataIndex: "tasks",
			key: "tasks",
			width: 300,
			ellipsis: {
				showTitle: false,
			},
			render: (_, { tasks }) => {
				return (
					<Tooltip
						placement="topLeft"
						title={tasks.reduce((accumulator, currentObject) => {
							return accumulator + currentObject.name + " , ";
						}, "")}>
						<Space
							size="small"
							style={{
								textOverflow: "ellipsis",
								overflow: "hidden",
							}}>
							{tasks.map((task, index) => {
								return (
									<Link color={"volcano"} key={index}>
										{task?.name.toUpperCase()}
									</Link>
								);
							})}
						</Space>
					</Tooltip>
				);
			},
		},
		{
			title: "Owner",
			dataIndex: "owner",
			key: "owner",
			width: 200,
			ellipsis: {
				showTitle: false,
			},
			render: (owner) => (
				<Tooltip placement="topLeft" title={owner}>
					{owner}
				</Tooltip>
			),
		},

		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 80,
			render: (text, record) => (
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

	const [openAddProjectDrawer, setOpenAddProjectDrawer] = useState(false);

	const showAddProjectDrawer = () => {
		setOpenAddProjectDrawer(true);
	};

	const closeAddProjectDrawer = () => {
		setOpenAddProjectDrawer(false);
	};
	const {
		tableData: projectTableData,
		loading: projectLoading,
		tableParams: params,
	} = useSelector((state) => state.project);

	// workaround to Redux-persist object being non serializable
	const tableParams = params[0];
	const dispatch = useDispatch();
	const { getProjects } = useGetData();

	const handleTableChange = (pagination, filters, sorter) => {
		dispatch(
			setProjectTableParams({
				pagination,
				filters,
				...sorter,
			})
		);

		getProjects({
			page: pagination.current,
			limit: pagination.pageSize,
		});
	};

	useEffect(() => {
		if (!projectTableData.length) {
			getProjects({
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
						getProjects({
							page: tableParams.pagination.current,
							limit: tableParams.pagination.pageSize,
						});
					}}>
					Refresh
				</Button>

				<Button
					onClick={showAddProjectDrawer}
					style={{
						alignSelf: "end",
						marginBottom: "1rem",
						minWidth: "140px",
						minHeight: "40px",
					}}
					type="primary">
					Create New Project
				</Button>
			</div>
			<Drawer
				title="Create New Project"
				onClose={closeAddProjectDrawer}
				open={openAddProjectDrawer}>
				<Add_Project />
			</Drawer>
			<div
				style={{
					width: "100%",
					overflowX: "auto",
				}}>
				<Table
					size="small"
					columns={columns}
					dataSource={projectTableData}
					scroll={{ x: 1200 }}
					loading={projectLoading}
					pagination={tableParams.pagination}
					onChange={handleTableChange}
					bordered={true}
				/>
			</div>
		</>
	);
}

export default Project_Table;
