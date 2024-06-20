import {
	ArrowRightOutlined,
	CalendarOutlined,
	CarryOutOutlined,
	ClockCircleOutlined,
	DeleteFilled,
	DeleteOutlined,
	EditOutlined,
	FilterOutlined,
	MoreOutlined,
	PaperClipOutlined,
	QuestionCircleOutlined,
	SearchOutlined,
	UnorderedListOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	Card,
	Col,
	Dropdown,
	Input,
	Menu,
	Progress,
	Row,
	Select,
	Space,
	Table,
	Tabs,
	Tag,
	Tooltip,
	Typography,
} from "antd";
import React, { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useTableColumns } from "./Component_Hooks";
import { useSelector } from "react-redux";
import { useGetData } from "../api/hooks";
import { horizontalScroll } from "../util/functions";

function Profile() {
	const { vanished, collapsed } = useOutletContext();
	const { taskTableColumns, projectTableColumns } = useTableColumns();
	const {
		tableData: taskTableData,
		loading: taskLoading,
		tableParams: taskTableParams,
	} = useSelector((state) => state.task);
	const {
		tableData: projectTableData,
		loading: projectLoading,
		tableParams: projectTableParams,
	} = useSelector((state) => state.project);

	const { getTasks, getProjects } = useGetData();

	const items = [
		{
			label: (
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.antgroup.com">
					1st menu item
				</a>
			),
			key: "0",
		},
		{
			label: (
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.aliyun.com">
					2nd menu item
				</a>
			),
			key: "1",
		},
		{
			type: "divider",
		},
		{
			label: "3rd menu item disabled",
			key: "3",
			disabled: true,
		},
	];

	const tableTabs = [
		{ key: "startToMakeEveryIndicatorCentered" },
		{
			label: (
				<>
					Projects <Badge count={3} color="#00000040" />
				</>
			),
			key: "projects",
			icon: <CarryOutOutlined />,
			children: (
				<Space
					size="large"
					direction="vertical"
					style={{
						width: "100%",
					}}>
					<div
						style={{
							display: "flex",
							width: "100%",
							gap: 8,
						}}>
						<Input
							size="large"
							prefix={<SearchOutlined />}
							placeholder="Enter Keyword to search projects"
						/>
						<Button size="large" type="primary" icon={<FilterOutlined />}>
							Filter
						</Button>
					</div>
					<div
						style={{
							width: "100%",
							// overflowX: "hidden",
						}}>
						<Table
							size="small"
							columns={projectTableColumns}
							dataSource={projectTableData}
							scroll={{ x: 1200, y: 4000 }}
							loading={projectLoading}
							pagination={{
								current: 1,
								pageSize: 3,
								total: 3,
								hideOnSinglePage: true,
							}}
							bordered={true}
							virtual={true}
						/>
					</div>
				</Space>
			),
		},
		{
			label: (
				<>
					Tasks <Badge count={10} color="#00000040" />
				</>
			),
			key: "tasks",
			icon: <UnorderedListOutlined />,
			children: (
				<Space
					size="large"
					direction="vertical"
					style={{
						width: "100%",
					}}>
					<div
						style={{
							display: "flex",
							width: "100%",
							gap: 8,
						}}>
						<Input
							size="large"
							prefix={<SearchOutlined />}
							placeholder="Enter Keyword to search tasks"
						/>
						<Button size="large" type="primary" icon={<FilterOutlined />}>
							Filter
						</Button>
					</div>
					<div
						style={{
							width: "100%",
							// overflowX: "hidden",
						}}>
						<Table
							size="small"
							columns={taskTableColumns}
							dataSource={taskTableData}
							scroll={{ x: 1200, y: 4000 }}
							loading={taskLoading}
							pagination={{
								current: 1,
								pageSize: 3,
								total: 3,
								hideOnSinglePage: true,
							}}
							bordered={true}
							virtual={true}
						/>
					</div>
				</Space>
			),
		},
		{
			label: (
				<>
					Attachments <Badge count={3} color="#00000040" />
				</>
			),
			key: "attachments",
			icon: <PaperClipOutlined />,
			children: <div>document</div>,
		},
	];

	useEffect(() => {
		if (!taskTableData?.length) {
			getTasks();
		}
		if (!projectTableData.length) {
			getProjects();
		}
		// return horizontalScroll();
	}, []);

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				height: "calc(100vh - 66px)",
				alignItems: "center",
			}}>
			<div
				style={{
					width: "calc(100vw - 274px)",
				}}>
				<div
					style={{
						height: 66,
						width: "100%",
						padding: "16px 32px",
						display: "flex",
						alignItems: "center",
					}}>
					<Breadcrumb
						items={[
							{
								title: <Link to="/dashboard">Dashboard</Link>,
							},
							{
								title: <Link to="/dashboard/profile">Profile</Link>,
							},
						]}
					/>
				</div>
				<div
					style={{
						height: 168,
						backgroundColor: "dimgrey",
					}}></div>
				<div
					style={{
						minHeight: "calc(100vh - 300px)",
						backgroundColor: "lightgrey",
						// padding: "0px 32px",
					}}>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							width: "100%",
							padding: "0px 32px",
							gap: 16,
						}}>
						<div
							style={{
								height: 144,
								width: 168,
								position: "relative",
							}}>
							<div
								style={{
									position: "absolute",
									top: "-48px",
									zIndex: 2,
									// paddingTop: "16px",
									width: "100%",
									display: "flex",
									gap: 16,
									alignItems: "end",
								}}>
								<Avatar
									style={{
										background: "grey",
										border: "2px white solid",
									}}
									size={168}
									icon={<UserOutlined />}
								/>
							</div>
						</div>
						<div
							style={{
								flexGrow: 1,
								display: "flex",
								justifyContent: "space-between",
								paddingTop: 16,
								flexWrap: "wrap",
							}}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									// marginBottom: 16,
									// justifyContent: "space-evenly",
									gap: 8,
								}}>
								<div style={{}}>
									<Tag color={"blue"}>
										<Typography.Text copyable={true}>
											id something
										</Typography.Text>
									</Tag>
									josingin sdfnaos b
								</div>
								<div>James doka</div>
								<div>email</div>
							</div>
							<div
								style={{
									display: "flex",
									gap: 8,
									height: "min-content",
									alignItems: "center",
								}}>
								<Button size="middle" type="primary">
									Edit Profile
								</Button>
								<Button size="middle">Contact</Button>
								<Dropdown
									menu={{
										items,
									}}
									overlayStyle={{
										paddingTop: 16,
									}}
									trigger={["click"]}>
									<Button type="text" icon={<MoreOutlined />} />
								</Dropdown>
							</div>
						</div>
					</div>
					<div
						style={{
							display: "grid",
							width: "100%",
							gridTemplateColumns: "224px minmax(0,1fr)",
							alignItems: "start",
							// flexWrap: "wrap",
							// justifyContent: "space-between",
							gap: 24,
							padding: collapsed ? 0 : "0px 32px",
						}}>
						<Card
							style={{
								maxWidth: "224px",
								borderRadius: "16px",
								marginBottom: 64,
							}}
							styles={{ body: { padding: 0 } }}>
							<Card.Grid
								style={{
									padding: "8px 0px",
									width: "100%",
									borderRadius: "16px 16px 0px 0px",
									display: "flex",
									flexDirection: "column",
									gap: 8,
									alignItems: "center",
								}}>
								<Avatar
									style={{
										background: "grey",
										border: "2px white solid",
									}}
									size="large"
									icon={<UserOutlined />}
								/>
								<div style={{ textAlign: "center" }}>
									<div>James Kasdas</div>
									<div>James Kasdasasd asd asd asd </div>
								</div>
								<Button
									style={{
										marginBottom: "8px",
									}}
									icon={<ClockCircleOutlined />}>
									Set Reminder
								</Button>
								<div
									style={{
										width: "100%",
										padding: "8px 16px",
										display: "flex",
										flexWrap: "wrap",
										justifyContent: "space-between",
										alignItems: "center",
									}}>
									<div style={{}}>Address</div>
									<Button style={{ padding: 0 }} type="link">
										Change
									</Button>
								</div>

								<iframe
									style={{
										border: 0,
										width: "100%",
										height: "auto",
									}}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									src="https://www.google.com/maps/embed/v1/place?key=API_KEY&q=Space+Needle,Seattle+WA"></iframe>
							</Card.Grid>
							<Card.Grid
								style={{
									width: "100%",
									padding: "16px",
								}}>
								<div
									style={{
										fontWeight: "bold",
									}}>
									Email
								</div>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										width: "100%",
									}}>
									<Typography.Text
										style={{
											whiteSpace: "wrap",
										}}
										editable={true}
										ellipsis={{ rows: 1 }}>
										adas da d@ wadada dasd awd awda da wda wda
									</Typography.Text>
									<Tooltip title={"Delete"}>
										<Button
											style={{ marginLeft: 2, padding: 0 }}
											danger={true}
											type="link"
											size="middle"
											icon={<DeleteOutlined key="Delete" />}></Button>
									</Tooltip>
								</div>
							</Card.Grid>
							<Card.Grid
								style={{
									width: "100%",
									borderRadius: "0px 0px 16px 16px",
									padding: "16px",
								}}>
								<div
									style={{
										fontWeight: "bold",
										display: "flex",
										flexWrap: "wrap",
										alignItems: "center",
										justifyContent: "space-between",
									}}>
									Phone
									<Button
										type="link"
										style={{ padding: 0, fontWeight: "bold" }}>
										+ Add
									</Button>
								</div>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										width: "100%",
									}}>
									<Typography.Text
										style={{
											flexGrow: 1,
										}}
										editable={{
											icon: (
												<EditOutlined
													style={{
														marginLeft: "",
													}}
												/>
											),
										}}
										ellipsis={{ rows: 1 }}>
										909 7890 7890
									</Typography.Text>
									<Tooltip title={"Delete"}>
										<Button
											style={{ marginLeft: 2, padding: 0 }}
											danger={true}
											type="link"
											size="middle"
											icon={<DeleteOutlined key="Delete" />}></Button>
									</Tooltip>
								</div>
							</Card.Grid>
						</Card>

						<Space
							style={{
								width: "100%",
								marginBottom: 64,
							}}
							direction="vertical"
							size="large">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}>
								<div
									style={{
										fontWeight: "bold",
									}}>
									At a glance
								</div>
								<Select
									size="large"
									defaultValue="12months"
									style={{ minWidth: 192 }}
									popupMatchSelectWidth={true}
									options={[
										{
											value: "12months",
											label: (
												<>
													<CalendarOutlined /> Last 12 Months
												</>
											),
										},
										{
											value: "6months",
											label: (
												<>
													<CalendarOutlined /> Last 6 Months
												</>
											),
										},
										{
											value: "3months",
											label: (
												<>
													<CalendarOutlined /> Last 3 Months
												</>
											),
										},
									]}></Select>
							</div>
							<Card
								style={{
									borderRadius: "8px",
									minHeight: 128,
								}}
								styles={{ body: { padding: 0 } }}>
								<Card.Grid
									style={{
										padding: "16px 24px",
										borderRadius: "8px 0px 0px 8px",
										minHeight: 128,
										display: "flex",
										flexDirection: "column",
										gap: 16,
									}}>
									<div>
										<Typography.Text
											style={{
												fontSize: "small",
											}}>
											PROJECTS{" "}
										</Typography.Text>
										<QuestionCircleOutlined />
									</div>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
										}}>
										<div
											style={{
												fontSize: "large",
												fontWeight: "bold",
											}}>
											5
										</div>
										<Button icon={<ArrowRightOutlined />} type="link"></Button>
									</div>
									<Progress percent={26.3} size="small" />
								</Card.Grid>
								<Card.Grid
									style={{
										padding: "16px 24px",
										minHeight: 128,
										display: "flex",
										flexDirection: "column",
										gap: 16,
									}}>
									<div>
										<Typography.Text
											style={{
												fontSize: "small",
											}}>
											PENDING TASKS{" "}
										</Typography.Text>
										<QuestionCircleOutlined />
									</div>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
										}}>
										<div
											style={{
												fontSize: "large",
												fontWeight: "bold",
											}}>
											7
										</div>
										<Button icon={<ArrowRightOutlined />} type="link"></Button>
									</div>
									<Progress percent={10.5} size="small" />
								</Card.Grid>
								<Card.Grid
									style={{
										padding: "16px 24px",
										borderRadius: "0px 8px 8px 0px",
										minHeight: 128,
										display: "flex",
										flexDirection: "column",
										gap: 16,
									}}>
									<div>
										<Typography.Text
											style={{
												fontSize: "small",
											}}>
											PENDING TASKS{" "}
										</Typography.Text>
										<QuestionCircleOutlined />
									</div>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
										}}>
										<div
											style={{
												fontSize: "large",
												fontWeight: "bold",
											}}>
											7
										</div>
										<Button icon={<ArrowRightOutlined />} type="link"></Button>
									</div>
									<Progress percent={10.5} size="small" />
								</Card.Grid>
							</Card>
							<Tabs
								defaultActiveKey="tasks"
								tabPosition="top"
								style={{ minHeight: 240, padding: "0px" }}
								items={tableTabs}
								animated={{ inkBar: true, tabPane: true }}
								size="middle"
								type="line"
								tabBarStyle={{
									backgroundColor: "white",
									padding: "0px 16px",
									borderRadius: 8,
									marginBottom: 24,
								}}
								indicator={{ size: (origin) => origin + 16, align: "center" }}
							/>
							<Card
								hoverable={true}
								style={{
									borderRadius: "8px",
									cursor: "unset",
								}}
								styles={{
									body: {
										padding: "4px",
										display: "flex",
										gap: 16,
										minHeight: 64,
										alignItems: "center",
									},
								}}>
								<Progress type="circle" percent={40} size={40} />
								<div
									style={{
										flexGrow: 1,
									}}>
									<div
										style={{
											fontWeight: "bold",
										}}>
										Project 1 / Project 2 / Project 3
									</div>
									<div>
										Started{" "}
										<span style={{ fontWeight: "bold" }}>June 4 2019</span>
									</div>
								</div>
								<Button
									type="primary"
									ghost={true}
									shape="circle"
									size="small"
									icon={<ArrowRightOutlined />}></Button>
							</Card>
						</Space>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
