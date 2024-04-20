import { Button, Menu } from "antd";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Dashboard = () => {
	//Default Route Dashboard Component

	return (
		<div id="main">
			<Menu
				style={{
					width: 256,
					height: "100vh",
				}}
				defaultSelectedKeys={["home"]}
				mode="inline">
				<div style={{ maxWidth: 256 }} to="/">
					<img style={{ width: "100%", height: "auto" }} src={logo} alt="" />
				</div>

				<Menu.Item key="project">
					<Link to="/dashboard/project">Project</Link>
				</Menu.Item>
				{/* <Menu.Item key="add_project">
					<Link to="/add_project">Add Project</Link>
				</Menu.Item> */}
				<Menu.Item key="staff">
					<Link to="/dashboard/staff">Staff</Link>
				</Menu.Item>
				{/* <Menu.Item key="add_staff">
					<Link to="/staff">Add Staff</Link>
				</Menu.Item> */}
				<Menu.Item key="tasks">
					<Link to="/dashboard/tasks">Tasks</Link>
				</Menu.Item>
				{/* <Menu.Item key="add_task">
					<Link to="/add_task">Add Task</Link>
				</Menu.Item> */}
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
