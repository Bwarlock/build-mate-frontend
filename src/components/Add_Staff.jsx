import { Button, ConfigProvider, Form, Input, message } from "antd";
import { useState } from "react";
import { axiosInstance } from "../env/axios";
import { useNavigate } from "react-router-dom";

const Add_Staff = () => {
	//Add Staff Page Component
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		phoneNumber: "",
	});
	const navigate = useNavigate();
	const handleSubmit = () => {
		//Using Intercepted AxiosInstance
		axiosInstance
			.post("/owner/create-staff", values)
			.then((res) => {
				console.log(res.data);
				navigate("/dashboard/staff");
			})
			.catch((e) => {
				console.log(e);
				message.error(e);
			});
	};
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#283149",
				},
			}}>
			<Form
				name="addStaff"
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
				autoComplete="off">
				<Form.Item
					label="Name"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input Staff Name!",
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
							message: "Please input Staff Email!",
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
							message: "Please input Staff password!",
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
							message: "Please input Staff PhoneNumber!",
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

				<Form.Item wrapperCol={{}}>
					<Button type="primary" htmlType="submit" onClick={handleSubmit}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</ConfigProvider>
	);
};
export default Add_Staff;
