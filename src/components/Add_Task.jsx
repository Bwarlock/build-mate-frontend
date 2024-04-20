import { Button, Form, Input, Select, message, DatePicker } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../env/api";
import { useAuth } from "../auth/AuthProvider";
import Project from "./Project";
import { axiosInstance } from "../env/axios";

function Add_Task() {
	//Add Task Page Component
	const [values, setValues] = useState({
		name: "",
		startDate: "",
		description: "",
		project: "",
		assignedTo: [],
		dueDate: "",
	});
	const [projectData, setProjectData] = useState([]);
	const [staffData, setStaffData] = useState([]);

	useEffect(() => {
		setValues((val) => {
			return { ...val, startDate: Date() };
		});
		axiosInstance
			.get("/owner/get-projects?page=1&limit=5")
			.then((res) => {
				console.log(res.data);

				setProjectData(
					res.data.projects.map((val) => {
						return {
							label: val.name,
							value: val.id,
						};
					})
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e);
			});
		axiosInstance
			.get("/owner/get-staff?page=1&limit=5")
			.then((res) => {
				console.log(res.data);
				setStaffData(
					res.data.staffData.map((val) => {
						return {
							label: val.name,
							value: val.id,
						};
					})
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e);
			});
	}, []);

	axios.defaults.withCredentials = true;
	const handleSubmit = () => {
		axios
			.post("/owner/create-task", values)
			.then((res) => console.log(res.data))
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<Form
			name="addproject"
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
						message: "Please input task name!",
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
				label="AssignedTo"
				name="assignedTo"
				rules={[
					{
						required: true,
						message: "Please input your Staff!",
					},
				]}>
				<Select
					mode="multiple"
					// defaultValue="lucy"
					onChange={(e) => {
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
				label="Project"
				name="project"
				rules={[
					{
						message: "Please input your Staff!",
					},
				]}>
				<Select
					// defaultValue="lucy"
					onChange={(e) => {
						setValues((val) => {
							return { ...val, project: e };
						});
					}}
					style={{
						width: 120,
					}}
					options={projectData}
				/>
			</Form.Item>

			<Form.Item
				label="Project"
				name="project"
				rules={[
					{
						message: "Please input your Staff!",
					},
				]}>
				<DatePicker
					onChange={(e) => {
						setValues((val) => {
							return { ...val, dueDate: e.target.value };
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
	);
}

export default Add_Task;
