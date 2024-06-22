import React from "react";
import { Menu, Avatar } from "antd";
import {
	UserOutlined,
	CodeOutlined,
	LogoutOutlined,
	QuestionCircleOutlined,
	BellOutlined,
} from "@ant-design/icons";

const RightMenu = ({ mode }) => {
	return (
		<Menu mode={mode}>
			<Menu.Item key="info">
				<QuestionCircleOutlined />
				<span className="menuText">Info</span>
			</Menu.Item>
			<Menu.Item key="notification">
				<BellOutlined />
				<span className="menuText">Notification</span>
			</Menu.Item>
			<Menu.SubMenu
				title={
					<>
						<Avatar icon={<UserOutlined />} />
						<span className="username">John Doe</span>
					</>
				}>
				<Menu.Item key="project">
					<CodeOutlined /> Projects
				</Menu.Item>
				<Menu.Item key="about-us">
					<UserOutlined /> Profile
				</Menu.Item>
				<Menu.Item key="log-out">
					<LogoutOutlined /> Logout
				</Menu.Item>
			</Menu.SubMenu>
		</Menu>
	);
};

export default RightMenu;
