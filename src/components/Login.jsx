import { Form, Input, Button, message } from "antd";
import { useState } from "react";

function Login() {
	const [form] = Form.useForm();
	const [errors, setErrors] = useState({});

	const onFinish = (values) => {
		// Dummy validation - Check if name field is empty
		if (!values.name) {
			setErrors({ name: "Name is required" });
		} else {
			// Clear errors if there are no validation issues
			setErrors({});
			// Perform action (e.g., submit data)
			message.success("Form submitted successfully!");
			console.log(values);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			className="loginForm"
			form={form}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			layout="vertical"
			initialValues={{
				name: "",
				email: "",
				message: "",
			}}>
			<Form.Item
				label="Name"
				name="name"
				rules={[{ required: true, message: "Please input your name!" }]}
				validateStatus={errors.name ? "error" : ""}
				help={errors.name}>
				<Input />
			</Form.Item>

			<Form.Item
				label="Email"
				name="email"
				rules={[
					{ required: true, message: "Please input your email!" },
					{ type: "email", message: "Please enter a valid email address!" },
				]}>
				<Input />
			</Form.Item>

			<Form.Item label="Message" name="message">
				<Input.TextArea />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}

export default Login;
