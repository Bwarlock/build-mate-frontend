import {
	Space,
	Table,
	Button,
	Drawer,
	Tag,
	Tooltip,
	Modal,
	Row,
	Col,
	Card,
	Flex,
	Switch,
} from "antd";
import { useEffect, useState } from "react";
import { useDeleteData, useGetData, useUpdateData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import Add_Task from "./Add_Task";
import { setTaskTableParams } from "../store/taskSlice";
import { horizontalScroll } from "../util/functions";
import {
	DeleteFilled,
	ExclamationCircleFilled,
	UndoOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AuthAxiosInstance } from "../api/axios";

const Task_Trash = () => {
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
					{/* <Link to={`/task_detail/${record._id}`}>{text}</Link> */}
					{text}
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
				<Tooltip
					placement="topLeft"
					title={new Date(createdAt)?.toDateString()}>
					{new Date(createdAt)?.toDateString()}
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
							return accumulator + currentObject?.name + " , ";
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
							title={new Date(dueDate)?.toDateString()}>
							{new Date(dueDate)?.toDateString()}
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
					<Tooltip title="Restore">
						<Button
							type="primary"
							icon={<UndoOutlined />}
							onClick={() => {
								handleRestoreTask(record?._id);
							}}></Button>
					</Tooltip>
				</Space>
			),
		},
	];

	const [showRecent, setShowRecent] = useState(true);
	const {
		trashData: taskTableData,
		loading: taskLoading,
		trashParams: taskTableParams,
	} = useSelector((state) => state.task);

	const { getTrashTasks } = useGetData();
	const { deleteTask } = useDeleteData();
	const { restoreTask } = useUpdateData();

	const handleRestoreTask = (id) => {
		restoreTask(id);
	};

	const handleTableChange = (pagination, filters, sorter) => {
		getTrashTasks(
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
			getTrashTasks();
		}
		// return horizontalScroll();
	}, []);
	return (
		<div className="insideOutlet">
			<div
				className="headingTitle"
				style={{
					marginBottom: 16,
					// padding: 16,
				}}>
				Task Trash
			</div>
			<Row
				style={{
					width: "100%",

					justifyContent: "left",
					marginBottom: 8,
				}}
				gutter={[16, 16]}>
				<Col
					span={6}
					style={{
						alignContent: "start",
						justifyContent: "start",
						padding: 0,
					}}>
					<Flex
						style={{
							flexDirection: "column",
							// paddingLeft: 32,
							height: "100%",
							justifyContent: "end",
							gap: 8,
							alignItems: "start",
						}}>
						<Card size="small" bordered>
							<span
								style={{
									display: "flex",
									alignItems: "center",
								}}>
								<Switch
									size="small"
									defaultChecked
									onChange={(checked) => {
										setShowRecent(checked);
									}}></Switch>
								&nbsp; Show Recent
							</span>
						</Card>
						<Button
							onClick={() => {
								getTrashTasks();
							}}>
							Refresh
						</Button>
					</Flex>
				</Col>
				{showRecent && (
					<>
						<Col span={6}>
							{taskTableData[2] && (
								<Card
									style={{ cursor: "unset" }}
									extra={
										<Button
											type="text"
											onClick={() => {
												handleRestoreTask(taskTableData[2]._id);
											}}>
											<UndoOutlined />
										</Button>
									}
									title={taskTableData[2].name}
									size="small"
									bordered={false}
									hoverable={true}>
									<div
										style={{
											width: "100%",
											overflow: "hidden",
											textOverflow: "ellipsis",
											textWrap: "nowrap",
										}}>
										{taskTableData[2].description}
									</div>
								</Card>
							)}
						</Col>
						<Col span={6}>
							{taskTableData[1] && (
								<Card
									style={{ cursor: "unset" }}
									extra={
										<Button
											type="text"
											onClick={() => {
												handleRestoreTask(taskTableData[1]._id);
											}}>
											<UndoOutlined />
										</Button>
									}
									title={taskTableData[1].name}
									size="small"
									bordered={false}
									hoverable={true}>
									<div
										style={{
											width: "100%",
											overflow: "hidden",
											textOverflow: "ellipsis",
											textWrap: "nowrap",
										}}>
										{taskTableData[1].description}
									</div>
								</Card>
							)}
						</Col>
						<Col span={6}>
							{taskTableData[0] && (
								<Card
									style={{ cursor: "unset" }}
									extra={
										<Button
											type="text"
											onClick={() => {
												handleRestoreTask(taskTableData[0]._id);
											}}>
											<UndoOutlined />
										</Button>
									}
									title={taskTableData[0].name}
									size="small"
									bordered={false}
									hoverable={true}>
									<div
										style={{
											width: "100%",
											overflow: "hidden",
											textOverflow: "ellipsis",
											textWrap: "nowrap",
										}}>
										{taskTableData[0].description}
									</div>
								</Card>
							)}
						</Col>
					</>
				)}
			</Row>

			<div
				style={{
					width: "100%",
					overflowX: "auto",
					// transform: "translateY(8px)",
				}}>
				<Table
					size="small"
					columns={columns}
					dataSource={taskTableData}
					scroll={{ x: 1200, y: 40000 }}
					loading={taskLoading}
					pagination={taskTableParams[0].pagination}
					onChange={handleTableChange}
					bordered={true}
					virtual={true}
				/>
			</div>
		</div>
	);
};

export default Task_Trash;
