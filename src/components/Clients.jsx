import { Space, Table, Button, Drawer, Tooltip, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetData } from "../api/hooks";
import Add_Client from "./Add_Client";
import { horizontalScroll } from "../util/functions";
import { setClientTableParams } from "../store/clientSlice";
import { DeleteFilled } from "@ant-design/icons";
import { useTableColumns } from "./Component_Hooks";
import { useOutletContext } from "react-router-dom";

const Clients = () => {
	//Column Titles
	const { setDrawerOpener, setShowAddButton } = useOutletContext();
	const { clientTableColumns } = useTableColumns();
	const [openAddClientDrawer, setOpenAddClientDrawer] = useState(false);
	const showAddClientDrawer = () => {
		setOpenAddClientDrawer(true);
	};
	const closeAddClientDrawer = () => {
		setOpenAddClientDrawer(false);
	};
	//Clients Table Page Component
	const {
		tableData: clientTableData,
		loading: clientLoading,
		tableParams: clientTableParams,
	} = useSelector((state) => state.client);
	const dispatch = useDispatch();
	const { getClients } = useGetData();

	const handleTableChange = (pagination, filters, sorter) => {
		getClients(
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
		if (!clientTableData.length) {
			getClients();
		}
		setDrawerOpener(() => {
			return showAddClientDrawer;
		});
		setShowAddButton(true);
		// return horizontalScroll();
	}, []);
	return (
		<div className="insideOutlet">
			<div className="headingTitle">Client</div>
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Button
					onClick={() => {
						getClients();
					}}>
					Refresh
				</Button>
				<Button
					onClick={showAddClientDrawer}
					style={{
						alignSelf: "end",
						// marginBottom: clientTableData.length > 9 ? "" : "1rem",
						marginBottom: "1rem",
						minWidth: "140px",
						minHeight: "40px",
					}}
					type="primary">
					Onboard New Client
				</Button>
			</div>
			<Drawer
				title="Onboard a new Client to Build Mate"
				// width={378}
				onClose={closeAddClientDrawer}
				open={openAddClientDrawer}>
				<Add_Client />
			</Drawer>
			<div
				style={{
					width: "100%",
					overflowX: "auto",
					// transform: clientTableData.length > 9 ? "translateY(16px)" : "",
				}}>
				<Table
					size="small"
					columns={clientTableColumns}
					dataSource={clientTableData}
					scroll={{ x: 1200, y: 40000 }}
					loading={clientLoading}
					pagination={clientTableParams[0].pagination}
					onChange={handleTableChange}
					bordered={true}
					virtual={true}
				/>
			</div>
		</div>
	);
};
export default Clients;
