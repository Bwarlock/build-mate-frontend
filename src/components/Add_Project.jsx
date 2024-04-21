import { Button, ConfigProvider, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { axiosInstance } from "../env/axios";
import { useNavigate } from "react-router-dom";

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
	const [clientData, setClientData] = useState([]);
	const [taskData, setTaskData] = useState([]);
	const navigate = useNavigate();

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

		axiosInstance
			.get("/owner/get-clients?page=1&limit=10")
			.then((res) => {
				console.log(res.data);
				setClientData(
					res.data.clientData.map((val) => {
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
			.get("/owner/get-tasks?page=1&limit=10")
			.then((res) => {
				console.log(res.data);

				setTaskData(
					res.data.tasks.map((val) => {
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
			.post("/owner/create-project", values)
			.then((res) => {
				console.log(res.data);
				navigate("/dashboard/project");
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
				name="addProject"
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
							message: "Please input Project name!",
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
							message: "Please input Project Description!",
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

				<Form.Item label="Staff" name="staff" rules={[]}>
					<Select
						mode="multiple"
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
							message: "Please input Project Clients!",
						},
					]}>
					<Select
						onChange={(e) => {
							console.log(e);
							setValues((val) => {
								return { ...val, clients: [e] };
							});
						}}
						style={{
							width: 120,
						}}
						options={clientData}
					/>
				</Form.Item>

				<Form.Item label="Tasks" name="tasks" rules={[]}>
					<Select
						onChange={(e) => {
							console.log(e);
							setValues((val) => {
								return { ...val, tasks: [...e] };
							});
						}}
						mode="multiple"
						style={{
							width: 120,
						}}
						options={taskData}
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
