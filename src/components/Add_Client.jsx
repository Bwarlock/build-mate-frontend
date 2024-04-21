import { Button, ConfigProvider, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../env/axios";
import { useNavigate } from "react-router-dom";

const Add_Client = () => {
	//Add Client Page Component
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		phoneNumber: "",
		companyName: "",
		project: [],
	});
	const [projectData, setProjectData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axiosInstance
			.get("/owner/get-projects?page=1&limit=10")
			.then((res) => {
				console.log(res.data);

				setProjectData(
					res.data.projects.map((val) => {
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
	}, []);

	const handleSubmit = () => {
		//Using Intercepted AxiosInstance
		axiosInstance
			.post("/owner/create-client", values)
			.then((res) => {
				console.log(res.data);
				navigate("/dashboard/clients");
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
				name="addClient"
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
				autoComplete="off">
				<Form.Item
					label="Name"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input Client Name!",
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
					name="companyName"
					rules={
						[
							// {
							// 	required: true,
							// 	message: "Please input your Company!",
							// },
						]
					}>
					<Input
						onChange={(e) => {
							setValues((val) => {
								return { ...val, companyName: e.target.value };
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
							message: "Please input Client Email!",
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
							message: "Please input Client password!",
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
							message: "Please input Client PhoneNumber!",
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
					label="Project"
					name="project"
					rules={
						[
							// {
							// 	message: "Please input your Staff!",
							// },
						]
					}>
					<Select
						mode="multiple"
						onChange={(e) => {
							setValues((val) => {
								return { ...val, project: [...e] };
							});
						}}
						style={{
							width: 120,
						}}
						options={projectData}
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
export default Add_Client;
