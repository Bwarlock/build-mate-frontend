import {
	Button,
	Form,
	Input,
	Select,
	DatePicker,
	ConfigProvider,
	Divider,
	Pagination,
} from "antd";
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

	const {
		selectData: projectSelectData,
		selectParams: projectSelectParams,
		loading: projectLoading,
	} = useSelector((state) => state.project);
	const {
		selectData: staffSelectData,
		selectParams: staffSelectParams,
		loading: staffLoading,
	} = useSelector((state) => state.staff);

	const { addTask } = useAddData();
	const { selectProjects, selectStaff } = useGetData();
	const [formValidate] = Form.useForm();

	useEffect(() => {
		setValues((val) => {
			return { ...val, startDate: Date() };
		});
		if (!projectSelectData.length) {
			selectProjects();
		}
		if (!staffSelectData.length) {
			selectStaff();
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
				name="addTask"
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
				<Form.Item label="Due Date" name="dueDate" rules={[]}>
					<DatePicker
						showTime={true}
						showNow={true}
						onChange={(_, e) => {
							setValues((val) => {
								return { ...val, dueDate: e };
							});
						}}
					/>
				</Form.Item>
				<Form.Item label="AssignedTo" name="assignedTo" rules={[]}>
					<Select
						loading={staffLoading}
						mode="multiple"
						onChange={(e) => {
							setValues((val) => {
								return { ...val, assignedTo: [...e] };
							});
						}}
						style={{
							width: 200,
						}}
						options={staffSelectData}
						dropdownRender={(menu) => (
							<>
								{menu}
								<Divider style={{ margin: "8px 0" }} />
								<Pagination
									style={{
										margin: 8,
									}}
									showSizeChanger={false}
									size="small"
									pageSizeOptions={[10, 20]}
									simple={true}
									pageSize={staffSelectParams[0].pagination.pageSize}
									total={staffSelectParams[0].pagination.total}
									current={staffSelectParams[0].pagination.current}
									onChange={(page, pageSize) => {
										selectStaff({
											page: page,
											limit: pageSize,
										});
									}}
								/>
							</>
						)}
					/>
				</Form.Item>
				<Form.Item label="Project" name="project" rules={[]}>
					<Select
						loading={projectLoading}
						onChange={(e) => {
							setValues((val) => {
								return { ...val, project: e };
							});
						}}
						style={{
							width: 200,
						}}
						options={projectSelectData}
						dropdownRender={(menu) => (
							<>
								{menu}
								<Divider style={{ margin: "8px 0" }} />
								<Pagination
									style={{
										margin: 8,
									}}
									showSizeChanger={false}
									size="small"
									pageSizeOptions={[10, 20]}
									simple={true}
									pageSize={projectSelectParams[0].pagination.pageSize}
									total={projectSelectParams[0].pagination.total}
									current={projectSelectParams[0].pagination.current}
									onChange={(page, pageSize) => {
										selectProjects({
											page: page,
											limit: pageSize,
										});
									}}
								/>
							</>
						)}
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
