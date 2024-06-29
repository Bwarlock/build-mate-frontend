import { Button, Image, Menu } from "antd";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useLogout } from "../api/hooks";
import { useSelector } from "react-redux";
import {
	CaretLeftFilled,
	CaretRightFilled,
	DeleteFilled,
	DeleteOutlined,
	FileTextOutlined,
	LogoutOutlined,
	OrderedListOutlined,
	ProfileFilled,
	ProfileOutlined,
	ProjectFilled,
	ProjectOutlined,
	SettingOutlined,
	TeamOutlined,
	UserOutlined,
	UserSwitchOutlined,
} from "@ant-design/icons";
import Navbar from "./Navbar";

const Dashboard = () => {
	//Dashboard Route Component
	const [drawerOpener, setDrawerOpener] = useState();
	const [showAddButton, setShowAddButton] = useState(true);
	const [collapsed, setCollapsed] = useState(false);
	const [vanished, setVanished] = useState(false);
	const logout = useLogout();
	const navigate = useNavigate();
	const location = useLocation();

	const { user } = useSelector((state) => state.global);
	const handleLogout = () => {
		logout();
		// navigate("/login");
	};
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
		setVanished(false);
	};
	const toggleVanished = () => {
		setVanished(!vanished);
	};

	useEffect(() => {
		if (location.pathname == "/dashboard") {
			navigate("/dashboard/tasks", { replace: true });
		}
	});
	useEffect(() => {
		const checkIfMobile = () => {
			if (window.innerWidth <= 640) {
				setCollapsed(true);
				setVanished(true);
			}
		};
		checkIfMobile();

		window.addEventListener("resize", checkIfMobile);
		return () => {
			window.removeEventListener("resize", checkIfMobile);
		};
	}, []);
	return (
		<div id="main">
			{/* {!vanished && ( */}
			<Menu
				style={{
					maxWidth: vanished ? 0 : 256,
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					overflowY: "auto",
					transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s",
					// transition: "all 0.4s ease",
				}}
				inlineCollapsed={collapsed}
				selectedKeys={[location.pathname?.split("/")[2] ?? undefined]}
				mode="inline">
				<div
					style={{
						maxWidth: 256,
						maxHeight: 256,
						textAlign: "center",
						// borderRadius: 10,
						// backgroundColor: "#e6f4ff",
						// margin: "4px 4px 0px 4px",
					}}
					to="/">
					<Image
						width="70%"
						height="auto"
						// style={{ maxWidth: "70%", height: "auto" }}
						src={logo}
						alt="Build-Mate Logo"
						fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
					/>
				</div>

				<Menu.Item
					icon={<ProjectOutlined />}
					style={{
						fontWeight: "bold",
						minHeight: "40px",
					}}
					key="project">
					<Link to="/dashboard/project">Project</Link>
				</Menu.Item>

				<Menu.Item
					icon={<TeamOutlined />}
					style={{
						fontWeight: "bold",
						minHeight: "40px",
					}}
					key="staff">
					<Link to="/dashboard/staff">Staff</Link>
				</Menu.Item>

				<Menu.Item
					icon={<OrderedListOutlined />}
					style={{
						fontWeight: "bold",
						minHeight: "40px",
					}}
					key="tasks">
					<Link to="/dashboard/tasks">Tasks</Link>
				</Menu.Item>

				<Menu.Item
					icon={<UserSwitchOutlined />}
					style={{
						fontWeight: "bold",
						minHeight: "40px",
					}}
					key="clients">
					<Link to="/dashboard/clients">Clients</Link>
				</Menu.Item>

				<Menu.SubMenu
					icon={<DeleteOutlined />}
					style={{ fontWeight: "bold" }}
					key="trash"
					title="Trash">
					<Menu.Item
						icon={<DeleteFilled />}
						style={{
							fontWeight: "bold",
							minHeight: "40px",
						}}
						key="tasks-trash">
						<Link to="/dashboard/tasks-trash">Tasks-Trash</Link>
					</Menu.Item>
					<Menu.Item
						icon={<DeleteFilled />}
						style={{
							fontWeight: "bold",
							minHeight: "40px",
						}}
						key="project-trash">
						<Link to="/dashboard/project-trash">Project-Trash</Link>
					</Menu.Item>
				</Menu.SubMenu>

				<Menu.Item
					icon={<FileTextOutlined />}
					style={{
						fontWeight: "bold",
						minHeight: "40px",
					}}
					key="documents">
					<Link to="/dashboard/documents">Writer</Link>
				</Menu.Item>

				<Menu.Item
					icon={<UserOutlined />}
					style={{
						marginTop: "auto",
						fontWeight: "bold",
						minHeight: "40px",
						// width: "100%",
					}}
					key="profile">
					<Link to="/dashboard/profile">{user?.name || user?.email}</Link>
				</Menu.Item>
				<Menu.Item
					icon={<SettingOutlined />}
					style={{
						fontWeight: "bold",
						minHeight: "40px",
					}}
					key="settings">
					<Link to="/dashboard/settings">Settings</Link>
				</Menu.Item>
				<Menu.Item
					icon={<LogoutOutlined />}
					style={{
						fontWeight: "bold",
						minHeight: "40px",
						// width: "100%",
					}}
					key="logout"
					onClick={handleLogout}>
					Log Out
				</Menu.Item>
			</Menu>
			{/* )} */}

			{/* <Button
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
					zIndex: 5,
					// transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s",
				}}
				icon={vanished ? <CaretRightFilled /> : <CaretLeftFilled />}></Button> */}

			<div
				id="inside"
				style={{
					width: vanished
						? "100vw"
						: collapsed
						? "calc(100vw - 80px)"
						: "calc(100vw - 256px)",
					height: "100vh",
					overflow: "auto",
					margin: 0,
					// padding: "1rem",
				}}>
				<Navbar
					vanished={vanished}
					collapsed={collapsed}
					toggleCollapsed={toggleCollapsed}
					toggleVanished={toggleVanished}
					drawerOpener={drawerOpener}
					showAddButton={showAddButton}
				/>
				<Outlet
					context={{
						vanished,
						collapsed,
						setVanished,
						setCollapsed,
						setDrawerOpener,
						setShowAddButton,
					}}
				/>
			</div>
			{/* </Layout> */}
		</div>
	);
};
export default Dashboard;
