import { useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	message,
	Steps,
	theme,
	ConfigProvider,
	Tooltip,
} from "antd";
import { TypeAnimation } from "react-type-animation";
import { useRegister } from "../api/hooks";
import { Link } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";

const Register = () => {
	useEffect(() => {
		// Check if the url is cloud.build-mate.in, else show 404 page
		const domain = window.location.hostname;
		console.log(domain);
		if (domain == "localhost" || domain == "cloud.build-mate.in") {
			// Do nothing
		} else {
			console.log("404");
			set404(true);
		}
	}, []);

	// is404 is used to show 404 page if the domain is not cloud.build-mate.in
	const [is404, set404] = useState(false);
	const { token } = theme.useToken();
	const [current, setCurrent] = useState(0);
	const [values, setValues] = useState({
		name: "",
		email: "",
		phoneNumber: "0",
		password: "",
		companyName: "",
		domainName: "",
	});
	const [formValidate] = Form.useForm();

	const [confirmPass, setConfirmPass] = useState("");
	// Domain Suggestions
	const [domainSuggestions, setDomainSuggestions] = useState([]);
	const generateDomainSuggestions = (companyName) => {
		const splitCompanyName = companyName.split(" ");
		const trimmedCompanyName = companyName
			.trim(" ")
			.toLowerCase()
			.replace(/\s+/g, "-");
		const domainSuggestions = [
			trimmedCompanyName,
			trimmedCompanyName.replace(/\s+/g, ""),
			trimmedCompanyName.slice(0, 2),
			// Get first element of each word in splitCompanyName
			splitCompanyName
				.map((word) => word[0])
				.join("")
				.toLowerCase(),
		];
		// Remove duplicates
		const uniqueDomainSuggestions = [...new Set(domainSuggestions)];
		setDomainSuggestions(uniqueDomainSuggestions);
	};
	const steps = [
		{
			title: "Info",
			content: (
				<Form
					name="registerFirst"
					form={formValidate}
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
					}}>
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
									generateDomainSuggestions(e.target.value);
									return { ...val, companyName: e.target.value };
								});
							}}
						/>
					</Form.Item>
					<Form.Item
						validateTrigger="onBlur"
						label="Phone Number"
						name="phoneNumber"
						rules={[
							{
								required: true,
								message: "Please input your Phone Number!",
							},
							{
								pattern: /^(?:\+\d{1,3})?\d{10}$/,
								message: "The input is not a valid phoneNumber",
							},
						]}>
						<Input
							onFocus={() => {
								formValidate.setFields([
									{
										name: "phoneNumber",
										errors: [],
									},
								]);
							}}
							onChange={(e) => {
								setValues((val) => {
									return { ...val, phoneNumber: e.target.value };
								});
							}}
						/>
					</Form.Item>
				</Form>
			),
		},
		{
			title: "Domain",
			content: (
				<Form
					name="registerSecond"
					form={formValidate}
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
						label="Domain Name"
						name="domainName"
						valuePropName="checked"
						rules={[
							{
								required: true,
								message: "Please input your Domain Name!",
							},
						]}>
						<Input
							value={values.domainName}
							onChange={(e) => {
								formValidate.setFieldsValue({ domainName: e.target.value });
								formValidate.validateFields(["domainName"]);
								setValues((val) => {
									return { ...val, domainName: e.target.value };
								});
							}}
						/>
					</Form.Item>
					<span>.build-mate.in</span>
					{/* change color to green on selection */}

					{domainSuggestions.map((suggestion) => (
						<Button
							key={suggestion}
							type="dashed"
							onClick={() => {
								formValidate.setFieldsValue({ domainName: suggestion });
								formValidate.validateFields(["domainName"]);
								setValues((val) => {
									return { ...val, domainName: suggestion };
								});
							}}>
							{suggestion}
						</Button>
					))}
				</Form>
			),
		},
		{
			title: "Credentials",
			content: (
				<Form
					name="registerThird"
					form={formValidate}
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
						validateTrigger="onBlur"
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your Email!",
							},
							{
								type: "email",
								message: "The input is not a valid email!",
							},
						]}>
						<Input
							onFocus={() => {
								formValidate.setFields([
									{
										name: "email",
										errors: [],
									},
								]);
							}}
							onChange={(e) => {
								setValues((val) => {
									return { ...val, email: e.target.value };
								});
							}}
						/>
					</Form.Item>

					<Form.Item
						validateTrigger="onBlur"
						label="Password"
						name="password"
						style={{
							maxWidth: 515,
						}}
						rules={[
							{
								required: true,
								message: "Please input your Password!",
							},
							{
								pattern:
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
								message:
									"Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
							},
						]}>
						<Input.Password
							onFocus={() => {
								formValidate.setFields([
									{
										name: "password",
										errors: [],
									},
								]);
							}}
							// showCount={true}
							addonAfter={
								<Tooltip title="Password must contain at least 8 characters including a lowercase letter, an uppercase letter,a number and a special character">
									<InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
								</Tooltip>
							}
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
		formValidate
			.validateFields()
			.then(() => {
				setCurrent(current + 1);
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
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

	const register = useRegister();
	const handleSubmit = () => {
		formValidate
			.validateFields()
			.then(() => {
				if (confirmPass == values.password) {
					register(values);
				} else {
					message.error("Wrong Confirmation Password");
				}
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};

	return is404 ? (
		<h1>404</h1>
	) : (
		<div className="full">
			<nav className="textLogo">
				<TypeAnimation
					sequence={[
						"Build",
						1000, // wait 1s before writing "-" infront of Build
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
						colorPrimary: "#283149",
					},
				}}>
				<div className="">
					<Steps current={current} items={items} />
					<div style={contentStyle}>{steps[current].content}</div>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: 24,
						}}>
						<div>
							{current < steps.length - 1 && (
								<Button type="primary" onClick={() => next()}>
									Next
								</Button>
							)}
							{current === steps.length - 1 && (
								<Button type="primary" onClick={handleSubmit}>
									Register
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
						<Link
							style={{
								margin: "0 8px",
							}}
							to="/login">
							<Button>Login ?</Button>
						</Link>
					</div>
				</div>
			</ConfigProvider>
		</div>
	);
};
export default Register;
