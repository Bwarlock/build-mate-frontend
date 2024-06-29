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
	DatePicker,
	Divider,
	Form,
	Image,
	Input,
	List,
	Select,
	Space,
	Tabs,
	Tag,
	Tooltip,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
	Link,
	useLocation,
	useNavigate,
	useOutletContext,
} from "react-router-dom";
import { useGetData } from "../api/hooks";
import { getBase64 } from "../util/functions";

function Settings() {
	const { setDrawerOpener, setShowAddButton } = useOutletContext();
	const location = useLocation();
	const navigate = useNavigate();
	const [formMyProfile] = Form.useForm();
	const [formPassword] = Form.useForm();
	const [editingMyProfile, setEditingMyProfile] = useState(false);
	const [editingPassword, setEditingPassword] = useState(false);
	const { profileData: profileReduxData, loading: profileLoading } =
		useSelector((state) => state.profile);

	const profileData = useMemo(() => {
		return {
			firstname: profileReduxData?.name?.split(/ (.+)/)[0] ?? "",
			lastname: profileReduxData?.name?.split(/ (.+)/)[1] ?? "",
			email: profileReduxData?.email ?? "",
			phoneNumber: profileReduxData?.phoneNumber ?? "",
			companyName: profileReduxData?.companyName ?? "",
			country: "",
			timezone: "",
			photo: [],
		};
		return profileReduxData?.name?.split(/ (.+)/);
	}, [profileReduxData]);

	const { getProfile } = useGetData();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
	};
	const handlePassword = (yo) => {
		console.log(yo ? yo : "");
		formPassword
			.validateFields()
			.then(() => {
				console.log("api not added");
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};
	const handleMyProfile = (yo) => {
		console.log(yo ? yo : "");
		formMyProfile
			.validateFields()
			.then(() => {
				// Check the Image file type coz accept isnt enough
				console.log("api not added");
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};
	useEffect(() => {
		setShowAddButton(false);
		if (Object.keys(profileData).length == 0) {
			getProfile();
		}
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
						form={formMyProfile}
						name="editProfile"
						onFinish={handleMyProfile}
						colon={false}
						size="large"
						labelAlign="left"
						labelWrap={true}
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 12 }}
						style={
							{
								// maxWidth: "80%",
								// boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
								// borderRadius: "10px",
							}
						}
						initialValues={profileData}
						onValuesChange={() => {
							setEditingMyProfile(true);
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
									style={{ flexGrow: 1, minWidth: "168px", margin: 0 }}
									rules={[
										{
											required: true,
											message: "Please input The First Name!",
										},
									]}>
									<Input placeholder="First Name" />
								</Form.Item>
								<Form.Item
									name="lastname"
									style={{ flexGrow: 1, minWidth: "168px", margin: 0 }}>
									<Input placeholder="Last Name" />
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
									style={{ flexGrow: 1, minWidth: "168px", margin: 0 }}
									rules={[
										{
											required: true,
											message: "Please input The Email!",
										},
										{
											type: "email",
											message: "The input is not a valid email!",
										},
									]}>
									<Input />
								</Form.Item>
								<Form.Item
									name="phoneNumber"
									style={{ flexGrow: 1, minWidth: "168px", margin: 0 }}
									rules={[
										{
											required: true,
											message: "Please input The Phone Number!",
										},
										// {
										// 	pattern: /^(?:\+\d{1,3})?\d{10}$/,
										// 	message: "The input is not a valid phoneNumber",
										// },
									]}>
									<Input />
								</Form.Item>
							</div>
						</Form.Item>
						<Form.Item
							style={{}}
							label="Company Name"
							name="companyName"
							rules={[]}>
							<Input />
						</Form.Item>
						<Form.Item style={{}} label="Date of Birth" name="dob" rules={[]}>
							<DatePicker
								showNow={false}
								style={{
									width: "100%",
								}}
							/>
						</Form.Item>
						{/* <Form.Item style={{}} label="Domain Name" name="domain" rules={[]}>
							<Input
								suffix={
									<Tooltip title="Extra information">
										<QuestionCircleOutlined
											style={{ color: "rgba(0,0,0,.45)" }}
										/>
									</Tooltip>
								}
							/>
						</Form.Item> */}

						<Form.Item
							style={{}}
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
							rules={[]}>
							<div
								style={{
									width: "100%",
									gap: 16,
								}}>
								{/* <Avatar size={80} /> */}

								<Form.Item
									style={{
										margin: 0,
									}}
									valuePropName="fileList"
									getValueFromEvent={(e) => {
										console.log(e);
										return Array.isArray(e) ? e : e?.fileList;
									}}
									name="photo">
									<Dragger
										accept={".png,.jpg,.jpeg,.svg,.gif"}
										onPreview={handlePreview}
										style={{
											float: "right",
											width: "calc(100% - 118px)",
										}}
										listType="picture-circle"
										beforeUpload={() => false}
										// onChange={({ file }) => console.log(file)}
										maxCount={1}
										showUploadList={{
											showRemoveIcon: false,
											showDownloadIcon: true,
										}}
										// itemRender={(originNode) => (
										// 	<div
										// 		style={{
										// 			width: "100%",
										// 			overflow: "hidden",
										// 			textOverflow: "ellipsis",
										// 		}}>
										// 		{originNode}
										// 	</div>
										// )}
									>
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
								</Form.Item>
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
									onClick={() => {
										setEditingMyProfile(false);
									}}
									htmlType="reset">
									Cancel
								</Button>
								<Button
									disabled={!editingMyProfile}
									type="primary"
									htmlType="submit">
									Save
								</Button>
							</div>
						</Form.Item>
					</Form>

					{previewImage && (
						<Image
							wrapperStyle={{
								display: "none",
							}}
							preview={{
								visible: previewOpen,
								onVisibleChange: (visible) => setPreviewOpen(visible),
								afterOpenChange: (visible) => !visible && setPreviewImage(""),
							}}
							src={previewImage}
						/>
					)}
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
						form={formPassword}
						name="editPassword"
						onFinish={handlePassword}
						colon={false}
						size="large"
						labelAlign="left"
						labelWrap={true}
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 12 }}
						style={{}}
						initialValues={{}}
						onValuesChange={() => {
							setEditingPassword(true);
						}}>
						<Form.Item
							label="Current Password"
							name="currentPassword"
							rules={[
								{
									required: true,
									message: "Please input your old Password!",
								},
							]}>
							<Input.Password />
						</Form.Item>
						{/* <Divider /> */}
						<Form.Item
							// validateTrigger="onBlur"
							label="New Password"
							name="newPassword"
							style={{}}
							rules={[
								{
									required: true,
									message: "Please input your new Password!",
								},
								{
									pattern:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
									message:
										"Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("currentPassword") !== value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error("The new password cannot be the old password!")
										);
									},
								}),
							]}
							dependencies={["currentPassword"]}>
							<Input.Password
								// onFocus={() => {
								// 	formPassword.setFields([
								// 		{
								// 			name: "newPassword",
								// 			errors: [],
								// 		},
								// 	]);
								// }}
								addonAfter={
									<Tooltip title="Password must contain at least 8 characters including a lowercase letter, an uppercase letter,a number and a special character">
										<InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
									</Tooltip>
								}
							/>
						</Form.Item>
						<Form.Item
							label="Confirm new Password"
							name="confirmPassword"
							style={{}}
							rules={[
								{
									required: true,
									message: "Please Confirm your new Password!",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("newPassword") === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error("The password that you entered do not match!")
										);
									},
								}),
							]}
							dependencies={["newPassword"]}>
							<Input.Password />
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
									onClick={() => {
										setEditingPassword(false);
									}}
									htmlType="reset">
									Cancel
								</Button>
								<Button
									disabled={!editingPassword}
									type="primary"
									htmlType="submit">
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
