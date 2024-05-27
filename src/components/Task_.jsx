// import {
// 	DownOutlined,
// 	EditFilled,
// 	EditOutlined,
// 	RightOutlined,
// } from "@ant-design/icons";
// import { isAction } from "@reduxjs/toolkit";
// import {
// 	Anchor,
// 	Badge,
// 	Button,
// 	Collapse,
// 	ConfigProvider,
// 	Descriptions,
// 	Divider,
// 	Form,
// 	Space,
// 	Typography,
// } from "antd";
// import { useState } from "react";

// function Task_Detail() {
// 	const [values, setValues] = useState({
// 		name: "Task 1",
// 		startDate: "",
// 		description:
// 			"asd asdasdwqh dhqwoidhoiwh doiahs doihawodihaoidha sidhaois diahsoidhaosidh oiashd oiahsdoih aosidh oiahsdoihasdi asiod oaishd oihasoidh aoisdh oiashdhasoid oaishd oaishddas dias diaos dioash doihas dasd jasj diasj doijaoidj aoidjasdas dad qw wadaw owihd oahdo iahsdo iashd oiasoidioashdoihasoidhoahsoidhoiwdoihwod oa wiawh dohw9d wh9dihwaoidawoid awoidoi awhdohwa",
// 		assignedTo: [],
// 		dueDate: "",
// 	});
// 	// const [addMargin, setAddMargin] = useState(0);
// 	const items = [
// 		{
// 			key: "1",
// 			label: "Product",
// 			children: "Cloud Database",
// 		},
// 		{
// 			key: "2",
// 			label: "Billing Mode",
// 			children: "Prepaid",
// 		},
// 		{
// 			key: "3",
// 			label: "Automatic Renewal",
// 			children: "YES",
// 		},
// 		{
// 			key: "4",
// 			label: "Order time",
// 			children: "2018-04-24 18:00:00",
// 		},
// 		{
// 			key: "5",
// 			label: "Usage Time",
// 			children: "2019-04-24 18:00:00",
// 			span: 2,
// 		},
// 		{
// 			key: "6",
// 			label: "Status",
// 			children: <Badge status="processing" text="Running" />,
// 			span: 3,
// 		},
// 		{
// 			key: "7",
// 			label: "Negotiated Amount",
// 			children: "$80.00",
// 		},
// 		{
// 			key: "8",
// 			label: "Discount",
// 			children: "$20.00",
// 		},
// 		{
// 			key: "9",
// 			label: "Official Receipts",
// 			children: "$60.00",
// 		},
// 		{
// 			key: "10",
// 			label: "Config Info",
// 			children: (
// 				<>
// 					Data disk type: MongoDB
// 					<br />
// 					Database version: 3.4
// 					<br />
// 					Package: dds.mongo.mid
// 					<br />
// 					Storage space: 10 GB
// 					<br />
// 					Replication factor: 3
// 					<br />
// 					Region: East China 1
// 					<br />
// 				</>
// 			),
// 		},
// 	];
// 	return (
// 		<Space
// 			direction="vertical"
// 			size="large"
// 			style={{
// 				width: "100%",
// 				position: "relative",
// 			}}>
// 			<Space
// 				direction="vertical"
// 				size="small"
// 				style={{
// 					width: "100%",
// 					padding: "1rem 1rem 0rem 1rem",
// 				}}>
// 				<Typography.Title
// 					level={2}
// 					style={{
// 						margin: 0,
// 						gap: 50,
// 						// marginLeft: addMargin,
// 						width: "70%",
// 					}}
// 					editable={{
// 						maxLength: 23,
// 						onChange: (txt) => {
// 							setValues((val) => {
// 								return { ...val, name: txt };
// 							});
// 						},
// 						icon: (
// 							<EditOutlined
// 								style={{
// 									marginLeft: 8,
// 								}}
// 							/>
// 						),
// 						// onStart: () => {
// 						// 	setAddMargin(20);
// 						// },
// 						// onEnd: () => {
// 						// 	setAddMargin(0);
// 						// },
// 						// onCancel:()=>{
// 						//     setAddMargin(0);

// 						// }
// 					}}
// 					copyable={true}>
// 					{values.name}
// 				</Typography.Title>
// 				<Typography.Text
// 					style={{
// 						marginLeft: 12,
// 					}}>
// 					By Someone , On 2 Feb 2099
// 				</Typography.Text>
// 			</Space>
// 			<Divider
// 				style={{
// 					margin: "8px 0px",
// 					backgroundColor: "lightgray",
// 				}}
// 			/>
// 			{/* <ConfigProvider
// 				theme={{
// 					components: {
// 						Collapse: {
// 							contentPadding: "16px !important",
// 						},
// 					},
// 				}}> */}
// 			<Collapse
// 				// collapsible="icon"
// 				// bordered={false}
// 				expandIcon={(panelProps) => {
// 					return (
// 						<ConfigProvider
// 							theme={{
// 								components: {
// 									Badge: { statusSize: 12 },
// 								},
// 							}}>
// 							<Badge status="success" />
// 						</ConfigProvider>

// 						// <div>
// 						// 	<svg width={12} height={12} viewBox="0 0 100 100">
// 						// 		<circle r="50" cx="50" cy="50" fill="green" />
// 						// 		Sorry, your browser does not support inline SVG.
// 						// 	</svg>
// 						// </div>
// 					);
// 				}}
// 				size="large"
// 				items={[
// 					{
// 						key: "1",
// 						label: (
// 							<div>
// 								<div
// 									style={{
// 										fontSize: "24px",
// 									}}>
// 									Status
// 								</div>
// 								<div
// 									style={{
// 										fontSize: "12px",
// 										width: "50%",
// 										textWrap: "nowrap",
// 										textOverflow: "ellipsis",
// 										overflow: "hidden",
// 									}}>
// 									In Case No Description askldnmalksndlkdas. da.s .da.s d.a.s
// 									.da.s .da.sd .as.d
// 								</div>
// 							</div>
// 						),
// 						children: (
// 							<Typography.Paragraph
// 								copyable={true}
// 								editable={{
// 									maxLength: 23,
// 									onChange: (txt) => {
// 										setValues((val) => {
// 											return { ...val, description: txt };
// 										});
// 									},
// 									icon: (
// 										<EditOutlined
// 											style={{
// 												marginLeft: 8,
// 											}}
// 										/>
// 									),
// 								}}
// 								style={{
// 									// marginLeft: 40,
// 									marginBottom: 0,
// 								}}>
// 								{values.description}
// 							</Typography.Paragraph>
// 						),
// 						// showArrow: false,
// 					},
// 				]}></Collapse>

// 			<Collapse
// 				// collapsible="icon"
// 				// bordered={false}
// 				size="large"
// 				items={[
// 					{
// 						key: "1",
// 						label: (
// 							<div>
// 								<div
// 									style={{
// 										fontSize: "24px",
// 									}}>
// 									Description
// 								</div>
// 								<div
// 									style={{
// 										fontSize: "12px",
// 										width: "50%",
// 										textWrap: "nowrap",
// 										textOverflow: "ellipsis",
// 										overflow: "hidden",
// 									}}>
// 									In Case No Description askldnmalksndlkdas. da.s .da.s d.a.s
// 									.da.s .da.sd .as.d
// 								</div>
// 							</div>
// 						),
// 						children: (
// 							<Typography.Paragraph
// 								copyable={true}
// 								editable={{
// 									maxLength: 23,
// 									onChange: (txt) => {
// 										setValues((val) => {
// 											return { ...val, description: txt };
// 										});
// 									},
// 									icon: (
// 										<EditOutlined
// 											style={{
// 												marginLeft: 8,
// 											}}
// 										/>
// 									),
// 								}}
// 								style={{
// 									marginLeft: 40,
// 									marginBottom: 0,
// 								}}>
// 								{values.description}
// 							</Typography.Paragraph>
// 						),
// 					},
// 				]}></Collapse>
// 			<Collapse
// 				// collapsible="icon"
// 				// bordered={false}
// 				defaultActiveKey={["1"]}
// 				contentPadding={2}
// 				size="large"
// 				items={[
// 					{
// 						key: "1",
// 						label: (
// 							<div
// 								style={{
// 									fontSize: "24px",
// 								}}>
// 								Task Information
// 							</div>
// 						),
// 						children: (
// 							<Descriptions
// 								style={{}}
// 								// title="User Info"
// 								bordered={true}
// 								items={items}
// 							/>
// 						),
// 					},
// 				]}></Collapse>
// 			<Anchor
// 				direction="horizontal"
// 				replace
// 				items={[
// 					{
// 						key: "part-1",
// 						href: "#part-1",
// 						title: "Part 1",
// 					},
// 					{
// 						key: "part-2",
// 						href: "#part-2",
// 						title: "Part 2",
// 					},
// 					{
// 						key: "part-3",
// 						href: "#part-3",
// 						title: "Part 3",
// 					},
// 				]}></Anchor>
// 			<div
// 				style={{
// 					position: "absolute",
// 					top: 0,
// 					right: 0,
// 					display: "flex",
// 					gap: 8,
// 				}}>
// 				<Button size="large" type="primary">
// 					Save
// 				</Button>
// 				<Button size="large">Cancel</Button>
// 			</div>
// 		</Space>
// 	);
// }

// export default Task_Detail;
