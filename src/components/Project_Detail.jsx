import {
	Button,
	Dropdown,
	Menu,
	Space,
	Badge,
	Collapse,
	ConfigProvider,
	Descriptions,
	Divider,
	Typography,
	Spin,
	Flex,
	Segmented,
	Form,
	Select,
	DatePicker,
	Tabs,
	Pagination,
	Col,
	Card,
	Statistic,
	Row,
} from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ArrowLeftOutlined,
	BarChartOutlined,
	CaretLeftFilled,
	CaretRightFilled,
	CommentOutlined,
	DownOutlined,
	EditOutlined,
	FileOutlined,
	InfoCircleOutlined,
	OrderedListOutlined,
	ProjectOutlined,
	SubnodeOutlined,
	UnorderedListOutlined,
	WarningOutlined,
} from "@ant-design/icons";
import TextEditorQuill from "./TextEditorQuill";
import { useGetData, useUpdateData } from "../api/hooks";
import dayjs from "dayjs";
import { uniqueArrayOfObjects } from "../util/functions";
import CountUp from "react-countup";

const formatter = (value) => <CountUp end={value} separator="," />;

const Project_Detail = () => {
	//Project Route Component
	const [loading, setLoading] = useState(true);
	const selectedProject =
		location.pathname?.split("/")[2]?.split("?")[0] ?? undefined;
	const { tableData: projectTableData } = useSelector((state) => state.project);
	const [editing, setEditing] = useState(false);

	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	const {
		selectData: staffSelectData,
		selectParams: staffSelectParams,
		loading: staffLoading,
	} = useSelector((state) => state.staff);
	const {
		selectData: clientSelectData,
		selectParams: clientSelectParams,
		loading: clientLoading,
	} = useSelector((state) => state.client);
	const {
		selectData: taskSelectData,
		selectParams: taskSelectParams,
		loading: taskLoading,
	} = useSelector((state) => state.task);

	const { selectStaff, selectClients, selectTasks } = useGetData();

	const [values, setValues] = useState({
		name: "",
		description: "",
		owner: { _id: "1", name: "Someone", email: "Someone@email.com" },
		staff: [],
		client: [],
		tasks: [],
		updatedAt: "2024-05-28T08:55:09.948Z",
		createdAt: "2024-05-28T08:55:09.948Z",
		project_id: "Project-1",
		isTrash: false,
		tasksMeta: {
			todoCount: 0,
			inProgressCount: 0,
			onHoldCount: 0,
			completedCount: 0,
			totalTasks: 0,
		},
	});

	const projectInformation = [
		{
			key: "1",
			label: "Project Name",
			children: <span>{values.name}</span>,
			span: 2,
		},

		{
			key: "2",
			label: "Project ID",
			children: <span>{values.project_id}</span>,
			span: 1,
		},
		{
			key: "7",
			label: "Deleted",
			children: (
				<Select
					value={[values.isTrash]}
					onChange={(e) => {
						setEditing(true);
						setValues((val) => {
							return { ...val, isTrash: e };
						});
					}}
					style={{
						width: 120,
					}}
					options={[
						{ label: "False", value: false },
						{ label: "True", value: true },
					]}
				/>
			),
			span: 1,
		},
		{
			key: "8",
			label: "Owner",
			children: <span>{values.owner.name}</span>,
			span: 2,
		},

		{
			key: "45",
			label: "Created On",
			children: (
				<span>
					{values.createdAt ? new Date(values.createdAt).toDateString() : ""}
				</span>
			),
			span: 1,
		},
		{
			key: "45",
			label: "Last Updated",
			children: (
				<span>
					{values.updatedAt ? new Date(values.updatedAt).toDateString() : ""}
				</span>
			),
			span: 2,
		},
		{
			key: "56788",
			label: "Tasks",
			children: (
				<Select
					loading={taskLoading}
					allowClear={true}
					value={values.tasks}
					mode="multiple"
					onChange={(e, option) => {
						console.log(option, e);
						setEditing(true);
						setValues((val) => {
							return {
								...val,
								tasks: option ? [...option] : [],
							};
						});
					}}
					style={{
						width: "100%",
					}}
					placeholder="Tasks"
					options={uniqueArrayOfObjects(taskSelectData, values.tasks, "value")}
					dropdownRender={(menu) => (
						<>
							{menu}
							<Divider style={{ margin: "8px 0" }} />
							<Pagination
								style={{
									margin: 8,
								}}
								// showSizeChanger={false}
								size="small"
								pageSizeOptions={[10, 20]}
								// simple={true}
								pageSize={taskSelectParams[0].pagination.pageSize}
								total={taskSelectParams[0].pagination.total}
								current={taskSelectParams[0].pagination.current}
								onChange={(page, pageSize) => {
									selectTasks({
										page: page,
										limit: pageSize,
									});
								}}
							/>
						</>
					)}
				/>
			),
			span: 3,
		},
		{
			key: "3",
			label: "Client",
			children: (
				<Select
					loading={clientLoading}
					value={values.client[0]?.value ? values.client[0] : undefined}
					onChange={(e, option) => {
						console.log(option, e);
						setEditing(true);
						setValues((val) => {
							return {
								...val,
								client: option
									? [option]
									: [{ value: undefined, label: undefined }],
							};
						});
					}}
					style={{
						width: "100%",
						maxWidth: 360,
					}}
					options={uniqueArrayOfObjects(
						clientSelectData,
						values.client[0]?.value ? values.client : [],
						"value"
					)}
					placeholder="Client"
					dropdownRender={(menu) => (
						<>
							{menu}
							<Divider style={{ margin: "8px 0" }} />
							<Pagination
								style={{
									margin: 8,
								}}
								// showSizeChanger={false}
								size="small"
								pageSizeOptions={[10, 20]}
								// simple={true}
								pageSize={clientSelectParams[0].pagination.pageSize}
								total={clientSelectParams[0].pagination.total}
								current={clientSelectParams[0].pagination.current}
								onChange={(page, pageSize) => {
									selectClients({
										page: page,
										limit: pageSize,
									});
								}}
							/>
						</>
					)}
				/>
			),
			span: 2,
		},
		{
			key: "456",
			label: "Total Tasks",
			children: <span>{values?.tasksMeta?.totalTasks ?? ""}</span>,
			span: 1,
		},

		{
			key: "10",
			label: "Staff",
			children: (
				<Select
					loading={staffLoading}
					allowClear={true}
					value={values.staff}
					mode="multiple"
					onChange={(e, option) => {
						console.log(option, e);
						setEditing(true);
						setValues((val) => {
							return {
								...val,
								staff: option ? [...option] : [],
							};
						});
					}}
					style={{
						width: "100%",
					}}
					placeholder="Staff"
					options={uniqueArrayOfObjects(staffSelectData, values.staff, "value")}
					dropdownRender={(menu) => (
						<>
							{menu}
							<Divider style={{ margin: "8px 0" }} />
							<Pagination
								style={{
									margin: 8,
								}}
								// showSizeChanger={false}
								size="small"
								pageSizeOptions={[10, 20]}
								// simple={true}
								pageSize={staffSelectParams[0].pagination.pageSize}
								total={staffSelectParams[0].pagination.total}
								current={staffSelectParams[0].pagination.current}
								onChange={(page, pageSize) => {
									selectStaff({
										page: page,
										limit: pageSize,
									});
								}}
							/>
						</>
					)}
				/>
			),
			span: 3,
		},
	];

	const projectTabs = [
		{
			label: "Statistics",
			key: "statistics",
			icon: <BarChartOutlined />,
			children: (
				<Space
					direction="vertical"
					size="large"
					style={{
						width: "100%",
					}}>
					<Collapse
						// collapsible="icon"
						// defaultActiveKey={["1"]}
						contentPadding={2}
						size="large"
						items={[
							{
								key: "1",
								label: (
									<div>
										<div
											style={{
												fontSize: "24px",
											}}>
											Chart
										</div>
									</div>
								),
								children: <>{/* tO uSE DND kit */}</>,
							},
						]}></Collapse>
					<Collapse
						// collapsible="icon"
						defaultActiveKey={["1"]}
						contentPadding={2}
						size="large"
						items={[
							{
								key: "1",
								label: (
									<div
										style={{
											fontSize: "24px",
										}}>
										Numeric
									</div>
								),
								children: (
									<Col>
										<Row
											gutter={16}
											style={{
												marginBottom: 8,
											}}>
											<Col
												span={12}
												style={{
													minWidth: 280,
												}}>
												<Card bordered={true}>
													<Statistic
														title="Total Tasks"
														value={values?.tasksMeta.totalTasks ?? 0}
														formatter={formatter}
													/>
												</Card>
											</Col>
											<Col
												span={12}
												style={{
													minWidth: 280,
												}}>
												<Card bordered={true}>
													<Statistic
														title="Todo Tasks"
														value={values?.tasksMeta.todoCount ?? 0}
														precision={2}
														formatter={formatter}
													/>
												</Card>
											</Col>
										</Row>
										<Row gutter={16} style={{ marginBottom: 8 }}>
											<Col
												span={12}
												style={{
													minWidth: 280,
												}}>
												<Card bordered={true}>
													<Statistic
														title="Completed Tasks"
														value={values?.tasksMeta.completedCount ?? 0}
														formatter={formatter}
														suffix={`/ ${values?.tasksMeta.totalTasks ?? 0}`}
													/>
												</Card>
											</Col>
											<Col
												span={12}
												style={{
													minWidth: 280,
												}}>
												<Card bordered={true}>
													<Statistic
														title="In-Progress Tasks"
														value={values?.tasksMeta.inProgressCount ?? 0}
														precision={2}
														formatter={formatter}
														suffix={`/ ${values?.tasksMeta.totalTasks ?? 0}`}
													/>
												</Card>
											</Col>
										</Row>
										<Row gutter={16} style={{ marginBottom: 8 }}>
											<Col
												span={12}
												style={{
													minWidth: 280,
												}}>
												<Card bordered={true}>
													<Statistic
														title="On-Hold Tasks"
														value={values?.tasksMeta.onHoldCount ?? 0}
														formatter={formatter}
														suffix={`/ ${values?.tasksMeta.totalTasks ?? 0}`}
													/>
												</Card>
											</Col>
										</Row>
									</Col>
								),
							},
						]}></Collapse>
				</Space>
			),
		},
		{
			label: "Information",
			key: "information",
			icon: <InfoCircleOutlined />,
			children: (
				<Space
					direction="vertical"
					size="large"
					style={{
						width: "100%",
					}}>
					<Space
						direction="vertical"
						size="small"
						style={{
							width: "100%",
							padding: "1rem 1rem 0rem 1rem",
						}}>
						<Typography.Title
							level={2}
							style={{
								margin: 0,
								// gap: 50,
								width: "70%",
							}}
							editable={{
								onChange: (txt) => {
									setEditing(true);
									if (txt.length >= 1) {
										setValues((val) => {
											return { ...val, name: txt };
										});
									}
								},
								icon: (
									<EditOutlined
										style={{
											marginLeft: 8,
										}}
									/>
								),
							}}
							copyable={true}>
							{values.name}
						</Typography.Title>
						<Flex
							style={{
								justifyContent: "space-between",
							}}>
							<Typography.Text
								style={{
									marginLeft: 12,
								}}>
								Created By {values.owner.name} , On{" "}
								{new Date(values.createdAt).toDateString()}
							</Typography.Text>
							<Typography.Text
								style={{
									marginLeft: 12,
									transition: "transform 0.2s ease, opacity 0.2s ease",
								}}>
								Last Updated on {new Date(values.updatedAt).toDateString()}
							</Typography.Text>
						</Flex>
					</Space>
					<Divider
						style={{
							margin: "8px 0px",
							backgroundColor: "lightgray",
						}}
					/>

					<Collapse
						// collapsible="icon"
						size="large"
						items={[
							{
								key: "1",
								label: (
									<div>
										<div
											style={{
												fontSize: "24px",
											}}>
											Description
										</div>
										<div
											style={{
												fontSize: "12px",
												width: "50%",
												textWrap: "nowrap",
												textOverflow: "ellipsis",
												overflow: "hidden",
											}}>
											{values.description}
										</div>
									</div>
								),
								children: (
									<Typography.Paragraph
										copyable={true}
										editable={{
											onChange: (txt) => {
												setEditing(true);
												if (txt.length >= 1) {
													setValues((val) => {
														return { ...val, description: txt };
													});
												}
											},
											icon: (
												<EditOutlined
													style={{
														marginLeft: 8,
													}}
												/>
											),
										}}
										style={{
											marginLeft: 30,
											marginBottom: 0,
										}}>
										{values.description}
									</Typography.Paragraph>
								),
							},
						]}></Collapse>
					<Collapse
						// collapsible="icon"
						defaultActiveKey={["1"]}
						contentPadding={2}
						size="large"
						items={[
							{
								key: "1",
								label: (
									<div
										style={{
											fontSize: "24px",
										}}>
										Project Information
									</div>
								),
								children: (
									<Descriptions
										responsive={true}
										style={{}}
										// title="User Info"
										bordered={true}
										items={projectInformation}
									/>
								),
							},
						]}></Collapse>
				</Space>
			),
		},
		{
			label: "Tasks",
			key: "tasks",
			icon: <UnorderedListOutlined />,
			disabled: true,
			children: <div>Tasks</div>,
		},
	];

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const handleProjectValue = useCallback(() => {
		setLoading(true);
		const projectValues = projectTableData.filter(
			(project) => project._id === selectedProject
		);
		if (projectValues.length) {
			setValues({
				...projectValues[0],
				staff: projectValues[0].staff.length
					? projectValues[0].staff.map((staf) => {
							return {
								label: staf.name,
								value: staf._id,
							};
					  })
					: [],
				client: projectValues[0].client.length
					? [
							{
								label: projectValues[0].client[0].name,
								value: projectValues[0].client[0]._id,
							},
					  ]
					: [{ value: undefined, label: undefined }],
				tasks: projectValues[0].tasks.length
					? projectValues[0].tasks.map((task) => {
							return {
								label: task.name,
								value: task._id,
							};
					  })
					: [],
			});
		} else {
			navigate("/page-not-found");
		}
		setEditing(false);
		setTimeout(() => {
			setLoading(false);
		}, 200);
	}, [navigate, setValues, selectedProject, projectTableData]);

	const handleSave = () => {};

	useEffect(() => {
		const checkIfMobile = () => {
			if (window.innerWidth <= 830) {
				setCollapsed(true);
			}
		};
		if (!staffSelectData.length) {
			selectStaff();
		}

		if (!clientSelectData.length) {
			selectClients();
		}

		if (!taskSelectData.length) {
			selectTasks();
		}

		checkIfMobile();
		handleProjectValue();

		window.addEventListener("resize", checkIfMobile);
		return () => {
			window.removeEventListener("resize", checkIfMobile);
		};
	}, []);
	useEffect(() => {
		console.log(location);
		handleProjectValue();
	}, [location, handleProjectValue]);

	return (
		<div
			id="main"
			style={{
				padding: 12,
				backgroundColor: "gray",
			}}>
			<Spin spinning={loading} fullscreen={true} />
			<Button
				className="goback-button"
				icon={<ArrowLeftOutlined />}
				type="text"
				size="large"
				onClick={() => {
					navigate(-1);
				}}></Button>
			<Menu
				style={{
					maxWidth: 256,
					height: "calc(100vh - 24px)",
					// borderRadius: 10,
					marginRight: 8,
					overflow: "auto",
				}}
				inlineCollapsed={collapsed}
				selectedKeys={[selectedProject]}
				mode="inline">
				<Space
					size="middle"
					style={{
						padding: 4,
						display: "flex",
						justifyContent: "end",
					}}>
					{/* {!collapsed && (
						<Select
							style={{
								fontSize: "14px",
								fontWeight: "bold",
							}}
							variant="borderless"
							allowClear={true}
							placeholder="Project Name"
							onChange={(e) => {
								setSelectedProject(e);
							}}
							options={uniqueArrayOfObjects(projectDropdown, [], "value")}
						/>
					)} */}
					<Button
						onClick={() => {
							toggleCollapsed();
						}}
						icon={
							collapsed ? <CaretRightFilled /> : <CaretLeftFilled />
						}></Button>
				</Space>
				{projectTableData.map((project, index) => {
					return (
						<Menu.Item
							icon={
								<>
									<ProjectOutlined />
									{index + 1}
								</>
							}
							style={{ fontWeight: "bold" }}
							// key={`${task._id}`}
							key={project._id}>
							<Link replace={true} to={`/project_detail/${project._id}`}>
								{project.name}
							</Link>
						</Menu.Item>
					);
				}) || <></>}
			</Menu>

			<div
				id="inside"
				style={{
					width: collapsed ? "calc(100vw - 104px)" : "calc(100vw - 280px)",
					height: "calc(100vh - 24px)",
					overflow: "auto",
					margin: 0,
				}}>
				<div
					style={{
						width: "100%",
						minHeight: "calc(100vh - 24px)",
						// borderRadius: 10,
						backgroundColor: "white",
						position: "relative",
						padding: "1rem",
					}}>
					<Tabs
						defaultActiveKey="information"
						tabPosition="top"
						style={{ minHeight: 240, padding: "0px 16px" }}
						items={projectTabs}
						tabBarExtraContent={
							<div
								style={{
									display: "flex",
									gap: 8,
									marginBottom: 8,
								}}>
								<Button
									onClick={handleSave}
									size="large"
									type="primary"
									disabled={!editing}>
									Save
								</Button>
								<Button
									onClick={handleProjectValue}
									size="large"
									disabled={!editing}
									type="primary"
									danger>
									Reset
								</Button>
								<Button
									onClick={() => {
										navigate(-1);
									}}
									size="large">
									Cancel
								</Button>
							</div>
						}
					/>
				</div>
			</div>
		</div>
	);
};
export default Project_Detail;
