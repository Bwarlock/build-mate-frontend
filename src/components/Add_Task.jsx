import { Button, Form, Input, Select, DatePicker, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { useAddData, useGetData } from "../api/hooks";
import { useSelector } from "react-redux";

function Add_Task() {
	//Add Task Page Component
	const [values, setValues] = useState({
		name: "",
		startDate: "",
		description: "",
		assignedTo: [],
		dueDate: "",
	});

	const { selectData: projectSelectData } = useSelector(
		(state) => state.project
	);
	const { selectData: staffSelectData } = useSelector((state) => state.staff);
	const { addTask } = useAddData();
	const { selectProjects, selectStaff } = useGetData();
	const [formValidate] = Form.useForm();

	useEffect(() => {
		setValues((val) => {
			return { ...val, startDate: Date() };
		});
		if (!projectSelectData.length) {
			selectProjects({ page: 1, limit: 10 });
		}
		if (!staffSelectData.length) {
			selectStaff({ page: 1, limit: 10 });
		}
	}, []);

	const handleSubmit = () => {
		formValidate
			.validateFields()
			.then(() => {
				addTask(values);
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
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
				form={formValidate}
				name="addproject"
				style={{
					// maxWidth: 600,
					backgroundColor: "white",
					padding: "1rem",
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
				<Form.Item label="AssignedTo" name="assignedTo" rules={[]}>
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
						options={staffSelectData}
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
						options={projectSelectData}
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
