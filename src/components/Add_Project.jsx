import { Button, ConfigProvider, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../env/api";
import { useAuth } from "../auth/AuthProvider";
import { axiosInstance } from "../env/axios";

function Add_Project() {
	//Add Project Page Component
	const [values, setValues] = useState({
		name: "",
		description: "",
		owner: "",
		staff: [],
		clients: [],
		tasks: [],
	});
	const { user } = useAuth();
	const [staffData, setStaffData] = useState([]);
	useEffect(() => {
		//Set Non Visible Values To Request
		setValues((val) => {
			return { ...val, owner: user.name };
		});
		axiosInstance
			.get("/owner/get-staff?page=1&limit=10")
			.then((res) => {
				console.log(res.data);
				setStaffData(
					res.data.staffData.map((val) => {
						return {
							label: val.name,
							value: val._id,
						};
					})
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e);
			});
		console.log(user);
	}, []);

	const handleSubmit = () => {
		axiosInstance
			.post("/owner/create-project", values)
			.then((res) => console.log(res.data))
			.catch((e) => {
				console.log(e);
			});
	};
	return (
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
			<Form
				name="addproject"
				// labelCol={{
				// 	span: 8,
				// }}
				// wrapperCol={{
				// 	span: 16,
				// }}
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
					label="Name"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input your name!",
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
					label="Description"
					name="description"
					rules={[
						{
							required: true,
							message: "Please input your Description!",
						},
					]}>
					<Input
						onChange={(e) => {
							setValues((val) => {
								return { ...val, description: e.target.value };
							});
						}}
					/>
				</Form.Item>

				<Form.Item
					label="Staff"
					name="staff"
					rules={
						[
							// {
							// 	message: "Please input your Staff!",
							// },
						]
					}>
					<Select
						mode="multiple"
						// defaultValue="lucy"
						onChange={(e) => {
							console.log(e);
							setValues((val) => {
								return { ...val, staff: [...e] };
							});
						}}
						style={{
							width: 120,
						}}
						options={staffData}
					/>
				</Form.Item>

				<Form.Item
					label="Clients"
					name="clients"
					rules={[
						{
							message: "Please input your Clients!",
						},
					]}>
					<Select
						// defaultValue="lucy"

						style={{
							width: 120,
						}}
						options={values.clients}
					/>
				</Form.Item>

				<Form.Item
					label="Tasks"
					name="tasks"
					rules={[
						{
							message: "Please input your Tasks!",
						},
					]}>
					<Select
						mode="multiple"
						// defaultValue="lucy"
						style={{
							width: 120,
						}}
						options={values.tasks}
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
}

export default Add_Project;