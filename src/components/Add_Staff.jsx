import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { BASE_URL } from "../env/api";
import { axiosInstance } from "../env/axios";

const Add_Staff = () => {
	//Add Staff Page Component
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		phoneNumber: "",
	});

	const handleSubmit = () => {
		//Using Intercepted AxiosInstance For Everything other than Login Register
		axiosInstance
			.post("/owner/create-staff", values)
			.then((res) => {
				console.log(res.data);
			})
			.catch((e) => {
				console.log(e);
				message.error(e);
			});
	};
	return (
		<Form
			name="addStaff"
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
				label="Name"
				name="name"
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
				label="PhoneNumber"
				name="phoneNumber"
				rules={[
					{
						required: true,
						message: "Please input your PhoneNumber!",
					},
				]}>
				<Input
					onChange={(e) => {
						setValues((val) => {
							return { ...val, phoneNumber: e.target.value };
						});
					}}
				/>
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
export default Add_Staff;
