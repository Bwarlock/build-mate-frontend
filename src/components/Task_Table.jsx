import { Space, Table, Button, Drawer, Tag, Tooltip, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDeleteData, useGetData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import Add_Task from "./Add_Task";
import { setTaskTableParams } from "../store/taskSlice";
import { horizontalScroll } from "../util/functions";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Task_Table = () => {
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
			render: (text, record) => (
				<Tooltip placement="topLeft" title={text}>
					<Link to={`/task_detail/${record._id}`}>{text}</Link>
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
			width: 140,
			ellipsis: {
				showTitle: false,
			},
			render: (dueDate) => (
				<>
					{dueDate ? (
						<Tooltip
							placement="topLeft"
							title={new Date(dueDate).toDateString()}>
							{new Date(dueDate).toDateString()}
						</Tooltip>
					) : (
						"-"
					)}
				</>
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
					<Tooltip title="Delete">
						<Button
							type="primary"
							icon={<DeleteFilled />}
							danger
							onClick={() => {
								showDeleteConfirm(record?._id);
							}}></Button>
					</Tooltip>
				</Space>
			),
		},
	];
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
		tableParams: taskTableParams,
	} = useSelector((state) => state.task);

	const dispatch = useDispatch();
	const { getTasks } = useGetData();
	const { deleteTask } = useDeleteData();

	const showDeleteConfirm = (id) => {
		Modal.confirm({
			title: "Confirm deleting this Task?",
			icon: <ExclamationCircleFilled />,
			content: "Task will go to Trash",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			closable: true,
			maskClosable: true,
			// centered: true,
			onOk() {
				handleDeleteTask(id);
			},
			onCancel() {},
		});
	};

	const handleDeleteTask = (id) => {
		deleteTask(id);
	};

	const handleTableChange = (pagination, filters, sorter) => {
		getTasks(
			{
				page: pagination.current,
				limit: pagination.pageSize,
			},
			{
				pagination,
				filters,
				...sorter,
			}
		);
	};

	useEffect(() => {
		if (!taskTableData.length) {
			getTasks();
		}
		return horizontalScroll();
	}, []);
	return (
		<div
			style={{
				width: "100%",
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				padding: "1rem",
			}}>
			<div
				style={{
					fontSize: 32,
					fontWeight: "bold",
					display: "flex",
					justifyContent: "center",
					// padding: 16,
				}}>
				Task
			</div>
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Button
					onClick={() => {
						getTasks();
					}}>
					Refresh
				</Button>

				<Button
					onClick={showAddTaskDrawer}
					style={{
						alignSelf: "end",
						marginBottom: taskTableData.length > 9 ? "" : "1rem",
						// marginBottom: "1rem",
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
					transform: taskTableData.length > 9 ? "translateY(16px)" : "",
				}}>
				<Table
					size="small"
					columns={columns}
					dataSource={taskTableData}
					scroll={{ x: 1200 }}
					loading={taskLoading}
					pagination={taskTableParams[0].pagination}
					onChange={handleTableChange}
					bordered={true}
				/>
			</div>
		</div>
	);
};

export default Task_Table;
