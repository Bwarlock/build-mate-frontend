import { Space, Table, Button, Drawer, Tooltip, Tag } from "antd";
import { useEffect, useState } from "react";
import { useGetData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import Add_Staff from "./Add_Staff";
import { setStaffTableParams } from "../store/staffSlice";
import { horizontalScroll } from "../util/functions";
import { DeleteFilled } from "@ant-design/icons";
import { useTableColumns } from "./Component_Hooks";
import { useOutletContext } from "react-router-dom";

const Staff = () => {
	//Column Titles
	const { setDrawerOpener, setShowAddButton } = useOutletContext();
	const { staffTableColumns } = useTableColumns();
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
		setDrawerOpener(() => {
			return showAddStaffDrawer;
		});
		setShowAddButton(true);
		// return horizontalScroll();
	}, []);
	return (
		<div className="insideOutlet">
			<div className="headingTitle">Staff</div>
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
						// marginBottom: staffTableData.length > 9 ? "" : "1rem",
						marginBottom: "1rem",
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
					// transform: staffTableData.length > 9 ? "translateY(16px)" : "",
				}}>
				<Table
					size="small"
					columns={staffTableColumns}
					dataSource={staffTableData}
					scroll={{ x: 1200, y: 40000 }}
					loading={staffLoading}
					pagination={staffTableParams[0].pagination}
					onChange={handleTableChange}
					bordered={true}
					virtual={true}
				/>
			</div>
		</div>
	);
};
export default Staff;
