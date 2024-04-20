import { Button, Menu } from "antd";
import { Outlet, Link } from "react-router-dom";
import one from "../assets/one.jpg";

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
				<Menu.Item key="home">
					<Link style={{ maxWidth: 256, maxHeight: 200 }} to="/">
						<img style={{ width: "100%", height: "auto" }} src={one} alt="" />
					</Link>
				</Menu.Item>
				{/* <Menu.Item key="login">
					<Link to="/login">Login</Link>
				</Menu.Item> */}
				<Menu.Item key="register">
					<Link to="/register">Register</Link>
				</Menu.Item>
				<Menu.Item key="project">
					<Link to="/register">Project</Link>
				</Menu.Item>
				<Menu.Item key="add_project">
					<Link to="/add_project">Add Project</Link>
				</Menu.Item>
				<Menu.Item key="staff">
					<Link to="/staff">Staff</Link>
				</Menu.Item>
				<Menu.Item key="add_staff">
					<Link to="/staff">Add Staff</Link>
				</Menu.Item>
				<Menu.Item key="tasks">
					<Link to="/tasks">Tasks</Link>
				</Menu.Item>
				<Menu.Item key="add_task">
					<Link to="/add_task">Add Task</Link>
				</Menu.Item>
			</Menu>
			<div id="inside">
				<nav className="menuBar">
					{/* <div className="logo">
						<a href="">logo</a>
					</div> */}
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
				</nav>
				<br />
				<div className="outlet">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
export default Dashboard;
