import { Space, Table, Button, Drawer, Tooltip, Tag } from "antd";
import { useEffect, useState } from "react";
import { useGetData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import Add_Staff from "./Add_Staff";
import { setStaffTableParams } from "../store/staffSlice";
import { horizontalScroll } from "../util/functions";
import { DeleteFilled } from "@ant-design/icons";

const Staff = () => {
	//Column Titles
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			fixed: "left",
			width: 200,
			ellipsis: {
				showTitle: false,
			},
			render: (id) => (
				<Tooltip placement="topLeft" title={id}>
					{id}
				</Tooltip>
			),
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			fixed: "left",
			width: 120,
			ellipsis: {
				showTitle: false,
			},
			render: (name) => (
				<Tooltip placement="topLeft" title={name}>
					<a>{name}</a>
				</Tooltip>
			),
		},
		{
			title: "Company Name",
			dataIndex: "companyName",
			key: "companyName",
			width: 150,
			ellipsis: {
				showTitle: false,
			},
			render: (companyName) => (
				<Tooltip placement="topLeft" title={companyName}>
					{companyName}
				</Tooltip>
			),
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			width: 200,
			ellipsis: {
				showTitle: false,
			},
			render: (email) => (
				<Tooltip placement="topLeft" title={email}>
					{email}
				</Tooltip>
			),
		},
		{
			title: "PhoneNumber",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
			width: 120,
			ellipsis: {
				showTitle: false,
			},
			render: (phoneNumber) => (
				<Tooltip placement="topLeft" title={phoneNumber}>
					{phoneNumber}
				</Tooltip>
			),
		},
		{
			title: "Projects",
			dataIndex: "projects",
			key: "projects",
			width: 400,
			ellipsis: {
				showTitle: false,
			},
			render: (_, { projects }) => {
				return (
					<Tooltip
						placement="topLeft"
						title={projects.reduce((accumulator, currentObject) => {
							return accumulator + currentObject + " , ";
						}, "")}>
						<Space
							size="small"
							style={{
								textOverflow: "ellipsis",
								overflow: "hidden",
							}}>
							{projects.map((proj, index) => {
								return (
									<Tag color={"volcano"} key={index}>
										{proj.toUpperCase()}
									</Tag>
								);
							})}
						</Space>
					</Tooltip>
				);
			},
		},

		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 80,
			render: () => (
				<Space
					size="small"
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}>
					<Tooltip title="Delete">
						<Button type="primary" icon={<DeleteFilled />} danger></Button>
					</Tooltip>
				</Space>
			),
		},
	];
	const [openAddStaffDrawer, setOpenAddStaffDrawer] = useState(false);
	const showAddStaffDrawer = () => {
		setOpenAddStaffDrawer(true);
	};
	const closeAddStaffDrawer = () => {
		setOpenAddStaffDrawer(false);
	};
	//Staff Table Page Component
	const {
		tableData: staffTableData,
		loading: staffLoading,
		tableParams: staffTableParams,
	} = useSelector((state) => state.staff);
	const { getStaff } = useGetData();

	const handleTableChange = (pagination, filters, sorter) => {
		getStaff(
			{
				page: pagination.current,
				limit: pagination.pageSize,
			},
			{
				pagination,
				filters,
				...sorter,
			}
		);
	};

	useEffect(() => {
		if (!staffTableData.length) {
			getStaff();
		}

		return horizontalScroll();
	}, []);
	return (
		<div
			style={{
				width: "100%",
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				padding: "1rem",
			}}>
			<div
				style={{
					fontSize: 32,
					fontWeight: "bold",
					display: "flex",
					justifyContent: "center",
					// padding: 16,
				}}>
				Staff
			</div>
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Button
					onClick={() => {
						getStaff();
					}}>
					Refresh
				</Button>
				<Button
					onClick={showAddStaffDrawer}
					style={{
						alignSelf: "end",
						marginBottom: staffTableData.length > 9 ? "" : "1rem",
						// marginBottom: "1rem",
						minWidth: "140px",
						minHeight: "40px",
					}}
					type="primary">
					Onboard New Staff
				</Button>
			</div>
			<Drawer
				title="Onboard Staff to BuildMate"
				onClose={closeAddStaffDrawer}
				open={openAddStaffDrawer}>
				<Add_Staff />
			</Drawer>
			<div
				style={{
					width: "100%",
					overflowX: "auto",
					transform: staffTableData.length > 9 ? "translateY(16px)" : "",
				}}>
				<Table
					size="small"
					columns={columns}
					dataSource={staffTableData}
					scroll={{ x: 1200 }}
					loading={staffLoading}
					pagination={staffTableParams[0].pagination}
					onChange={handleTableChange}
					bordered={true}
				/>
			</div>
		</div>
	);
};
export default Staff;
