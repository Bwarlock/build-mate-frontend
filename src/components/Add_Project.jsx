import { Button, ConfigProvider, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useAddData, useGetData } from "../api/hooks";
import { useSelector } from "react-redux";

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

	const { selectData: staffSelectData } = useSelector((state) => state.staff);
	const { selectData: clientSelectData } = useSelector((state) => state.client);
	const { selectData: taskSelectData } = useSelector((state) => state.task);
	const { user } = useSelector((state) => state.global);
	const { addProject } = useAddData();
	const { selectStaff, selectClients, selectTasks } = useGetData();

	useEffect(() => {
		//Set Non Visible Values To Request
		setValues((val) => {
			return { ...val, owner: user.name };
		});
		if (!staffSelectData.length) {
			selectStaff({ page: 1, limit: 10 });
		}

		if (!clientSelectData.length) {
			selectClients({ page: 1, limit: 10 });
		}

		if (!taskSelectData.length) {
			selectTasks({ page: 1, limit: 10 });
		}
	}, []);

	const handleSubmit = () => {
		addProject(values);
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
					label="Project Title"
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
						options={staffSelectData}
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
						options={clientSelectData}
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
						options={taskSelectData}
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
