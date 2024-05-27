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
} from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	ArrowLeftOutlined,
	CaretLeftFilled,
	CaretRightFilled,
	CommentOutlined,
	DownOutlined,
	EditOutlined,
	FileOutlined,
	SubnodeOutlined,
	WarningOutlined,
} from "@ant-design/icons";
import TextEditorQuill from "./TextEditorQuill";

const Task_Detail = () => {
	//Tasks Route Component
	const { tableData: taskTableData } = useSelector((state) => state.task);
	const projectDropdown = [
		{
			label: <a href="">1st menu item</a>,
			key: "0",
		},
		{
			label: <p>2nd menu item</p>,
			key: "1",
		},
		{
			type: "divider",
		},
		{
			label: "3rd menu item",
			key: "3",
		},
	];
	const [values, setValues] = useState({
		name: "Task 1",
		startDate: "",
		description:
			"asd asdasdwqh dhqwoidhoiwh doiahs doihawodihaoidha sidhaois diahsoidhaosidh oiashd oiahsdoih aosidh oiahsdoihasdi asiod oaishd oihasoidh aoisdh oiashdhasoid oaishd oaishddas dias diaos dioash doihas dasd jasj diasj doijaoidj aoidjasdas dad qw wadaw owihd oahdo iahsdo iashd oiasoidioashdoihasoidhoahsoidhoiwdoihwod oa wiawh dohw9d wh9dihwaoidawoid awoidoi awhdohwa",
		assignedTo: [],
		dueDate: "",
	});
	// const [addMargin, setAddMargin] = useState(0);
	const taskInformation = [
		{
			key: "1",
			label: "Product",
			children: "Cloud Database",
		},
		{
			key: "2",
			label: "Billing Mode",
			children: "Prepaid",
		},
		{
			key: "3",
			label: "Automatic Renewal",
			children: "YES",
		},
		{
			key: "4",
			label: "Order time",
			children: "2018-04-24 18:00:00",
		},
		{
			key: "5",
			label: "Usage Time",
			children: "2019-04-24 18:00:00",
			span: 2,
		},
		{
			key: "6",
			label: "Status",
			children: <Badge status="processing" text="Running" />,
			span: 3,
		},
		{
			key: "7",
			label: "Negotiated Amount",
			children: "$80.00",
		},
		{
			key: "8",
			label: "Discount",
			children: "$20.00",
		},
		{
			key: "9",
			label: "Official Receipts",
			children: "$60.00",
		},
		{
			key: "10",
			label: "Config Info",
			children: (
				<>
					Data disk type: MongoDB
					<br />
					Database version: 3.4
					<br />
					Package: dds.mongo.mid
					<br />
					Storage space: 10 GB
					<br />
					Replication factor: 3
					<br />
					Region: East China 1
					<br />
				</>
			),
		},
	];
	const [selectedMenuItem, setSelectedMenuItem] = useState("comment");
	const [commentEditorHtml, setCommentEditorHtml] = useState("");
	const taskMenus = [
		{
			label: "Comments",
			key: "comment",
			icon: <CommentOutlined />,
		},
		{
			label: "Sub Tasks",
			key: "subtask",
			icon: <SubnodeOutlined />,
			disabled: true,
		},
		{
			label: "Documents",
			key: "document",
			icon: <FileOutlined />,
		},
		{
			label: "Issues",
			key: "issue",
			icon: <WarningOutlined />,
		},
	];
	let tabContent = <></>;
	switch (selectedMenuItem) {
		case "comment":
			tabContent = (
				<TextEditorQuill
					value={commentEditorHtml}
					setValue={setCommentEditorHtml}
				/>
			);
			break;
		case "subtask":
			tabContent = <div>subtask</div>;
			break;
		case "document":
			tabContent = <div>document</div>;
			break;
		case "issue":
			tabContent = <div>Issue</div>;
			break;
		default:
			tabContent = <></>;
			break;
	}
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	useEffect(() => {
		const checkIfMobile = () => {
			if (window.innerWidth <= 640) {
				setCollapsed(true);
			}
		};
		checkIfMobile();

		// if (location.pathname === "/dashboard") {
		// 	navigate("/dashboard/tasks");
		// }
		if (
			!taskTableData.some(
				(task) => task._id === location.pathname.split("/")[2]
			)
		) {
			navigate("/page-not-found");
		}
		window.addEventListener("resize", checkIfMobile);
		return () => {
			window.removeEventListener("resize", checkIfMobile);
		};
	}, []);
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
				onClick={() => {
					navigate(-1);
				}}></Button>
			<Menu
				style={{
					maxWidth: 256,
					height: "calc(100vh - 24px)",
					display: "flex",
					flexDirection: "column",
					borderRadius: 10,
					marginRight: 8,
				}}
				inlineCollapsed={collapsed}
				selectedKeys={[location.pathname.split("/")[2]]}
				mode="inline">
				<Space
					size="middle"
					style={{
						padding: 4,
						display: "flex",
						justifyContent: collapsed ? "end" : "space-between",
					}}>
					{!collapsed && (
						<Dropdown
							menu={{
								projectDropdown,
								selectable: true,
								defaultSelectedKeys: ["3"],
							}}
							trigger={["click"]}
							// placement="bottomRight"
						>
							<a onClick={(e) => e.preventDefault()}>
								<Space
									style={{
										margin: "12px 16px",
										fontSize: "14px",
										fontWeight: "bold",
									}}>
									Project Name
									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
					)}
					<Button
						onClick={() => {
							toggleCollapsed();
						}}
						icon={
							collapsed ? <CaretRightFilled /> : <CaretLeftFilled />
						}></Button>
				</Space>
				{taskTableData.map((task) => {
					return (
						<Menu.Item style={{ fontWeight: "bold" }} key={`${task._id}`}>
							{!collapsed && (
								<Link replace={true} to={`/task_detail/${task._id}`}>
									{task.name}
								</Link>
							)}
						</Menu.Item>
					);
				})}
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
						padding: "1rem",
						borderRadius: 10,
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
									gap: 50,
									width: "70%",
								}}
								editable={{
									maxLength: 23,
									onChange: (txt) => {
										setValues((val) => {
											return { ...val, name: txt };
										});
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
							<Typography.Text
								style={{
									marginLeft: 12,
								}}>
								By Someone , On 2 Feb 2099
							</Typography.Text>
						</Space>
						<Divider
							style={{
								margin: "8px 0px",
								backgroundColor: "lightgray",
							}}
						/>

						<Collapse
							// collapsible="icon"
							// bordered={false}
							expandIcon={() => {
								return (
									<ConfigProvider
										theme={{
											components: {
												Badge: { statusSize: 12 },
											},
										}}>
										<Badge status="success" />
									</ConfigProvider>

									// <div>
									// 	<svg width={12} height={12} viewBox="0 0 100 100">
									// 		<circle r="50" cx="50" cy="50" fill="green" />
									// 		Sorry, your browser does not support inline SVG.
									// 	</svg>
									// </div>
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
												Status
											</div>
											<div
												style={{
													fontSize: "12px",
													width: "50%",
													textWrap: "nowrap",
													textOverflow: "ellipsis",
													overflow: "hidden",
												}}>
												In Case No Description askldnmalksndlkdas. da.s .da.s
												d.a.s .da.s .da.sd .as.d
											</div>
										</div>
									),
									children: (
										<Typography.Paragraph
											copyable={true}
											editable={{
												maxLength: 23,
												onChange: (txt) => {
													setValues((val) => {
														return { ...val, description: txt };
													});
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
												// marginLeft: 40,
												marginBottom: 0,
											}}>
											{values.description}
										</Typography.Paragraph>
									),
									// showArrow: false,
								},
							]}></Collapse>

						<Collapse
							// collapsible="icon"
							// bordered={false}
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
												In Case No Description askldnmalksndlkdas. da.s .da.s
												d.a.s .da.s .da.sd .as.d
											</div>
										</div>
									),
									children: (
										<Typography.Paragraph
											copyable={true}
											editable={{
												maxLength: 23,
												onChange: (txt) => {
													setValues((val) => {
														return { ...val, description: txt };
													});
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
												marginLeft: 40,
												marginBottom: 0,
											}}>
											{values.description}
										</Typography.Paragraph>
									),
								},
							]}></Collapse>
						<Collapse
							// collapsible="icon"
							// bordered={false}
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
											style={{}}
											// title="User Info"
											bordered={true}
											items={taskInformation}
										/>
									),
								},
							]}></Collapse>
						<Menu
							items={taskMenus}
							style={{
								width: "100%",
							}}
							selectedKeys={[selectedMenuItem]}
							onClick={(e) => {
								setSelectedMenuItem(e.key);
							}}
							mode="horizontal"></Menu>
						<div
							style={{
								minWidth: "100%",
								minHeight: "240px",
								borderRadius: 10,
								padding: "1rem",
								// backgroundColor: "red",
							}}>
							{tabContent}
						</div>
						<div
							style={{
								position: "absolute",
								top: 0,
								right: 0,
								display: "flex",
								gap: 8,
							}}>
							<Button size="large" type="primary">
								Save
							</Button>
							<Button size="large">Cancel</Button>
						</div>
					</Space>
				</div>
			</div>
			{/* </Layout> */}
		</div>
	);
};
export default Task_Detail;
