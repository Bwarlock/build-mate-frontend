import React from "react";
import {
	Menu,
	Avatar,
	Button,
	List,
	Tag,
	Badge,
	ConfigProvider,
	Card,
} from "antd";
import {
	UserOutlined,
	CodeOutlined,
	LogoutOutlined,
	QuestionCircleOutlined,
	BellOutlined,
	DesktopOutlined,
} from "@ant-design/icons";
import { useLogout } from "../api/hooks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RightMenu = ({ mode }) => {
	const logout = useLogout();
	const { user } = useSelector((state) => state.global);

	const notificationData = [
		{
			avatar: <DesktopOutlined style={{ fontSize: 20 }} />,
			title: "2018 Macbook Pro 15-inch",
			description: "melbourne, Australia • 22 Jan at 10:40am",
		},
		{
			avatar: <DesktopOutlined style={{ fontSize: 20 }} />,
			title: "2018 Macbook Pro 15-inch",
			description: "melbourne, Australia • 22 Jan at 4:40pm",
		},
	];
	return (
		// <div
		// 	style={{ display: mode == "inline" ? "" : "flex", alignItems: "center" }}>

		<Menu
			triggerSubMenuAction="click"
			selectedKeys={[]}
			mode={mode}
			style={{
				alignItems: "center",
			}}>
			<Menu.SubMenu
				style={{
					margin: 0,
				}}
				// popupClassName="notification-submenu"
				key="info"
				size="large"
				type="text"
				block={mode == "inline" ? true : false}
				icon={
					<QuestionCircleOutlined
						style={{
							fontSize: 20,
						}}
					/>
				}
				title={
					<span
						// style={{
						// 	display: mode == "inline" ? "" : "none",
						// }}
						className="menuText">
						Info
					</span>
				}>
				<Card bordered={false}>something to write</Card>
			</Menu.SubMenu>

			<Menu.SubMenu
				style={{
					margin: 0,
				}}
				popupClassName="notification-submenu"
				key="notification"
				size="large"
				type="text"
				block={mode == "inline" ? true : false}
				icon={
					<Badge count={2} size="small">
						<BellOutlined
							style={{
								fontSize: 20,
							}}
						/>
					</Badge>
				}
				title={
					<span
						// style={{
						// 	display: mode == "inline" ? "" : "none",
						// }}
						className="menuText">
						Notification
					</span>
				}>
				<List
					style={{ padding: 8, paddingLeft: 28 }}
					itemLayout="horizontal"
					dataSource={notificationData}
					renderItem={(item, index) => (
						<List.Item>
							<List.Item.Meta
								avatar={item.avatar}
								title={item.title}
								description={item.description}
							/>
						</List.Item>
					)}
				/>
			</Menu.SubMenu>

			<Menu.SubMenu
				key="profile"
				icon={<Avatar size={24} icon={<UserOutlined />} />}
				title={
					<>
						<span className="username">{user?.name || user?.email}</span>
					</>
				}>
				<Menu.Item key="project" icon={<CodeOutlined />}>
					<Link to="/dashboard/project">Project</Link>
				</Menu.Item>
				<Menu.Item key="about-us" icon={<UserOutlined />}>
					<Link to="/dashboard/profile">Profile</Link>
				</Menu.Item>
				<Menu.Item
					key="log-out"
					onClick={() => {
						logout();
					}}>
					<LogoutOutlined /> Logout
				</Menu.Item>
			</Menu.SubMenu>
		</Menu>

		// </div>
	);
};

export default RightMenu;
