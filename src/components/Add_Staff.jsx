import { Button, ConfigProvider, Form, Input, Tooltip } from "antd";
import { useState } from "react";
import { useAddData } from "../api/hooks";
import { InfoCircleOutlined } from "@ant-design/icons";

const Add_Staff = () => {
	//Add Staff Page Component
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		phoneNumber: "",
	});
	const { addStaff } = useAddData();
	const [formValidate] = Form.useForm();

	const handleSubmit = () => {
		formValidate
			.validateFields()
			.then(() => {
				addStaff(values);
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
				name="addStaff"
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
					validateTrigger="onBlur"
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: "Please input Staff Email!",
						},
						{
							type: "email",
							message: "The input is not a valid email!",
						},
					]}>
					<Input
						onFocus={() => {
							formValidate.setFields([
								{
									name: "email",
									errors: [],
								},
							]);
						}}
						onChange={(e) => {
							setValues((val) => {
								return { ...val, email: e.target.value };
							});
						}}
					/>
				</Form.Item>

				<Form.Item
					validateTrigger="onBlur"
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input Staff password!",
						},
						{
							pattern:
								/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							message:
								"Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
						},
					]}>
					<Input.Password
						onFocus={() => {
							formValidate.setFields([
								{
									name: "password",
									errors: [],
								},
							]);
						}}
						// showCount={true}
						addonAfter={
							<Tooltip title="Password must contain at least 8 characters including a lowercase letter, an uppercase letter,a number and a special character">
								<InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
							</Tooltip>
						}
						onChange={(e) => {
							setValues((val) => {
								return { ...val, password: e.target.value };
							});
						}}
					/>
				</Form.Item>
				<Form.Item
					validateTrigger="onBlur"
					label="PhoneNumber"
					name="phoneNumber"
					rules={[
						{
							required: true,
							message: "Please input Staff PhoneNumber!",
						},
						{
							pattern: /^(?:\+\d{1,3})?\d{10}$/,
							message: "The input is not a valid phoneNumber",
						},
					]}>
					<Input
						onFocus={() => {
							formValidate.setFields([
								{
									name: "phoneNumber",
									errors: [],
								},
							]);
						}}
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
