import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { useCheckLogin, useLogin, useGetData } from "../api/hooks";
import { Link } from "react-router-dom";

const Login = () => {
	//Login Page Component
	const [values, setValues] = useState({
		email: "",
		password: "",
		domainName: "", //Getting Domain Name For Subdomains
	});

	const login = useLogin();
	const checkLogin = useCheckLogin();
	const { checkDomain } = useGetData();
	const [formValidate] = Form.useForm();

	const handleSubmit = () => {
		formValidate
			.validateFields()
			.then(() => {
				login(values);
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};
	useEffect(() => {
		checkLogin("/dashboard/tasks", null);
		checkDomain();
	}, []);
	return (
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
				<div className="centered">
					<Form
						form={formValidate}
						name="login"
						labelCol={{}}
						wrapperCol={{}}
						style={{
							maxWidth: 600,
							backgroundColor: "white",
							padding: "2rem 2rem 0rem",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
							borderRadius: "10px",
						}}
						initialValues={{
							remember: true,
						}}>
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
									message: "Please input your password!",
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

						<Form.Item name="remember" valuePropName="checked" wrapperCol={{}}>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						<Form.Item wrapperCol={{}}>
							<Button
								style={{ width: "100%" }}
								type="primary"
								htmlType="submit"
								onClick={handleSubmit}>
								Login
							</Button>
						</Form.Item>
					</Form>

					<Link to="/register">
						<Button>Register ?</Button>
					</Link>
				</div>
			</ConfigProvider>
		</div>
	);
};
export default Login;
