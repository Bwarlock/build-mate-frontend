import { Button, Menu } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useLogout } from "../api/hooks";
import { useSelector } from "react-redux";
import {
	CaretLeftFilled,
	CaretRightFilled,
	LogoutOutlined,
	OrderedListOutlined,
	ProfileFilled,
	ProfileOutlined,
	ProjectFilled,
	ProjectOutlined,
	TeamOutlined,
	UserOutlined,
	UserSwitchOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
	//Dashboard Route Component
	const [collapsed, setCollapsed] = useState(true);
	const [vanished, setVanished] = useState(false);
	const logout = useLogout();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.global);
	const handleLogout = () => {
		logout();
		navigate("/login");
	};
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
		setVanished(false);
	};
	const toggleVanished = () => {
		setVanished(!vanished);
	};
	useEffect(() => {
		const checkIfMobile = () => {
			if (window.innerWidth <= 640) {
				setCollapsed(true);
			} else {
				setCollapsed(false);
			}
		};
		checkIfMobile();

		window.addEventListener("resize", checkIfMobile);

		navigate("/dashboard/tasks");

		return () => {
			window.removeEventListener("resize", checkIfMobile);
		};
	}, []);
	return (
		<div id="main">
			{!vanished && (
				<Menu
					style={{
						maxWidth: 256,
						height: "100vh",
						display: "flex",
						flexDirection: "column",
					}}
					inlineCollapsed={collapsed}
					defaultSelectedKeys={["tasks"]}
					mode="inline">
					<div
						style={{ maxWidth: 256, maxHeight: 256, textAlign: "center" }}
						to="/">
						<img
							style={{ maxWidth: "70%", height: "auto" }}
							src={logo}
							alt="Build-Mate Logo"
						/>
					</div>

					<Menu.Item
						icon={<ProjectFilled />}
						style={{ fontWeight: "bold" }}
						key="project">
						<Link to="/dashboard/project">Project</Link>
					</Menu.Item>

					<Menu.Item icon={<TeamOutlined />} key="staff">
						<Link style={{ fontWeight: "bold" }} to="/dashboard/staff">
							Staff
						</Link>
					</Menu.Item>

					<Menu.Item
						icon={<OrderedListOutlined />}
						style={{ fontWeight: "bold" }}
						key="tasks">
						<Link to="/dashboard/tasks">Tasks</Link>
					</Menu.Item>

					<Menu.Item
						icon={<UserSwitchOutlined />}
						style={{ fontWeight: "bold" }}
						key="clients">
						<Link to="/dashboard/clients">Clients</Link>
					</Menu.Item>

					<Menu.Item
						icon={<UserOutlined />}
						style={{
							marginTop: "auto",
							fontWeight: "bold",
							// width: "100%",
						}}
						key="user">
						{user.name || user.email}
					</Menu.Item>
					<Menu.Item
						icon={<LogoutOutlined />}
						style={{
							fontWeight: "bold",
							// width: "100%",
						}}
						key="logout"
						onClick={handleLogout}>
						Log Out
					</Menu.Item>
				</Menu>
			)}

			<Button
				onClick={() => {
					vanished
						? toggleCollapsed()
						: collapsed
						? toggleVanished()
						: toggleCollapsed();
				}}
				style={{
					position: "absolute",
					left: vanished ? 0 : collapsed ? 80 : 256,
				}}
				icon={vanished ? <CaretRightFilled /> : <CaretLeftFilled />}></Button>

			<div
				id="inside"
				style={{
					width: collapsed ? "100%" : "calc(100vw - 256px)",
					height: "100vh",
					overflow: "auto",
					margin: 0,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}>
				<div className="outlet">
					<Outlet />
				</div>
			</div>
			{/* </Layout> */}
		</div>
	);
};
export default Dashboard;
