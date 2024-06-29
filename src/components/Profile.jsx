import {
	ArrowRightOutlined,
	CalendarOutlined,
	CarryOutOutlined,
	CheckOutlined,
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
	Drawer,
	Dropdown,
	Input,
	Menu,
	Progress,
	Row,
	Select,
	Space,
	Spin,
	Table,
	Tabs,
	Tag,
	Tooltip,
	Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useTableColumns } from "./Component_Hooks";
import { useSelector } from "react-redux";
import { useGetData } from "../api/hooks";
import {
	getTimeLeftForNextBirthday,
	horizontalScroll,
} from "../util/functions";
import Edit_Staff from "./Edit_Staff";

function Profile({
	profileLoading,
	profileData,
	tableTabs,
	defaultTabsKey,
	staff,
	editProfileOperation,
	breadCrumbItems,
}) {
	const { vanished, collapsed } = useOutletContext();

	const items = [
		{
			label: (
				<a target="_blank" rel="noopener noreferrer" href="">
					1st menu item
				</a>
			),
			key: "0",
		},
		{
			label: (
				<a target="_blank" rel="noopener noreferrer" href="">
					2nd menu item
				</a>
			),
			key: "1",
		},
	];

	return (
		<Spin spinning={profileLoading}>
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					height: "calc(100vh - 66px)",
					alignItems: "center",
					overflow: "auto",
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
						<Breadcrumb items={breadCrumbItems} />
					</div>
					<div
						style={{
							height: 203,
							minWidth: "548px",
							borderRadius: "12px, 12px, 0px, 0px",
							backgroundImage: "url(/profile-gradient.png)",
							backgroundRepeat: "no-repeat",
							backgroundAttachment: "fixed",
							backgroundSize: "100% 100%",
						}}></div>
					<div
						style={{
							minHeight: "calc(100vh - 300px)",
							// backgroundColor: "rgba(137, 136, 135, 0.2)",
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
									<img
										src="/Verified-Tick.svg"
										alt="Verified"
										style={{
											position: "absolute",
											bottom: 10,
											right: 10,
											// width: "20px",
											// height: "20px",
										}}
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
									minWidth: "484px",
								}}>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										// marginBottom: 16,
										// justifyContent: "space-evenly",
										gap: 8,
									}}>
									<div style={{ display: "flex", alignItems: "center" }}>
										<Typography.Text
											style={{
												fontSize: 24,
												fontWeight: 700,
												lineHeight: "120%",
												color: "rgba(0,0,0,0.6)",
											}}>
											{profileData?.name}
										</Typography.Text>

										<Tag style={{ marginLeft: 8 }} color={"blue"}>
											<Typography.Text copyable={true}>
												id something
											</Typography.Text>
										</Tag>
									</div>
									<div
										style={{
											color: "rgba(0,0,0,0.8)",
										}}>
										{profileData?.email}
									</div>
									<div style={{ fontSize: "small" }}>
										Joined on {new Date(profileData?.createdAt).toDateString()}
									</div>
								</div>
								<div
									style={{
										display: "flex",
										gap: 8,
										height: "min-content",
										alignItems: "center",
									}}>
									<Button
										size="middle"
										type="primary"
										onClick={editProfileOperation}>
										Edit Profile
									</Button>
									{/* In Case of Your Own Profile Editing */}
									{/* <Link to="/dashboard/settings#my-profile">
										<Button
											size="middle"
											type="primary"
											>
											Edit Profile
										</Button>
									</Link> */}
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
								gridTemplateColumns: "224px minmax(300px,1fr)",
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
									<div style={{ textAlign: "center", padding: "0px 8px" }}>
										<div style={{ fontSize: "large", fontWeight: "bold" }}>
											{profileData?.name}
										</div>
										<div style={{ fontSize: "small" }}>
											{profileData?.birthday
												? getTimeLeftForNextBirthday(profileData?.birthday)
												: "Two Weeks"}{" "}
											left for {profileData?.name}'s Birthday
										</div>
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
										<Button
											style={{ padding: 0 }}
											type="link"
											onClick={editProfileOperation}>
											Change
										</Button>
										{/* In Case of Your Own Profile Editing */}
										{/* <Link
											to="/dashboard/settings#my-profile"
											style={{ padding: 0 }}>
											Change
										</Link> */}
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
												flexGrow: 1,
												display: "flex",
												justifyContent: "space-between",
												margin: 0,
												position: "unset",
											}}
											editable={{
												enterIcon: <></>,
												onStart: () => {
													editProfileOperation();
												},
												// Incase Of Own Profile Editing
												// icon: (
												// 	<Link to="/dashboard/settings#my-profile">
												// 		<EditOutlined />
												// 	</Link>
												// ),
											}}
											ellipsis={{ rows: 1 }}>
											{profileData?.email}
										</Typography.Text>
										<Tooltip title={"Delete"}>
											<Button
												onClick={editProfileOperation}
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
												whiteSpace: "wrap",
												flexGrow: 1,
												display: "flex",
												justifyContent: "space-between",
												margin: 0,
												position: "unset",
											}}
											editable={{
												enterIcon: <></>,
												onStart: () => {
													editProfileOperation();
												},
												// Incase Of Own Profile Editing
												// icon: (
												// 	<Link to="/dashboard/settings#my-profile">
												// 		<EditOutlined />
												// 	</Link>
												// ),
												// editing: true,
											}}
											ellipsis={{ rows: 1 }}>
											{"" + profileData?.phoneNumber}
										</Typography.Text>
										<Tooltip title={"Delete"}>
											<Button
												onClick={editProfileOperation}
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
											<Button
												icon={<ArrowRightOutlined />}
												type="link"></Button>
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
											<Button
												icon={<ArrowRightOutlined />}
												type="link"></Button>
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
											<Button
												icon={<ArrowRightOutlined />}
												type="link"></Button>
										</div>
										<Progress percent={10.5} size="small" />
									</Card.Grid>
								</Card>
								<Tabs
									defaultActiveKey={defaultTabsKey}
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
		</Spin>
	);
}

export default Profile;
