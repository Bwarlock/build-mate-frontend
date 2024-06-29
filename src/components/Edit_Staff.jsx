import {
	Button,
	Form,
	Input,
	Select,
	DatePicker,
	ConfigProvider,
	Divider,
	Pagination,
	Switch,
} from "antd";
import { useEffect, useState } from "react";
import { useAddData, useGetData } from "../api/hooks";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

function Edit_Staff({ staffProfileData }) {
	// const [values, setValues] = useState({});

	const [formValidate] = Form.useForm();
	const [editing, setEditing] = useState(false);

	const handleSubmit = (yo) => {
		console.log(yo ? yo : "");
		formValidate
			.validateFields()
			.then(() => {
				console.log("api not added");
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};
	return (
		// <ConfigProvider
		// 	theme={{
		// 		token: {
		// 			colorPrimary: "#283149",
		// 		},
		// 	}}>
		<Form
			// layout="vertical"
			onFinish={handleSubmit}
			labelWrap={true}
			colon={false}
			form={formValidate}
			name="addTask"
			className="profile-edit-form"
			style={{
				// maxWidth: 600,
				backgroundColor: "white",
				// padding: "1rem",
				display: "flex",
				flexDirection: "column",
				minHeight: "calc(100vh - 106px)",
				// boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
				// borderRadius: "10px",
			}}
			initialValues={staffProfileData}
			autoComplete="off"
			onValuesChange={() => {
				setEditing(true);
			}}>
			<Form.Item style={{}} label="Name" rules={[]}>
				<div
					style={{
						width: "100%",
						display: "flex",
						gap: 16,
						flexWrap: "wrap",
					}}>
					<Form.Item
						name="firstname"
						style={{ flexGrow: 1, minWidth: "168px", margin: 0 }}
						rules={[
							{
								required: true,
								message: "Please input The First Name!",
							},
						]}>
						<Input
							// value={values.firstname}
							placeholder="First Name"
							// onChange={(e) => {
							// 	setEditing(true);
							// 	setValues((val) => {
							// 		return { ...val, firstname: e.target.value };
							// 	});
							// }}
						/>
					</Form.Item>
					<Form.Item
						name="lastname"
						style={{ flexGrow: 1, minWidth: "168px", margin: 0 }}
						rules={[
							{
								required: false,
								message: "Please input The Last Name!",
							},
						]}>
						<Input
							// value={values.lastname}
							placeholder="Last Name"
							// onChange={(e) => {
							// 	setEditing(true);
							// 	setValues((val) => {
							// 		return { ...val, lastname: e.target.value };
							// 	});
							// }}
						/>
					</Form.Item>
				</div>
			</Form.Item>
			<Form.Item
				validateTrigger="onBlur"
				label="Email"
				name="email"
				rules={[
					{
						required: true,
						message: "Please input The Email!",
					},
					{
						type: "email",
						message: "The input is not a valid email!",
					},
				]}>
				<Input
					// value={values.email}
					onFocus={() => {
						formValidate.setFields([
							{
								name: "email",
								errors: [],
							},
						]);
					}}
					// onChange={(e) => {
					// 	setEditing(true);
					// 	setValues((val) => {
					// 		return { ...val, email: e.target.value };
					// 	});
					// }}
				/>
			</Form.Item>
			<Form.Item
				// validateTrigger="onBlur"
				label="Phone Number"
				name="phoneNumber"
				rules={[
					{
						required: true,
						message: "Please input The Phone Number!",
					},
					// {
					// 	pattern: /^(?:\+\d{1,3})?\d{10}$/,
					// 	message: "The input is not a valid phoneNumber",
					// },
				]}>
				<Input
				// onFocus={() => {
				// 	formValidate.setFields([
				// 		{
				// 			name: "phoneNumber",
				// 			errors: [],
				// 		},
				// 	]);
				// }}
				// value={values.phoneNumber}
				// onChange={(e) => {
				// 	setEditing(true);
				// 	setValues((val) => {
				// 		return { ...val, phoneNumber: e.target.value };
				// 	});
				// }}
				/>
			</Form.Item>
			<Form.Item
				label="Address"
				name="address"
				rules={
					[
						// {
						// 	required: true,
						// 	message: "Please input The Address!",
						// },
					]
				}>
				<Input
				// value={values.address}
				// onChange={(e) => {
				// 	setEditing(true);
				// 	setValues((val) => {
				// 		return { ...val, address: e.target.value };
				// 	});
				// }}
				/>
			</Form.Item>
			<Form.Item
				label="Date Of Birth"
				name="dob"
				rules={
					[
						// {
						// 	required: true,
						// 	message: "Please input The Address!",
						// },
					]
				}>
				<DatePicker
					showNow={false}
					style={{
						width: "100%",
					}}
				/>
			</Form.Item>
			<Form.Item
				valuePropName="checked"
				labelAlign="left"
				labelCol={{ span: 21 }}
				// wrapperCol={{ span: 2 }}
				label={
					<div>
						<div>Allow Access to edit</div>
						<div style={{ fontSize: "small", color: "#6C737F" }}>
							Means that the user can edit his/her profile
						</div>
					</div>
				}
				name="canEdit"
				rules={[]}>
				<Switch
				// checked={values.canEdit}
				// onChange={(e) => {
				// 	setEditing(true);
				// 	setValues((val) => {
				// 		return { ...val, canEdit: e };
				// 	});
				// }}
				/>
			</Form.Item>
			<Form.Item
				valuePropName="checked"
				labelAlign="left"
				labelCol={{ span: 21 }}
				// wrapperCol={{ span: 2 }}
				label={
					<div>
						<div>Active</div>
						<div style={{ fontSize: "small", color: "#6C737F" }}>
							Toggling this indicate that user is active member
						</div>
					</div>
				}
				name="active"
				rules={[]}>
				<Switch
				// checked={values.active}
				// onChange={(e) => {
				// 	setEditing(true);
				// 	setValues((val) => {
				// 		return { ...val, active: e };
				// 	});
				// }}
				/>
			</Form.Item>
			<Form.Item>
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "row-reverse",
						flexWrap: "wrap",
					}}>
					<Button
						disabled={!editing}
						type="primary"
						htmlType="submit"
						// onClick={handleSubmit}
					>
						Save Changes
					</Button>
					<Button
						onClick={() => {
							setEditing(false);
						}}
						htmlType="reset"
						type="text"
						style={{
							fontWeight: 600,
						}}>
						Cancel
					</Button>
				</div>
			</Form.Item>
			<div
				style={{
					flexGrow: 1,
					display: "flex",
					alignItems: "end",
					justifyContent: "center",
				}}>
				<Button
					style={{
						fontWeight: 600,
					}}
					type="text"
					danger={true}
					icon={<DeleteOutlined />}>
					Deactivate
				</Button>
			</div>
		</Form>
		// </ConfigProvider>
	);
}

export default Edit_Staff;
