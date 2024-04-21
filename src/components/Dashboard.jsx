import { Button, Menu } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../auth/AuthProvider";
import { useEffect } from "react";

const Dashboard = () => {
	//Default Route Dashboard Component
	const { logout } = useAuth();
	const navigate = useNavigate();
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
				defaultSelectedKeys={["home"]}
				mode="inline">
				<div
					style={{ maxWidth: 256, maxHeight: 256, textAlign: "center" }}
					to="/">
					<img style={{ width: "70%", height: "auto" }} src={logo} alt="" />
				</div>

				<Menu.Item style={{ fontWeight: "bold" }} key="project">
					<Link to="/dashboard/project">Project</Link>
				</Menu.Item>
				{/* <Menu.Item key="add_project">
					<Link to="/add_project">Add Project</Link>
				</Menu.Item> */}
				<Menu.Item key="staff">
					<Link style={{ fontWeight: "bold" }} to="/dashboard/staff">
						Staff
					</Link>
				</Menu.Item>
				{/* <Menu.Item key="add_staff">
					<Link to="/staff">Add Staff</Link>
				</Menu.Item> */}
				<Menu.Item style={{ fontWeight: "bold" }} key="tasks">
					<Link to="/dashboard/tasks">Tasks</Link>
				</Menu.Item>
				<Menu.Item style={{ fontWeight: "bold" }} key="clients">
					<Link to="/dashboard/clients">Clients</Link>
				</Menu.Item>
				{/* <Menu.Item key="add_task">
					<Link to="/add_task">Add Task</Link>
				</Menu.Item> */}

				<Menu.Item
					style={{
						fontWeight: "bold",
						position: "absolute",
						bottom: 0,
						zIndex: 1,
						width: "inherit",
					}}
					key="logout"
					onClick={handleLogout}>
					Log Out
				</Menu.Item>
			</Menu>
			<div id="inside">
				{/* <nav className="menuBar">
					
					<div className="about">
						<Link
							style={{
								textDecoration: "none",
								color: "inherit",
								fontSize: "20px",
							}}
							to="/about">
							About
						</Link>
					</div>
				</nav> */}

				<div className="outlet">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
export default Dashboard;
