import { Space, Table, Button, Drawer, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useGetData } from "../api/hooks";
import { useSelector } from "react-redux";
import Add_Task from "./Add_Task";

const columns = [
	// TODO: add ID column
	// Manipulate the API response in the hooks to include the ID

	{
		title: "ID",
		dataIndex: "id",
		key: "id",
		fixed: "left",
		width: 200,
		ellipsis: {
			showTitle: true,
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
			showTitle: true,
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
			showTitle: true,
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
			showTitle: true,
		},
		render: (description) => (
			<Tooltip placement="topLeft" title={description}>
				{description}
			</Tooltip>
		),
	},
	{
		title: "Project",
		dataIndex: "project",
		key: "project",
		width: 150,
		ellipsis: {
			showTitle: true,
		},
		render: (project) => (
			<Tooltip placement="topLeft" title={project?.name}>
				<p>{project?.name}</p>
			</Tooltip>
		),
	},
	{
		title: "Assigned To",
		dataIndex: "assignedTo",
		key: "assignedTo",
		width: 200,
		render: (_, { assignedTo }) => {
			return (
				<Space
					size="middle"
					style={{
						textOverflow: "ellipsis",
						overflow: "hidden",
					}}>
					{assignedTo.map((staff) => {
						return (
							<Tag color={"volcano"} key={staff}>
								{staff?.name.toUpperCase()}
							</Tag>
						);
					})}
				</Space>
			);
		},
	},
	{
		title: "Created By",
		dataIndex: "createdBy",
		key: "createdBy",
		width: 200,
		ellipsis: {
			showTitle: true,
		},
		render: (createdBy) => (
			<Tooltip placement="topLeft" title={createdBy}>
				{createdBy}
			</Tooltip>
		),
	},
	{
		title: "DueDate",
		dataIndex: "dueDate",
		key: "dueDate",
		width: 200,
	},
	{
		title: "DueDate",
		dataIndex: "dueDate",
		key: "dueDate",
		width: 200,
	},
	{
		title: "DueDate",
		dataIndex: "dueDate",
		key: "dueDate",
		width: 200,
	},
	{
		title: "DueDate",
		dataIndex: "dueDate",
		key: "dueDate",
		width: 200,
	},
	{
		title: "DueDate",
		dataIndex: "dueDate",
		key: "dueDate",
		width: 200,
	},

	{
		title: "Action",
		key: "action",
		fixed: "right",
		width: 100,
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
	const [tableParams, setTableParams] = useState({
		pagination: {
			current: 1,
			pageSize: 10,
			total: 200,
		},
	});

	const showAddTaskDrawer = () => {
		setOpenAddTaskDrawer(true);
	};
	const closeAddTaskDrawer = () => {
		setOpenAddTaskDrawer(false);
	};
	const { tableData: taskTableData, loading: taskLoading } = useSelector(
		(state) => state.task
	);
	const { getTasks } = useGetData();

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
		getTasks({
			page: pagination.current,
			limit: pagination.pageSize,
		});
	};

	useEffect(() => {
		if (!taskTableData.length) {
			getTasks({
				page: tableParams.pagination.current,
				limit: tableParams.pagination.pageSize,
			});
		}

		const tableElement =
			document.getElementsByClassName("ant-table-content")[0];
		const handleWheel = (event) => {
			if (tableElement) {
				event.preventDefault();
				tableElement.scrollLeft += event.deltaY;
			}
		};
		if (tableElement) {
			tableElement.addEventListener("wheel", handleWheel);
			return () => {
				tableElement.removeEventListener("wheel", handleWheel);
			};
		}
	}, []);
	return (
		<>
			<div
				style={{
					padding: "1rem",
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Button
					onClick={() => {
						getTasks({
							page: tableParams.pagination.current,
							limit: tableParams.pagination.pageSize,
						});
					}}>
					Refresh
				</Button>

				<Button
					onClick={showAddTaskDrawer}
					style={{
						alignSelf: "end",
						marginBottom: "1rem",
						minWidth: "140px",
						minHeight: "40px",
					}}
					type="primary">
					Create New Task
				</Button>
			</div>
			<Drawer
				title="Create a new Task"
				width={720}
				onClose={closeAddTaskDrawer}
				open={openAddTaskDrawer}>
				<Add_Task />
			</Drawer>
			<div
				style={{
					width: "100%",
					overflowX: "auto",
				}}>
				<Table
					size="small"
					columns={columns}
					dataSource={taskTableData}
					scroll={{ x: 1200 }}
					loading={taskLoading}
					pagination={tableParams.pagination}
					onChange={handleTableChange}
				/>
			</div>
		</>
	);
};

export default Tasks;
