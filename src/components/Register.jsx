import { useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	message,
	Steps,
	theme,
	Select,
	ConfigProvider,
} from "antd";
import axios from "axios";
import { BASE_URL } from "../env/api";
import { useAuth } from "../auth/AuthProvider";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

const Register = () => {
	//Register Page Component
	const { token } = theme.useToken();
	const [current, setCurrent] = useState(0);
	const [values, setValues] = useState({
		name: "",
		email: "",
		phoneNumber: 0,
		password: "",
		companyName: "",
		domainName: "",
		// role: "staff",
	});
	const { user } = useAuth();
	useEffect(() => {
		console.log(user);
	}, []);
	const [confirmPass, setConfirmPass] = useState("");
	const steps = [
		{
			title: "First",
			content: (
				<Form
					name="registerFirst"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						minWidth: "60%",
					}}
					initialValues={{
						remember: true,
					}}
					autoComplete="off">
					<Form.Item
						label="Name"
						name="Name"
						rules={[
							{
								required: true,
								message: "Please input your Name!",
							},
						]}>
						<Input
							onChange={(e) => {
								setValues((val) => {
									return { ...val, name: e.target.value };
								});
							}}
						/>
					</Form.Item>

					<Form.Item
						label="Company Name"
						name="company"
						rules={[
							{
								required: true,
								message: "Please input your Comapny Name!",
							},
						]}>
						<Input
							onChange={(e) => {
								setValues((val) => {
									return { ...val, companyName: e.target.value };
								});
							}}
						/>
					</Form.Item>
					<Form.Item
						label="Phone Number"
						name="phoneNumber"
						rules={[
							{
								required: true,
								message: "Please input your Phone Number!",
							},
						]}>
						<Input
							onChange={(e) => {
								setValues((val) => {
									return { ...val, phoneNumber: parseInt(e.target.value) };
								});
							}}
						/>
					</Form.Item>
				</Form>
			),
		},
		{
			title: "Second",
			content: (
				<Form
					name="registerFirst"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						minWidth: "60%",
					}}
					initialValues={{
						remember: true,
					}}
					// onFinish={onFinish}
					// onFinishFailed={onFinishFailed}
					autoComplete="off">
					<Form.Item
						label="Domain Name"
						name="domain"
						rules={[
							{
								required: true,
								message: "Please input your Domain Name!",
							},
						]}>
						<Input
							onChange={(e) => {
								setValues((val) => {
									return { ...val, domainName: e.target.value };
								});
							}}
						/>
					</Form.Item>
				</Form>
			),
		},
		{
			title: "Last",
			content: (
				<Form
					name="registerFirst"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						minWidth: "60%",
					}}
					initialValues={{
						remember: true,
					}}
					// onFinish={onFinish}
					// onFinishFailed={onFinishFailed}
					autoComplete="off">
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your Email!",
							},
						]}>
						<Input
							onChange={(e) => {
								setValues((val) => {
									return { ...val, email: e.target.value };
								});
							}}
						/>
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your Password!",
							},
						]}>
						<Input.Password
							onChange={(e) => {
								setValues((val) => {
									return { ...val, password: e.target.value };
								});
							}}
						/>
					</Form.Item>
					<Form.Item
						label="Confirm Password"
						name="confirmpassword"
						rules={[
							{
								required: true,
								message: "Please Confirm your Password!",
							},
						]}>
						<Input.Password
							onChange={(e) => {
								setConfirmPass(e.target.value);
							}}
						/>
					</Form.Item>
					{/* {user["role"] == "owner" && (
						<Form.Item
							label="Role"
							name="role"
							rules={[
								{
									message: "Please Confirm your Password!",
								},
							]}>
							<Select
								onChange={(e) => {
									setValues((val) => {
										return { ...val, role: e.target.value };
									});
								}}
								// defaultValue="lucy"
								style={{
									width: 120,
								}}
								options={[
									{ value: "staff", label: "staff" },
									{ value: "owner", label: "owner" },
								]}
							/>
							
						</Form.Item>
					)} */}
				</Form>
			),
		},
	];
	const next = () => {
		setCurrent(current + 1);
	};
	const prev = () => {
		setCurrent(current - 1);
	};
	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}));
	const contentStyle = {
		lineHeight: "260px",
		textAlign: "center",
		color: token.colorTextTertiary,
		// backgroundColor: token.colorFillAlter,
		borderRadius: token.borderRadiusLG,
		border: `1px dashed ${token.colorBorder}`,
		marginTop: 16,

		minWidth: "60vw",
		minHeight: "200px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		padding: "2rem 2rem 0rem",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
	};
	const navigate = useNavigate();
	const { login } = useAuth();
	axios.defaults.withCredentials = true;
	const handleSubmit = () => {
		if (confirmPass == values.password) {
			axios
				.post(BASE_URL + "/auth/register", values, {
					// headers: {
					// 	"Access-Control-Allow-Credentials": "*",
					// },
				})
				.then((res) => {
					console.log(res.data);
					login(res.data.token, res.data.user);
					message.success("Processing complete!");
					setTimeout(() => {
						navigate("/dashboard/project");
					}, 1000);
				})
				.catch((err) => console.error(err));
		} else {
			message.error("Wrong Confirmation Password");
		}
	};

	return (
		<div className="full">
			<nav className="menuBar">
				{/* <div className="logo">
						<a href="">logo</a>
					</div> */}
				<TypeAnimation
					sequence={[
						"Build",
						1000, // wait 1s before replacing "Mice" with "Hamsters"
						"Build-",
						1000,
						"Build-Mate",
						1000,
						"Build-Mate",
						1000,
						"Build-",
						1000,
						"Build",
						1000,
						"",
						2000,
					]}
					wrapper="span"
					speed={50}
					style={{
						fontSize: "5em",
						// fontWeight: "Bold",
						fontFamily:
							"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
						display: "inline-block",
					}}
					repeat={Infinity}
				/>
			</nav>
			<ConfigProvider
				theme={{
					token: {
						// Seed Token
						colorPrimary: "#283149",
						// borderRadius: 2,

						// Alias Token
						// colorBgContainer: "#f6ffed",
					},
				}}>
				<div className="">
					<Steps current={current} items={items} />
					<div style={contentStyle}>{steps[current].content}</div>
					<div
						style={{
							marginTop: 24,
						}}>
						{current < steps.length - 1 && (
							<Button type="primary" onClick={() => next()}>
								Next
							</Button>
						)}
						{current === steps.length - 1 && (
							<Button type="primary" onClick={handleSubmit}>
								Done
							</Button>
						)}
						{current > 0 && (
							<Button
								style={{
									margin: "0 8px",
								}}
								onClick={() => prev()}>
								Previous
							</Button>
						)}
					</div>
				</div>
			</ConfigProvider>
		</div>
	);
};
export default Register;