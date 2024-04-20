import { Space, Table, Tag, Button, message } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../env/axios";
import { Link } from "react-router-dom";
//Column Titles
const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Company Name",
		dataIndex: "companyName",
		key: "companyName",
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "PhoneNumber",
		dataIndex: "phoneNumber",
		key: "phoneNumber",
	},
	{
		title: "Projects",
		dataIndex: "projects",
		key: "projects",
		render: (_, { projects }) => {
			return (
				<Space
					size="middle"
					style={{
						maxWidth: "100px",
						textOverflow: "ellipsis",
						overflow: "hidden",
					}}>
					{projects.map((proj) => {
						return proj + ",";
					})}
				</Space>
			);
		},
	},

	{
		title: "Action",
		key: "action",
		render: () => (
			<Space size="middle">
				<Button type="primary" danger>
					Delete
				</Button>
			</Space>
		),
	},
];

const Staff = () => {
	//Projects Table Page Component
	const [data, setData] = useState([]);
	useEffect(() => {
		axiosInstance
			.get("/owner/get-staff?page=1&limit=5")
			.then((res) => {
				console.log(res.data);
				setData(
					res.data.staffData.map((val, index) => {
						return { ...val, key: "" + index };
					})
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e);
				return <></>;
			});
	}, []);
	return (
		<>
			<Link
				to="/dashboard/add_staff"
				style={{
					alignSelf: "end",
					marginBottom: "1rem",
					minWidth: "140px",
					minHeight: "40px",
				}}>
				<Button style={{ width: "100%", height: "100%" }} type="primary">
					Add
				</Button>
			</Link>
			<Table columns={columns} dataSource={data} />
		</>
	);
};
export default Staff;
