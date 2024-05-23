import {
	Button,
	ConfigProvider,
	Form,
	Input,
	Select,
	Space,
	message,
} from "antd";
import { useEffect, useState } from "react";
import { useAddData, useGetData } from "../api/hooks";
import { useSelector } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";

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

	const { selectData: projectSelectData } = useSelector(
		(state) => state.project
	);
	const { addClient } = useAddData();
	const { selectProjects } = useGetData();
	const [formValidate] = Form.useForm();

	useEffect(() => {
		if (!projectSelectData.length) {
			selectProjects({ page: 1, limit: 10 });
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
					data.description = "Here goes the description";
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
				{ key: Date.now().toString(), file: null, fileName: "a" },
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
					return { ...inp, fileName: file.name, file: file };
				}
				return inp;
			});
		});
		formValidate.setFieldsValue({ [`fileName${key}`]: file.name });
		formValidate.validateFields([`fileName${key}`]);
		console.log(fileInputs);
	};

	const handleFileNameChange = (key, event) => {
		formValidate.setFieldsValue({ [`fileName${key}`]: event.target.value });
		formValidate.validateFields([`fileName${key}`]);
		setFileInputs((inputs) => {
			return inputs.map((inp) => {
				if (inp.key === key) {
					return { ...inp, fileName: event.target.value };
				}
				return inp;
			});
		});
	};

	// const handleCustom = ({ file, onSuccess, onError }) => {
	// 	console.log(file);
	// 	formD.append("file", file);
	// 	setTimeout(() => {
	// 		// Simulating success
	// 		onSuccess("ok");
	// 		message.success(`${file.name} file uploaded successfully`);
	// 	}, 1000);
	// };
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
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: "Please input Client Email!",
						},
					]}>
					<Input
						onChange={(e) => {
							setValues((val) => {
								return { ...val, email: e.target.value };
							});
						}}
					/>
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input Client password!",
						},
					]}>
					<Input.Password
						onChange={(e) => {
							setValues((val) => {
								return { ...val, password: e.target.value };
							});
						}}
					/>
				</Form.Item>
				<Form.Item
					label="PhoneNumber"
					name="phoneNumber"
					rules={[
						{
							required: true,
							message: "Please input Client PhoneNumber!",
						},
					]}>
					<Input
						onChange={(e) => {
							console.log(formValidate);
							setValues((val) => {
								return { ...val, phoneNumber: e.target.value };
							});
						}}
					/>
				</Form.Item>
				<Form.Item label="Project" name="project" rules={[]}>
					<Select
						mode="multiple"
						onChange={(e) => {
							setValues((val) => {
								return { ...val, projects: [...e] };
							});
						}}
						style={{
							width: 120,
						}}
						options={projectSelectData}
					/>
				</Form.Item>
				{fileInputs.map((input) => (
					<Space
						key={input.key}
						style={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							backgroundColor: "#EDEDED",
							padding: "4px",
							display: "flex",
							marginBottom: 8,
							borderRadius: 10,
						}}
						align="start"
						wrap="true"
						size="small">
						<Form.Item
							style={{ margin: "none" }}
							name={`file${input.key}`}
							key="file"
							rules={[
								{
									required: true,
									message: "Please Upload File",
								},
							]}>
							<Dragger
								style={{ width: "fit-content", backgroundColor: "lightgray" }}
								beforeUpload={() => false}
								onChange={({ file }) => handleFileChange(input.key, file)}
								maxCount={1}
								file={input.file}>
								<p>
									<InboxOutlined />
								</p>
								<p>Click or drag file to this area to upload</p>
							</Dragger>
						</Form.Item>

						<Form.Item
							name={`fileName${input.key}`}
							key="fileNameForm"
							valuePropName="checked"
							rules={[
								{
									required: true,
									message: "Please Write a FileName",
								},
							]}>
							<input
								placeholder="File Name"
								value={input.fileName}
								onChange={(event) => {
									handleFileNameChange(input.key, event);
								}}
							/>
						</Form.Item>
						<Button onClick={() => handleRemove(input.key)}>Remove</Button>
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
