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
	Modal,
} from "antd";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ArrowLeftOutlined,
	CaretLeftFilled,
	CaretRightFilled,
	CommentOutlined,
	DeleteOutlined,
	DownOutlined,
	EditOutlined,
	ExclamationCircleFilled,
	FileOutlined,
	OrderedListOutlined,
	SubnodeOutlined,
	WarningOutlined,
} from "@ant-design/icons";
import TextEditorQuill from "./TextEditorQuill";
import { useDeleteData, useGetData, useUpdateData } from "../api/hooks";
import dayjs from "dayjs";
import { uniqueArrayOfObjects } from "../util/functions";
import { useDeleteConfirm } from "./Component_Hooks";

const Task_Detail = () => {
	//Tasks Route Component
	const location = useLocation();
	console.log(useParams());
	const selectedTask = location.pathname?.split("/")[2] ?? undefined;
	const [selectedProject, setSelectedProject] = useState();

	const [loading, setLoading] = useState(true);
	const { tableData: taskTableData } = useSelector((state) => state.task);
	const {
		selectData: projectSelectData,
		selectParams: projectSelectParams,
		loading: projectLoading,
	} = useSelector((state) => state.project);
	const {
		selectData: staffSelectData,
		selectParams: staffSelectParams,
		loading: staffLoading,
	} = useSelector((state) => state.staff);
	const { selectProjects, selectStaff } = useGetData();
	const { updateTask } = useUpdateData();

	const projectDropdown = taskTableData?.reduce((acc, task) => {
		if (task?.project) {
			acc?.push({ label: task?.project?.name, value: task?.project?._id });
		}
		return acc;
	}, []);

	const statusDropdown = [
		{
			label: <Badge color="gold" status="default" text="Todo" />,
			key: "todo",
			value: "todo",
		},
		{
			label: <Badge status="processing" text="In-progress" />,
			key: "in-progress",
			value: "in-progress",
		},
		{
			label: <Badge status="default" text="On-hold" />,
			key: "on-hold",
			value: "on-hold",
		},
		{
			label: <Badge status="success" text="Completed" />,
			key: "completed",
			value: "completed",
		},
	];
	const statusBadge = {
		todo: <Badge color="gold" status="default" />,
		"in-progress": <Badge status="processing" />,
		"on-hold": <Badge status="default" />,
		completed: <Badge status="success" />,
	};

	const [values, setValues] = useState({
		name: "Task",
		_id: "1",
		startDate: "",
		description: "Description",
		assignedTo: [],
		dueDate: "2024-05-31T00:00:00.000Z",
		updatedAt: "2024-05-28T08:55:09.948Z",
		createdAt: "2024-05-28T08:55:09.948Z",
		createdBy: { _id: "1", name: "Someone", email: "Someone@email.com" },
		status: "todo",
		task_id: "Task-1",
		project: { value: "Project-1", label: "Project" },
		domainName: "Domain",
		isTrash: false,
	});

	const taskInformation = [
		{
			key: "1",
			label: "Task Name",
			children: <span>{values?.name}</span>,
			span: 2,
		},

		{
			key: "2",
			label: "Task ID",
			children: <span>{values?.task_id}</span>,
			span: 1,
		},
		// {
		// 	key: "7",
		// 	label: "Deleted",
		// 	children: (
		// 		<Select
		// 			value={[values?.isTrash]}
		// 			onChange={(e) => {
		// 				setEditing(true);
		// 				setValues((val) => {
		// 					return { ...val, isTrash: e };
		// 				});
		// 			}}
		// 			style={{
		// 				width: 120,
		// 			}}
		// 			options={[
		// 				{ label: "False", value: false },
		// 				{ label: "True", value: true },
		// 			]}
		// 		/>
		// 	),
		// 	span: 1,
		// },

		{
			key: "45",
			label: "Created On",
			children: (
				<span>
					{values?.createdAt ? new Date(values?.createdAt)?.toDateString() : ""}
				</span>
			),
			span: 1,
		},
		{
			key: "45",
			label: "Last Updated",
			children: (
				<span>
					{values?.updatedAt ? new Date(values?.updatedAt)?.toDateString() : ""}
				</span>
			),
			span: 2,
		},
		{
			key: "6",
			label: "Status",
			children: (
				<span>
					{values?.status ? statusBadge[values.status] : ""}
					<span style={{ marginLeft: 8 }}>
						{values?.status
							? values?.status?.charAt(0)?.toUpperCase() +
							  values?.status?.slice(1)
							: ""}
					</span>
				</span>
			),
			span: 3,
		},
		{
			key: "4",
			label: "Due Date",
			children: (
				<>
					<span
						style={{
							marginRight: 16,
						}}>
						{values?.dueDate ? new Date(values?.dueDate)?.toDateString() : ""}
					</span>
					<DatePicker
						value={[values?.dueDate ? dayjs(values?.dueDate) : undefined]}
						showTime={true}
						showNow={true}
						allowClear={false}
						placement="topLeft"
						style={{
							width: 180,
						}}
						onChange={(_, e) => {
							setEditing(true);
							setValues((val) => {
								return { ...val, dueDate: e };
							});
						}}
					/>
				</>
			),
			span: 3,
		},
		{
			key: "3",
			label: "Project",
			children: (
				// <Form.Item name="project" rules={[]}>
				<Select
					loading={projectLoading}
					allowClear={true}
					value={values?.project?.value ? values?.project : undefined}
					onChange={(e, option) => {
						console.log(option, e);
						setEditing(true);
						setValues((val) => {
							return {
								...val,
								project: option
									? option
									: { value: undefined, label: undefined },
							};
						});
					}}
					style={{
						width: "100%",
						maxWidth: 360,
					}}
					options={uniqueArrayOfObjects(
						projectSelectData,
						values?.project?.value ? [values?.project] : [],
						"value"
					)}
					placeholder="Project"
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
								pageSize={projectSelectParams[0].pagination.pageSize}
								total={projectSelectParams[0].pagination.total}
								current={projectSelectParams[0].pagination.current}
								onChange={(page, pageSize) => {
									selectProjects({
										page: page,
										limit: pageSize,
									});
								}}
							/>
						</>
					)}
				/>
				// </Form.Item>
			),
			span: 2,
		},
		{
			key: "8",
			label: "Created By",
			children: <span>{values?.createdBy?.name}</span>,
			span: 1,
		},
		// {
		// 	key: "5",
		// 	label: "Domain Name",
		// 	children: <span>{values.domainName}</span>,
		// 	span: 1,
		// },
		{
			key: "10",
			label: "Assigned To",
			children: (
				<Select
					loading={staffLoading}
					allowClear={true}
					value={values?.assignedTo}
					mode="multiple"
					onChange={(e, option) => {
						console.log(option, e);
						setEditing(true);
						setValues((val) => {
							return {
								...val,
								assignedTo: option ? [...option] : [],
							};
						});
					}}
					style={{
						width: "100%",
					}}
					placeholder="Staff"
					options={uniqueArrayOfObjects(
						staffSelectData,
						values?.assignedTo,
						"value"
					)}
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

	const [editing, setEditing] = useState(false);
	const [commentEditorHtml, setCommentEditorHtml] = useState("");
	const taskTabs = [
		{
			label: "Comments",
			key: "comment",
			icon: <CommentOutlined />,
			children: (
				<TextEditorQuill
					value={commentEditorHtml}
					setValue={setCommentEditorHtml}
				/>
			),
		},
		{
			label: "Sub Tasks",
			key: "subtask",
			icon: <SubnodeOutlined />,
			disabled: true,
			children: <div>subtask</div>,
		},
		{
			label: "Documents",
			key: "document",
			icon: <FileOutlined />,
			children: <div>document</div>,
		},
		{
			label: "Issues",
			key: "issue",
			icon: <WarningOutlined />,
			children: <div>Issue</div>,
		},
	];

	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	const { showTaskDeleteConfirm } = useDeleteConfirm();

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const handleTaskValue = useCallback(() => {
		setLoading(true);
		const taskValues = taskTableData?.filter(
			(task) => task?._id === selectedTask
		);
		if (taskValues?.length) {
			setValues({
				...taskValues[0],
				assignedTo: taskValues[0]?.assignedTo?.length
					? taskValues[0]?.assignedTo?.map((staff) => {
							return {
								label: staff?.name,
								value: staff?._id,
							};
					  })
					: [],
				project: taskValues[0]?.project
					? {
							label: taskValues[0]?.project?.name,
							value: taskValues[0]?.project?._id,
					  }
					: { value: undefined, label: undefined },
			});
		} else {
			navigate("/page-not-found", { replace: true });
		}
		setEditing(false);
		setTimeout(() => {
			setLoading(false);
		}, 200);
	}, [navigate, setValues, selectedTask, taskTableData]);

	const handleSave = () => {
		console.log(new Date());
		console.log(values);
		updateTask(values?._id, {
			...values,
			assignedTo: values?.assignedTo
				? values?.assignedTo?.map((staff) => {
						return staff?.value;
				  })
				: [],
			project: values?.project?.value ? values?.project?.value : "",
			updatedAt: new Date()?.toISOString(),
		});
	};

	useEffect(() => {
		const checkIfMobile = () => {
			if (window?.innerWidth <= 830) {
				setCollapsed(true);
			}
		};
		if (!projectSelectData?.length) {
			selectProjects();
		}
		if (!staffSelectData?.length) {
			selectStaff();
		}

		checkIfMobile();
		handleTaskValue();

		window?.addEventListener("resize", checkIfMobile);
		return () => {
			window?.removeEventListener("resize", checkIfMobile);
		};
	}, []);
	useEffect(() => {
		console.log(location);
		handleTaskValue();
	}, [location, handleTaskValue]);

	return (
		<div
			id="main"
			style={{
				padding: 12,
				backgroundColor: "gray",
			}}>
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
				selectedKeys={[selectedTask]}
				mode="inline">
				<Space
					size="middle"
					style={{
						padding: 4,
						display: "flex",
						justifyContent: collapsed ? "end" : "space-between",
					}}>
					{!collapsed && (
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
					)}
					<Button
						onClick={() => {
							toggleCollapsed();
						}}
						icon={
							collapsed ? <CaretRightFilled /> : <CaretLeftFilled />
						}></Button>
				</Space>
				{taskTableData?.map((task, index) => {
					if (
						!selectedProject ||
						(selectedProject &&
							task?.project &&
							task?.project?._id == selectedProject)
					) {
						return (
							<Menu.Item
								icon={
									<>
										<OrderedListOutlined />
										{index + 1}
									</>
								}
								style={{ fontWeight: "bold" }}
								// key={`${task._id}`}
								key={task?._id}>
								<Link replace={true} to={`/task_detail/${task?._id}`}>
									{task?.name}
								</Link>
							</Menu.Item>
						);
					}
				}) || <></>}
			</Menu>
			<Spin spinning={loading}>
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
							padding: "1rem",
							// borderRadius: 10,
							backgroundColor: "white",
						}}>
						<Space
							direction="vertical"
							size="large"
							style={{
								width: "100%",
								position: "relative",
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
											if (txt?.length >= 1) {
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
									{values?.name}
								</Typography.Title>
								<Flex
									style={{
										justifyContent: "space-between",
									}}>
									<Typography.Text
										style={{
											marginLeft: 12,
										}}>
										By {values?.createdBy?.name} , On{" "}
										{new Date(values?.createdAt)?.toDateString()}
									</Typography.Text>
									<Typography.Text
										style={{
											marginLeft: 12,
											transition: "transform 0.2s ease, opacity 0.2s ease",
										}}>
										Last Updated on{" "}
										{new Date(values?.updatedAt)?.toDateString()}
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
								collapsible="icon"
								expandIcon={() => {
									return (
										<ConfigProvider
											theme={{
												components: {
													Badge: { statusSize: 12 },
												},
											}}>
											{statusBadge[values?.status]}
										</ConfigProvider>
									);
								}}
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
													{values?.status?.charAt(0).toUpperCase() +
														values?.status?.slice(1)}
													<Dropdown
														menu={{
															items: statusDropdown,
															selectable: true,
															selectedKeys: [values?.status],
															onSelect: ({ key }) => {
																setEditing(true);
																setValues((val) => {
																	return { ...val, status: key };
																});
															},
														}}
														trigger={["click"]}>
														<DownOutlined
															style={{ fontSize: 20, marginLeft: 4 }}
														/>
													</Dropdown>
												</div>
												<div
													style={{
														fontSize: "12px",
														width: "50%",
														textWrap: "nowrap",
														textOverflow: "ellipsis",
														overflow: "hidden",
													}}>
													Current Status
												</div>
											</div>
										),
										children: (
											<Segmented
												style={{
													marginLeft: 30,
													flexWrap: "wrap",
													textWrap: "wrap",
												}}
												value={values?.status}
												options={statusDropdown}
												onChange={(value) => {
													setEditing(true);
													setValues((val) => {
														return { ...val, status: value };
													});
												}}></Segmented>
										),
									},
								]}></Collapse>

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
													{values?.description}
												</div>
											</div>
										),
										children: (
											<Typography.Paragraph
												copyable={true}
												editable={{
													onChange: (txt) => {
														setEditing(true);
														if (txt?.length >= 1) {
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
												{values?.description}
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
												Task Information
											</div>
										),
										children: (
											<Descriptions
												responsive={true}
												style={{}}
												// title="User Info"
												bordered={true}
												items={taskInformation}
											/>
										),
									},
								]}></Collapse>

							<Tabs
								defaultActiveKey="comment"
								tabPosition="top"
								style={{ minHeight: 240, padding: "0px 16px" }}
								items={taskTabs}
							/>

							<div
								style={{
									width: "50%",
									position: "absolute",
									top: 0,
									right: 0,
									display: "flex",
									justifyContent: "end",
									flexWrap: "wrap",
									gap: 8,
								}}>
								<Button
									onClick={handleSave}
									size="large"
									type="primary"
									disabled={!editing}>
									Save
								</Button>
								<Button
									onClick={handleTaskValue}
									size="large"
									disabled={!editing}
									type="primary"
									danger>
									Reset
								</Button>
								<Button
									icon={<DeleteOutlined />}
									size="large"
									danger
									onClick={() => {
										showTaskDeleteConfirm(values?._id, () => {
											navigate(-1);
										});
									}}></Button>
								<Button
									onClick={() => {
										navigate(-1);
									}}
									size="large">
									Cancel
								</Button>
							</div>
						</Space>
					</div>
				</div>
			</Spin>
		</div>
	);
};
export default Task_Detail;
