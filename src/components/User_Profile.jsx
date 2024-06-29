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
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useTableColumns } from "./Component_Hooks";
import { useSelector } from "react-redux";
import { useGetData } from "../api/hooks";
import {
	getTimeLeftForNextBirthday,
	horizontalScroll,
} from "../util/functions";
import Edit_Staff from "./Edit_Staff";
import Profile from "./Profile";

function User_Profile() {
	const { setDrawerOpener, setShowAddButton } = useOutletContext();
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
	const { profileData: profileData, loading: profileLoading } = useSelector(
		(state) => state.profile
	);
	const navigate = useNavigate();
	const { getTasks, getProjects, getProfile } = useGetData();
	const tableTabs = [
		{ key: "startToMakeEveryIndicatorCentered" },
		{
			label: (
				<>
					Projects{" "}
					<Badge
						count={projectTableParams[0]?.pagination?.total}
						color="#00000040"
					/>
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
					Tasks{" "}
					<Badge
						count={taskTableParams[0]?.pagination?.total}
						color="#00000040"
					/>
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
	const breadCrumbItems = [
		{
			title: <Link to="/dashboard">Dashboard</Link>,
		},
		{
			title: <Link to="/dashboard/profile">Profile</Link>,
		},
	];
	const editProfileOperation = () => {
		navigate("/dashboard/settings#my-profile");
	};
	useEffect(() => {
		if (!taskTableData?.length) {
			getTasks();
		}
		if (!projectTableData.length) {
			getProjects();
		}
		if (Object.keys(profileData).length == 0) {
			getProfile();
		}
		setShowAddButton(false);
		// return horizontalScroll();
	}, []);

	return (
		<Profile
			profileLoading={profileLoading}
			profileData={profileData}
			tableTabs={tableTabs}
			defaultTabsKey={"tasks"}
			staff={false}
			editProfileOperation={editProfileOperation}
			breadCrumbItems={breadCrumbItems}
		/>
	);
}

export default User_Profile;
