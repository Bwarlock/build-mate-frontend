import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../env/api";
import { useAuth } from "../auth/AuthProvider";
import { jwtDecode } from "jwt-decode";
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
		<Form
			name="login"
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			style={{
				maxWidth: 600,
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

			<Form.Item
				name="remember"
				valuePropName="checked"
				wrapperCol={{
					offset: 8,
					span: 16,
				}}>
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}>
				<Button type="primary" htmlType="submit" onClick={handleSubmit}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};
export default Login;
