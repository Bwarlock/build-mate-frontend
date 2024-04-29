import { Menu } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect } from "react";
import { useLogout } from "../api/hooks";
import { useSelector } from "react-redux";

const Dashboard = () => {
	//Dashboard Route Component
	const logout = useLogout();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.global);
	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	useEffect(() => {
		navigate("/dashboard/tasks");
	}, []);
	return (
		<div id="main">
			<Menu
				style={{
					width: 256,
					height: "100vh",
					display: "flex",
					flexDirection: "column",
				}}
				defaultSelectedKeys={["tasks"]}
				mode="inline">
				<div
					style={{ maxWidth: 256, maxHeight: 256, textAlign: "center" }}
					to="/">
					<img
						style={{ width: "70%", height: "auto" }}
						src={logo}
						alt="Build-Mate Logo"
					/>
				</div>

				<Menu.Item style={{ fontWeight: "bold" }} key="project">
					<Link to="/dashboard/project">Project</Link>
				</Menu.Item>

				<Menu.Item key="staff">
					<Link style={{ fontWeight: "bold" }} to="/dashboard/staff">
						Staff
					</Link>
				</Menu.Item>

				<Menu.Item style={{ fontWeight: "bold" }} key="tasks">
					<Link to="/dashboard/tasks">Tasks</Link>
				</Menu.Item>

				<Menu.Item style={{ fontWeight: "bold" }} key="clients">
					<Link to="/dashboard/clients">Clients</Link>
				</Menu.Item>
				<Menu.ItemGroup
					style={{
						position: "absolute",
						bottom: 0,
						zIndex: 1,
						width: "248px",
					}}>
					<Menu.Item
						style={{
							fontWeight: "bold",
							width: "100%",
						}}
						key="user">
						{user.name || user.email}
					</Menu.Item>
					<Menu.Item
						style={{
							fontWeight: "bold",
							width: "100%",
						}}
						key="logout"
						onClick={handleLogout}>
						Log Out
					</Menu.Item>
				</Menu.ItemGroup>
			</Menu>
			<div id="inside">
				<div className="outlet">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
export default Dashboard;
