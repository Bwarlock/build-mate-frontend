import { Space, Table, Button, Drawer, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useGetData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import Add_Task from "./Add_Task";
import { setTaskTableParams } from "../store/taskSlice";
import { horizontalScroll } from "../util/functions";

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
		title: "Project",
		dataIndex: "project",
		key: "project",
		width: 150,
		ellipsis: {
			showTitle: false,
		},
		render: (project) => (
			<Tooltip placement="topLeft" title={project?.name}>
				{project?.name}
			</Tooltip>
		),
	},
	{
		title: "Assigned To",
		dataIndex: "assignedTo",
		key: "assignedTo",
		width: 300,
		ellipsis: {
			showTitle: false,
		},
		render: (_, { assignedTo }) => {
			return (
				<Tooltip
					placement="topLeft"
					title={assignedTo.reduce((accumulator, currentObject) => {
						return accumulator + currentObject.name + " , ";
					}, "")}>
					<Space
						size="small"
						style={{
							textOverflow: "ellipsis",
							overflow: "hidden",
						}}>
						{assignedTo.map((staff, index) => {
							return (
								<Tag color={"volcano"} key={index}>
									{staff?.name.toUpperCase()}
								</Tag>
							);
						})}
					</Space>
				</Tooltip>
			);
		},
	},
	{
		title: "Created By",
		dataIndex: "createdBy",
		key: "createdBy",
		width: 200,
		ellipsis: {
			showTitle: false,
		},
		render: (createdBy) => (
			<Tooltip placement="topLeft" title={createdBy?.name}>
				{createdBy?.name}
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
		width: 90,
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

	const showAddTaskDrawer = () => {
		setOpenAddTaskDrawer(true);
	};
	const closeAddTaskDrawer = () => {
		setOpenAddTaskDrawer(false);
	};
	const {
		tableData: taskTableData,
		loading: taskLoading,
		tableParams: params,
	} = useSelector((state) => state.task);

	// workaround to Redux-persist object being non serializable
	const tableParams = params[0];
	const dispatch = useDispatch();
	const { getTasks } = useGetData();

	const handleTableChange = (pagination, filters, sorter) => {
		dispatch(
			setTaskTableParams({
				pagination,
				filters,
				...sorter,
			})
		);

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
				// width={720}
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
					bordered={true}
				/>
			</div>
		</>
	);
};

export default Tasks;
