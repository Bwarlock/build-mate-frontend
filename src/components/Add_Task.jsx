import {
	Button,
	Form,
	Input,
	Select,
	message,
	DatePicker,
	ConfigProvider,
} from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../env/axios";
import { useNavigate } from "react-router-dom";

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
	const navigate = useNavigate();
	useEffect(() => {
		setValues((val) => {
			return { ...val, startDate: Date() };
		});
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
	}, []);

	const handleSubmit = () => {
		axiosInstance
			.post("/owner/create-task", values)
			.then((res) => {
				console.log(res.data);
				navigate("/dashboard/tasks");
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
				autoComplete="off">
				<Form.Item
					label="Name"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input Task name!",
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
							message: "Please input Task Description!",
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
							message: "Please input Task Staff!",
						},
					]}>
					<Select
						mode="multiple"
						onChange={(e) => {
							setValues((val) => {
								return { ...val, assignedTo: [...e] };
							});
						}}
						style={{
							width: 120,
						}}
						options={staffData}
					/>
				</Form.Item>
				<Form.Item label="Project" name="project" rules={[]}>
					<Select
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

				<Form.Item label="Due Date" name="dueDate" rules={[]}>
					<DatePicker
						onChange={(_, e) => {
							console.log(e);
							setValues((val) => {
								return { ...val, dueDate: e };
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
}

export default Add_Task;
