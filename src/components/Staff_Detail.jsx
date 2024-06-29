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
import React, { useEffect, useMemo, useState } from "react";
import {
	Link,
	useNavigate,
	useOutletContext,
	useParams,
} from "react-router-dom";
import { useTableColumns } from "./Component_Hooks";
import { useSelector } from "react-redux";
import { useGetData } from "../api/hooks";
import {
	getTimeLeftForNextBirthday,
	horizontalScroll,
} from "../util/functions";
import Edit_Staff from "./Edit_Staff";
import Profile from "./Profile";
import dayjs from "dayjs";

function Staff_Detail() {
	const routeParams = useParams();
	const selectedStaff = useMemo(() => {
		return routeParams.id;
	}, [routeParams]);
	const [loading, setLoading] = useState(true);
	const [staffProfileData, setStaffProfileData] = useState(true);
	const { setDrawerOpener, setShowAddButton } = useOutletContext();
	const { taskTableColumns, projectTableColumns } = useTableColumns();
	const {
		tableData: taskReduxTableData,
		loading: taskLoading,
		tableParams: taskTableParams,
	} = useSelector((state) => state.task);

	const taskTableData = useMemo(() => {
		return taskReduxTableData.filter((task) =>
			task?.assignedTo?.some((worker) => worker?._id == selectedStaff)
		);
	}, [taskReduxTableData]);

	const {
		tableData: staffTableData,
		loading: staffLoading,
		tableParams: staffTableParams,
	} = useSelector((state) => state.staff);
	const { profileData: profileData, loading: profileLoading } = useSelector(
		(state) => state.profile
	);
	const navigate = useNavigate();
	const { getTasks } = useGetData();
	const tableTabs = [
		{ key: "startToMakeEveryIndicatorCentered" },
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
			title: <Link to="/dashboard/staff">Staff</Link>,
		},
		{
			title: (
				<Link to={`/dashboard/staff_detail/${selectedStaff}`}>
					Staff_Detail
				</Link>
			),
		},
	];
	const editProfileOperation = () => {
		navigate("/dashboard/settings#my-profile");
	};
	const [openEditProfile, setOpenEditProfile] = useState(false);

	const showEditProfileDrawer = () => {
		setOpenEditProfile(true);
	};

	const closeEditProfileDrawer = () => {
		setOpenEditProfile(false);
	};
	useEffect(() => {
		setLoading(true);
		if (!taskTableData?.length) {
			getTasks();
		}
		const result = staffTableData?.find(
			(staff) => staff?._id === selectedStaff
		);
		if (result) {
			setStaffProfileData(result);
		} else {
			navigate("/page-not-found", { replace: true });
		}

		console.log(staffProfileData);
		setShowAddButton(false);
		setTimeout(() => {
			setLoading(false);
		}, 200);
		// return horizontalScroll();
	}, []);

	return (
		<>
			<Profile
				profileLoading={loading}
				profileData={staffProfileData}
				tableTabs={tableTabs}
				defaultTabsKey={"tasks"}
				staff={true}
				editProfileOperation={showEditProfileDrawer}
				breadCrumbItems={breadCrumbItems}
			/>
			<Drawer
				// size="large"
				title="Edit Profile"
				onClose={closeEditProfileDrawer}
				open={openEditProfile}>
				<Edit_Staff
					staffProfileData={{
						firstname: staffProfileData?.name?.split(/ (.+)/)[0] ?? "",
						lastname: staffProfileData?.name?.split(/ (.+)/)[1] ?? "",
						email: staffProfileData?.email ?? "",
						phoneNumber: staffProfileData?.phoneNumber ?? "",
						address: "",
						active: !staffProfileData?.isOnHold,
						canEdit: false,
						// dob : dayjs(staffProfileData?.dob),
						dob: "",
					}}
				/>
			</Drawer>
		</>
	);
}

export default Staff_Detail;
