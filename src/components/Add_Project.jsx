import {
	Button,
	ConfigProvider,
	Divider,
	Form,
	Input,
	Pagination,
	Select,
} from "antd";
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
		client: [],
		tasks: [],
	});

	const {
		selectData: staffSelectData,
		selectParams: staffSelectParams,
		loading: staffLoading,
	} = useSelector((state) => state.staff);
	const {
		selectData: clientSelectData,
		selectParams: clientSelectParams,
		loading: clientLoading,
	} = useSelector((state) => state.client);
	const {
		selectData: taskSelectData,
		selectParams: taskSelectParams,
		loading: taskLoading,
	} = useSelector((state) => state.task);
	const { user } = useSelector((state) => state.global);
	const { addProject } = useAddData();
	const { selectStaff, selectClients, selectTasks } = useGetData();
	const [formValidate] = Form.useForm();

	useEffect(() => {
		//Set Non Visible Values To Request
		setValues((val) => {
			return { ...val, owner: user.name };
		});
		if (!staffSelectData.length) {
			selectStaff();
		}

		if (!clientSelectData.length) {
			selectClients();
		}

		if (!taskSelectData.length) {
			selectTasks();
		}
	}, []);

	const handleSubmit = () => {
		formValidate
			.validateFields()
			.then(() => {
				addProject(values);
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
				name="addProject"
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
						loading={staffLoading}
						mode="multiple"
						onChange={(e) => {
							setValues((val) => {
								return { ...val, staff: [...e] };
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
									// pageSizeOptions={[10, 20]}
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

				<Form.Item label="Clients" name="clients" rules={[]}>
					<Select
						loading={clientLoading}
						onChange={(e) => {
							setValues((val) => {
								return { ...val, client: [e] };
							});
						}}
						style={{
							width: 200,
						}}
						options={clientSelectData}
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
									// pageSizeOptions={[10, 20]}
									simple={true}
									pageSize={clientSelectParams[0].pagination.pageSize}
									total={clientSelectParams[0].pagination.total}
									current={clientSelectParams[0].pagination.current}
									onChange={(page, pageSize) => {
										selectClients({
											page: page,
											limit: pageSize,
										});
									}}
								/>
							</>
						)}
					/>
				</Form.Item>

				<Form.Item label="Tasks" name="tasks" rules={[]}>
					<Select
						loading={taskLoading}
						onChange={(e) => {
							setValues((val) => {
								return { ...val, tasks: [...e] };
							});
						}}
						mode="multiple"
						style={{
							width: 200,
						}}
						options={taskSelectData}
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
									// pageSizeOptions={[10, 20]}
									simple={true}
									pageSize={taskSelectParams[0].pagination.pageSize}
									total={taskSelectParams[0].pagination.total}
									current={taskSelectParams[0].pagination.current}
									onChange={(page, pageSize) => {
										selectTasks({
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

export default Add_Project;
