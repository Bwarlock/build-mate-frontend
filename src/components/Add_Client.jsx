import {
	Button,
	ConfigProvider,
	Divider,
	Form,
	Input,
	Pagination,
	Select,
	Space,
	Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { useAddData, useGetData } from "../api/hooks";
import { useSelector } from "react-redux";
import { InboxOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import TextArea from "antd/es/input/TextArea";

const Add_Client = () => {
	//Add Client Page Component
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		phoneNumber: "",
		companyName: "",
		projects: [],
	});
	const [fileInputs, setFileInputs] = useState([]);

	const {
		selectData: projectSelectData,
		selectParams: projectSelectParams,
		loading: projectLoading,
	} = useSelector((state) => state.project);
	const { addClient } = useAddData();
	const { selectProjects } = useGetData();
	const [formValidate] = Form.useForm();

	useEffect(() => {
		if (!projectSelectData.length) {
			selectProjects();
		}
	}, []);

	const handleSubmit = () => {
		console.log(fileInputs);
		formValidate
			.validateFields()
			.then(() => {
				const formdata = new FormData();
				Object.keys(values).forEach((key) => {
					formdata.append(key, values[key]);
				});
				const filesMeta = [];
				fileInputs.forEach((inp) => {
					let data = {};
					data.title = inp.fileName;
					// TODO: make description dynamic (input field)
					// Done
					data.description = inp.fileDescription;
					data.fileKey = inp.key;
					filesMeta.push(data);
					// add the file to the form data
					formdata.append(inp.key, inp.file);
				});
				formdata.append("filesMeta", JSON.stringify(filesMeta));
				addClient(formdata);
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};
	const handleAdd = () => {
		setFileInputs((inputs) => {
			return [
				...inputs,
				{
					key: Date.now().toString(),
					file: null,
					fileName: "",
					fileDescription: "",
				},
			];
		});
	};
	const handleRemove = (key) => {
		setFileInputs((inputs) => {
			return inputs.filter((inp) => inp.key !== key);
		});
	};
	const handleFileChange = (key, file) => {
		setFileInputs((inputs) => {
			return inputs.map((inp) => {
				if (inp.key === key) {
					return { ...inp, file: file };
				}
				return inp;
			});
		});
		// formValidate.setFieldsValue({ [`fileName${key}`]: file.name });
		// formValidate.validateFields([`fileName${key}`]);
	};

	const handleFileNameChange = (key, event) => {
		// formValidate.setFieldsValue({ [`fileName${key}`]: event.target.value });
		// formValidate.validateFields([`fileName${key}`]);
		setFileInputs((inputs) => {
			return inputs.map((inp) => {
				if (inp.key === key) {
					return { ...inp, fileName: event.target.value };
				}
				return inp;
			});
		});
	};
	const handleFileDescriptionChange = (key, event) => {
		setFileInputs((inputs) => {
			return inputs.map((inp) => {
				if (inp.key === key) {
					return { ...inp, fileDescription: event.target.value };
				}
				return inp;
			});
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
				name="addClient"
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
				<Form.Item label="Company Name" name="companyName" rules={[]}>
					<Input
						onChange={(e) => {
							setValues((val) => {
								return { ...val, companyName: e.target.value };
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
							message: "Please input Client Email!",
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
							message: "Please input Client password!",
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
					// validateTrigger="onBlur"
					label="PhoneNumber"
					name="phoneNumber"
					rules={[
						{
							required: true,
							message: "Please input Client PhoneNumber!",
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
						onChange={(e) => {
							setValues((val) => {
								return { ...val, phoneNumber: e.target.value };
							});
						}}
					/>
				</Form.Item>
				<Form.Item label="Project" name="project" rules={[]}>
					<Select
						loading={projectLoading}
						mode="multiple"
						onChange={(e) => {
							setValues((val) => {
								return { ...val, projects: [...e] };
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
									// showSizeChanger={false}
									size="small"
									pageSizeOptions={[10, 20]}
									// simple={true}
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
				{fileInputs.map((input) => (
					<Space
						key={input.key}
						style={{
							width: "100%",
							overflow: "hidden",
							textOverflow: "ellipsis",
							backgroundColor: "#EDEDED",
							// border: "4px solid #ededed",
							padding: "4px",
							display: "flex",

							marginBottom: 8,
							borderRadius: 10,
						}}
						align="start"
						wrap="true"
						size="small">
						<Form.Item
							style={{ marginBottom: 0 }}
							name={`file${input.key}`}
							key="file"
							rules={[
								{
									required: true,
									message: "Please Upload File",
								},
							]}>
							<Dragger
								style={{
									// width: "fit-content",
									backgroundColor: "lightgray",
									marginBottom: 0,
									width: 272,
								}}
								beforeUpload={() => false}
								onChange={({ file }) => handleFileChange(input.key, file)}
								maxCount={1}
								showUploadList={{
									showRemoveIcon: false,
								}}
								itemRender={(originNode) => (
									<div
										style={{
											width: 272,
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}>
										{originNode}
									</div>
								)}>
								<div>
									<p>
										<InboxOutlined />
									</p>
									<p>Click or drag file to this area to upload</p>
								</div>
							</Dragger>
						</Form.Item>

						<Form.Item
							style={{ marginBottom: 0 }}
							name={`fileName${input.key}`}
							key="fileName"
							// valuePropName="checked"
							rules={[
								{
									required: true,
									message: "Please Write a FileName",
								},
							]}>
							<Input
								placeholder="File Name"
								value={input.fileName}
								onChange={(event) => {
									handleFileNameChange(input.key, event);
								}}
							/>
						</Form.Item>
						<Button onClick={() => handleRemove(input.key)}>Remove</Button>
						<Form.Item
							style={{ marginBottom: 0 }}
							name={`fileDesc${input.key}`}
							key="fileDesc"
							rules={[]}>
							<TextArea
								placeholder="File Description"
								style={{ minWidth: 272 }}
								value={input.fileDescription}
								onChange={(event) => {
									handleFileDescriptionChange(input.key, event);
								}}
							/>
						</Form.Item>
					</Space>
				))}
				<Form.Item>
					<Button type="dashed" onClick={handleAdd} style={{}}>
						+ Add File
					</Button>
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
