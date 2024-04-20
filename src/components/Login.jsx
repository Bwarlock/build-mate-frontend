import { Button, Checkbox, ConfigProvider, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../env/api";
import { useAuth } from "../auth/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import CustomTypingText from "./CustomTypingText";
import { TypeAnimation } from "react-type-animation";

// const onFinish = (values) => {
// 	console.log("Success:", values);
// };
// const onFinishFailed = (errorInfo) => {
// 	console.log("Failed:", errorInfo);
// };
const Login = () => {
	//Login Page Component
	const [values, setValues] = useState({
		email: "",
		password: "",
		domainName: "",
	});
	const { login } = useAuth();
	axios.defaults.withCredentials = true;
	const handleSubmit = () => {
		//Getting Domain Name For Subdomains
		console.log(window.location.hostname);
		let domainName = window.location.hostname;

		axios
			.post(BASE_URL + "/auth/login", {
				...values,
				domainName,
			})
			.then((res) => {
				console.log(res.data);
				console.log(jwtDecode(res.data.token));
				login(res.data.token, res.data.user);
			})
			.catch((e) => {
				console.log(e);
				message.error(e);
			});
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
				<div className="centered">
					<Form
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
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</ConfigProvider>
		</div>
	);
};
export default Login;
