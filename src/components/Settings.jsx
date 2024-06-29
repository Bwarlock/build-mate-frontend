import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloudUploadOutlined,
	DesktopOutlined,
	InfoCircleOutlined,
	QuestionCircleOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import {
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	Divider,
	Form,
	Input,
	List,
	Select,
	Space,
	Tabs,
	Tag,
	Tooltip,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect } from "react";
import {
	Link,
	useLocation,
	useNavigate,
	useOutletContext,
} from "react-router-dom";

function Settings() {
	const { setDrawerOpener, setShowAddButton } = useOutletContext();
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		setShowAddButton(false);
	}, []);
	useEffect(() => {
		if (location.hash == "") {
			navigate("/dashboard/settings#my-profile", { replace: true });
		} else if (
			!settingsTabs.some((value) => location.hash.substring(1) == value.key)
		) {
			navigate("/page-not-found", { replace: true });
		}
	});
	const loginData = [
		{
			avatar: (
				<DesktopOutlined
					style={{
						fontSize: 20,
					}}
				/>
			),
			title: "2018 Macbook Pro 15-inch",
			description: "melbourne, Australia • 22 Jan at 10:40am",
			active: true,
		},
		{
			avatar: (
				<DesktopOutlined
					style={{
						fontSize: 20,
					}}
				/>
			),
			title: "2018 Macbook Pro 15-inch",
			description: "melbourne, Australia • 22 Jan at 4:40pm",
		},
	];
	const settingsTabs = [
		{
			label: "My Profile",
			key: "my-profile",
			children: (
				<div>
					<div style={{ margin: "16px 0px" }}>
						<h2 style={{ margin: 0 }}>Personal info</h2>
						<div>Update your photo and presonal details here</div>
					</div>
					<Divider />
					<Form
						// form={formValidate}
						name="editProfile"
						colon={false}
						size="large"
						labelAlign="left"
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 12 }}
						style={
							{
								// maxWidth: "80%",
								// boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
								// borderRadius: "10px",
							}
						}
						initialValues={{
							remember: true,
						}}>
						<Form.Item style={{}} label="Name" rules={[{}]}>
							<div
								style={{
									width: "100%",
									display: "flex",
									gap: 16,
									flexWrap: "wrap",
								}}>
								<Form.Item
									name="firstname"
									style={{ flexGrow: 1, minWidth: "168px", margin: 0 }}>
									<Input />
								</Form.Item>
								<Form.Item
									name="lastname"
									style={{ flexGrow: 1, minWidth: "168px", margin: 0 }}>
									<Input />
								</Form.Item>
							</div>
						</Form.Item>
						<Form.Item
							style={{ marginBottom: 36 }}
							label="Email and Phone"
							rules={[{}]}>
							<div
								style={{
									width: "100%",
									display: "flex",
									gap: 16,
									flexWrap: "wrap",
								}}>
								<Form.Item
									name="email"
									style={{ flexGrow: 1, minWidth: "168px", margin: 0 }}>
									<Input />
								</Form.Item>
								<Form.Item
									name="phone"
									style={{ flexGrow: 1, minWidth: "168px", margin: 0 }}>
									<Input />
								</Form.Item>
							</div>
						</Form.Item>
						<Form.Item
							style={{}}
							label="Company Name"
							name="companyname"
							rules={[]}>
							<Input />
						</Form.Item>
						<Form.Item style={{}} label="Domain Name" name="domain" rules={[]}>
							<Input
								suffix={
									<Tooltip title="Extra information">
										<QuestionCircleOutlined
											style={{ color: "rgba(0,0,0,.45)" }}
										/>
									</Tooltip>
								}
							/>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: 36 }}
							label={
								<div>
									<div>Your Photo</div>
									<div
										style={{
											fontSize: "0.75rem",
										}}>
										This will be displayed on your profile
									</div>
								</div>
							}
							name="photo"
							rules={[]}>
							<div
								style={{
									width: "100%",
									display: "grid",
									gridTemplateColumns: "80px minmax(0, 1fr)",
									gap: 16,
								}}>
								<Avatar size={80} />
								<div style={{ minheight: 168 }}>
									<Dragger
										style={{}}
										name="photo"
										beforeUpload={() => false}
										onChange={({ file }) => console.log(file)}
										maxCount={1}
										showUploadList={{
											showRemoveIcon: false,
										}}
										itemRender={(originNode) => (
											<div
												style={{
													width: "100%",
													overflow: "hidden",
													textOverflow: "ellipsis",
												}}>
												{originNode}
											</div>
										)}>
										<div>
											<p>
												<CloudUploadOutlined
													style={{
														fontSize: 32,
													}}
												/>
											</p>
											<p>Click to upload or drag and drop</p>
											<p>SVG, PNG, JPG or GIF (max: 800x400px)</p>
										</div>
									</Dragger>
								</div>
							</div>
						</Form.Item>

						<Form.Item style={{}} label="Country" name="country" rules={[]}>
							<Select items={[]} />
						</Form.Item>
						<Form.Item style={{}} label="Timezone" name="timezone" rules={[]}>
							<Select items={[]} />
						</Form.Item>
						<Form.Item wrapperCol={{}}>
							<div
								style={{
									display: "flex",
									width: "90%",
									justifyContent: "end",
									gap: 8,
								}}>
								<Button
									onClick={(e) => {
										e.preventDefault();
									}}>
									Cancel
								</Button>
								<Button
									type="primary"
									htmlType="submit"
									onClick={(e) => {
										e.preventDefault();
									}}>
									Save
								</Button>
							</div>
						</Form.Item>
					</Form>
				</div>
			),
		},
		{
			label: "Password",
			key: "password",
			children: (
				<div>
					<div style={{ margin: "16px 0px" }}>
						<h2 style={{ margin: 0 }}>Password</h2>
						<div>
							Please enter your current password to change your password
						</div>
					</div>
					<Divider />
					<Form
						// form={formValidate}
						name="editPassword"
						colon={false}
						size="large"
						// layout="vertical"
						labelAlign="left"
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 12 }}
						style={{}}
						initialValues={{
							remember: true,
						}}>
						<Form.Item
							// style={{ marginBottom: 36 }}
							label="Current Password"
							name="currentpassword"
							rules={[]}>
							<Input.Password />
						</Form.Item>
						{/* <Divider /> */}
						<Form.Item
							// validateTrigger="onBlur"
							label="New Password"
							name="newpassword"
							style={{}}
							rules={[
								{
									required: true,
									message: "Please input your Password!",
								},
								// {
								// 	pattern:
								// 		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
								// 	message:
								// 		"Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
								// },
							]}>
							<Input.Password
								// onFocus={() => {
								// 	formValidate.setFields([
								// 		{
								// 			name: "password",
								// 			errors: [],
								// 		},
								// 	]);
								// }}
								addonAfter={
									<Tooltip title="Password must contain at least 8 characters including a lowercase letter, an uppercase letter,a number and a special character">
										<InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
									</Tooltip>
								}
								onChange={(e) => {
									// setValues((val) => {
									// 	return { ...val, password: e.target.value };
									// });
								}}
							/>
						</Form.Item>
						{/* <Divider /> */}
						<Form.Item
							label="Confirm new Password"
							name="confirmpassword"
							style={{}}
							rules={[
								{
									required: true,
									message: "Please Confirm your Password!",
								},
							]}>
							<Input.Password
								onChange={(e) => {
									// setConfirmPass(e.target.value);
								}}
							/>
						</Form.Item>
						<Form.Item wrapperCol={{}}>
							<div
								style={{
									display: "flex",
									width: "90%",
									justifyContent: "end",
									gap: 8,
								}}>
								<Button
									onClick={(e) => {
										e.preventDefault();
									}}>
									Cancel
								</Button>
								<Button
									type="primary"
									htmlType="submit"
									onClick={(e) => {
										e.preventDefault();
									}}>
									Save
								</Button>
							</div>
						</Form.Item>
					</Form>
					<div style={{ margin: "16px 0px" }}>
						<h2 style={{ margin: 0 }}>Where you're logged in</h2>
						<div>
							We'll alert you via _ if there is any unusual activity on your
							account.
						</div>
					</div>
					<Divider
						style={{
							margin: "12px 0px 0px 0px",
						}}
					/>
					<List
						style={{}}
						itemLayout="horizontal"
						dataSource={loginData}
						renderItem={(item, index) => (
							<List.Item>
								<List.Item.Meta
									avatar={item.avatar}
									title={
										item.active ? (
											<div>
												{item.title}{" "}
												<Tag icon={<Badge status="success" />} color="success">
													{" "}
													Active Now
												</Tag>
											</div>
										) : (
											item.title
										)
									}
									description={item.description}
								/>
							</List.Item>
						)}
					/>
					<Divider
						style={{
							margin: "0px 0px 36px 0px",
						}}
					/>
				</div>
			),
		},
		{
			label: "Billing",
			key: "billing",
			children: <div>Issue</div>,
		},
		{
			label: "Notifications",
			key: "notifications",
			children: <div>Issue</div>,
		},
	];
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				height: "calc(100vh - 66px)",
				alignItems: "center",
				overflow: "auto",
			}}>
			<div
				style={{
					width: "calc(100vw - 274px)",
				}}>
				<div
					style={{
						height: 66,
						width: "100%",
						padding: "16px 32px",
						display: "flex",
						alignItems: "center",
					}}>
					<Breadcrumb
						items={[
							{
								title: <Link to="/dashboard">Dashboard</Link>,
							},
							{
								title: <Link to="/dashboard/settings">Settings</Link>,
							},
							{
								title: (
									<Link to={`/dashboard/settings${location.hash}`}>
										{settingsTabs.find(
											(tab) => tab.key == location.hash.substring(1)
										)?.label ?? ""}
									</Link>
								),
							},
						]}
					/>
				</div>
				<Space
					direction="vertical"
					size="large"
					style={{ width: "100%", minHeight: "calc(100vh - 132px)" }}>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexWrap: "wrap",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "0px 32px",
						}}>
						<h1 style={{ margin: 0 }}>Settings</h1>
						<div>
							<Input
								size="large"
								prefix={<SearchOutlined />}
								placeholder="Enter Keyword to search projects"
							/>
						</div>
					</div>
					<div
						style={{
							padding: "0px 32px",
						}}>
						<Tabs
							size="large"
							activeKey={location.hash.substring(1)}
							tabPosition="top"
							animated={true}
							tabBarStyle={{}}
							style={{ minHeight: 240, padding: "0px" }}
							items={settingsTabs}
							onChange={(key) => {
								navigate(`/dashboard/settings#${key}`, { replace: true });
							}}
						/>
					</div>
				</Space>
			</div>
		</div>
	);
}

export default Settings;
