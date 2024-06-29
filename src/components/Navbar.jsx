import { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import {
	CaretLeftFilled,
	CaretRightFilled,
	MenuFoldOutlined,
	MenuOutlined,
	MenuUnfoldOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useLogout } from "../api/hooks";

const Navbar = ({
	vanished,
	collapsed,
	toggleCollapsed,
	toggleVanished,
	drawerOpener,
	showAddButton,
}) => {
	const [visible, setVisible] = useState(false);
	const showDrawer = () => {
		setVisible(!visible);
	};
	
	// If you do not want to auto-close the mobile drawer when a path is selected
	// Delete or comment out the code block below
	// From here
	let { pathname: location } = useLocation();
	useEffect(() => {
		setVisible(false);
	}, [location]);
	// Upto here

	return (
		<nav className="navbar">
			<Layout>
				<Layout.Header className="nav-header">
					{/* <div className="logo">
						<h3 className="brand-font">Brand Here</h3>
					</div> */}

					<div
						className="navbar-menu"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<div
							style={{
								float: "left",
								display: "flex",
								alignItems: "center",
							}}>
							<Button
								onClick={() => {
									vanished
										? toggleCollapsed()
										: collapsed
										? toggleVanished()
										: toggleCollapsed();
								}}
								type="text"
								size="large"
								style={
									{
										// transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s",
										// border: "none",
									}
								}
								icon={
									vanished ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
								}></Button>
							{showAddButton && (
								<Button
									onClick={() => {
										drawerOpener();
									}}
									type="link"
									style={{
										padding: 0,
										margin: "auto",
										marginLeft: "8px",
									}}
									size="large"
									icon={
										<PlusCircleOutlined
											style={{
												fontSize: 24,
											}}
										/>
									}></Button>
							)}
						</div>

						{/* <div className="leftMenu">
							<LeftMenu mode={"horizontal"} />
						</div> */}
						<Button className="menuButton" type="text" onClick={showDrawer}>
							<MenuOutlined />
						</Button>
						<div className="rightMenu">
							<RightMenu mode={"horizontal"} />
						</div>

						<Drawer
							title={"Brand Here"}
							placement="right"
							closable={true}
							onClose={showDrawer}
							open={visible}
							style={{ zIndex: 4 }}>
							{/* <LeftMenu mode={"inline"} /> */}
							<RightMenu mode={"inline"} />
						</Drawer>
					</div>
				</Layout.Header>
			</Layout>
		</nav>
	);
};

export default Navbar;
