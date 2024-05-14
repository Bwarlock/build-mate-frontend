import { useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	message,
	Steps,
	theme,
	ConfigProvider,
} from "antd";
import { TypeAnimation } from "react-type-animation";
import { useRegister } from "../api/hooks";

const Register = () => {


	useEffect(() => {
		// Check if the url is cloud.build-mate.in, else show 404 page
		const domain = window.location.hostname;
		console.log(domain);
		if (domain == "localhost" || domain == "cloud.build-mate.in") {
			// Do nothing
		}
		else {
			console.log("404");
			set404(true);
		}

	},[]);

	// is404 is used to show 404 page if the domain is not cloud.build-mate.in
	const [is404, set404] = useState(false);
	const { token } = theme.useToken();
	const [current, setCurrent] = useState(0);
	const [values, setValues] = useState({
		name: "",
		email: "",
		phoneNumber: 0,
		password: "",
		companyName: "",
		domainName: "",
	});
	
	const [confirmPass, setConfirmPass] = useState("");
	// Domain Suggestions
	const [domainSuggestions, setDomainSuggestions] = useState([]);
	const generateDomainSuggestions = (companyName) => {
	const splitCompanyName = companyName.split(' ');
    const trimmedCompanyName = companyName.trim(' ').toLowerCase().replace(/\s+/g, '-');
    const domainSuggestions = [
		trimmedCompanyName,
		trimmedCompanyName.replace(/\s+/g, ''),
		trimmedCompanyName.slice(0, 2),
		// Get first element of each word in splitCompanyName
		splitCompanyName.map((word) => word[0]).join('').toLowerCase(),
    ];
	// Remove duplicates
	const uniqueDomainSuggestions = [...new Set(domainSuggestions)];
    setDomainSuggestions(uniqueDomainSuggestions);
  };
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
									generateDomainSuggestions(e.target.value);
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
					name="registerSecond"
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
						name="domain"
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
								setValues((val) => {
									return { ...val, domainName: e.target.value };
								});
							}}
						/> 
						<span>
							.build-mate.in
						</span>
					</Form.Item>
					{/* change color to green on selection */}
					<Form.Item>
						{domainSuggestions.map((suggestion) => (
							<Button
								key={suggestion}
								type="dashed"
								onClick={() => {
									setValues((val) => {
										return { ...val, domainName: suggestion };
									});
								}}>
								{suggestion}
							</Button>
						))}
					</Form.Item>
				</Form>
			),
		},
		{
			title: "Last",
			content: (
				<Form
					name="registerThird"
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

	const register = useRegister();
	const handleSubmit = () => {
		if (confirmPass == values.password) {
			register(values);
		} else {
			message.error("Wrong Confirmation Password");
		}
	};

	return (
		is404 ? <h1>404</h1> :
		<div className="full">
			<nav className="menuBar">
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
							marginTop: 24,
						}}>
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
				</div>
			</ConfigProvider>
		</div>
	);
};
export default Register;
