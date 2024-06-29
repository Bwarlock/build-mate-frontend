import {
	Button,
	Table,
	Tooltip,
	Space,
	Tag,
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
import { setProjectTableParams } from "../store/projectSlice";
import { horizontalScroll } from "../util/functions";
import {
	DeleteFilled,
	ExclamationCircleFilled,
	UndoOutlined,
} from "@ant-design/icons";
import { Link, useOutletContext } from "react-router-dom";
import { useTableColumns } from "./Component_Hooks";

function Project_Trash() {
	//Projects Page Component
	const { setDrawerOpener, setShowAddButton } = useOutletContext();

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
					{name}
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
							return accumulator + currentObject?.name + " , ";
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
										{clien?.name?.toUpperCase()}
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
							return accumulator + currentObject?.name + " , ";
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
										{staf?.name?.toUpperCase()}
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
							return accumulator + currentObject?.name + " , ";
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
										{task?.name?.toUpperCase()}
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
				<Tooltip placement="topLeft" title={owner?.name}>
					{owner?.name}
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
					<Tooltip title="Restore">
						<Button
							type="primary"
							icon={<UndoOutlined />}
							onClick={() => {
								// showDeleteConfirm(record?._id);
								handleRestoreProject(record?._id);
							}}></Button>
					</Tooltip>
				</Space>
			),
		},
	];
	const [showRecent, setShowRecent] = useState(true);
	const {
		trashData: projectTableData,
		loading: projectLoading,
		trashParams: projectTableParams,
	} = useSelector((state) => state.project);
	const { getTrashProjects } = useGetData();
	const { restoreProject } = useUpdateData();

	const handleRestoreProject = (id) => {
		restoreProject(id);
	};

	const handleTableChange = (pagination, filters, sorter) => {
		getTrashProjects(
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
		if (!projectTableData.length) {
			getTrashProjects();
		}
		setShowAddButton(false);
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
				Project Trash
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
						alignContent: "end",
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
								getTrashProjects();
							}}>
							Refresh
						</Button>
					</Flex>
				</Col>
				{showRecent && (
					<>
						<Col span={6}>
							{projectTableData[2] && (
								<Card
									style={{ cursor: "unset" }}
									extra={
										<Button
											type="text"
											onClick={() => {
												handleRestoreProject(projectTableData[2]._id);
											}}>
											<UndoOutlined />
										</Button>
									}
									title={projectTableData[2]?.name}
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
										{projectTableData[2]?.description}
									</div>
								</Card>
							)}
						</Col>
						<Col span={6}>
							{projectTableData[1] && (
								<Card
									style={{ cursor: "unset" }}
									extra={
										<Button
											type="text"
											onClick={() => {
												handleRestoreProject(projectTableData[1]._id);
											}}>
											<UndoOutlined />
										</Button>
									}
									title={projectTableData[1]?.name}
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
										{projectTableData[1]?.description}
									</div>
								</Card>
							)}
						</Col>
						<Col span={6}>
							{projectTableData[0] && (
								<Card
									style={{ cursor: "unset" }}
									extra={
										<Button
											type="text"
											onClick={() => {
												handleRestoreProject(projectTableData[0]._id);
											}}>
											<UndoOutlined />
										</Button>
									}
									title={projectTableData[0]?.name}
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
										{projectTableData[0]?.description}
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
					dataSource={projectTableData}
					scroll={{ x: 1200, y: 40000 }}
					loading={projectLoading}
					pagination={projectTableParams[0].pagination}
					onChange={handleTableChange}
					bordered={true}
					virtual={true}
				/>
			</div>
		</div>
	);
}

export default Project_Trash;
