import { Space, Table, Button, Drawer, Tag, Tooltip, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDeleteData, useGetData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import Add_Task from "./Add_Task";
import { setTaskTableParams } from "../store/taskSlice";
import { horizontalScroll } from "../util/functions";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDeleteConfirm, useTableColumns } from "./Component_Hooks";

const Task_Table = () => {
	const [openAddTaskDrawer, setOpenAddTaskDrawer] = useState(false);
	const { taskTableColumns } = useTableColumns();
	const showAddTaskDrawer = () => {
		setOpenAddTaskDrawer(true);
	};
	const closeAddTaskDrawer = () => {
		setOpenAddTaskDrawer(false);
	};

	const {
		tableData: taskTableData,
		loading: taskLoading,
		tableParams: taskTableParams,
	} = useSelector((state) => state.task);

	const dispatch = useDispatch();
	const { getTasks } = useGetData();

	const handleTableChange = (pagination, filters, sorter) => {
		getTasks(
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
		if (!taskTableData?.length) {
			getTasks();
		}
		// return horizontalScroll();
	}, []);
	return (
		<div className="insideOutlet">
			<div className="headingTitle">Task</div>
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Button
					onClick={() => {
						getTasks();
					}}>
					Refresh
				</Button>

				<Button
					onClick={showAddTaskDrawer}
					style={{
						alignSelf: "end",
						marginBottom: taskTableData?.length > 9 ? "" : "1rem",
						// marginBottom: "1rem",
						minWidth: "140px",
						minHeight: "40px",
					}}
					type="primary">
					Create New Task
				</Button>
			</div>
			<Drawer
				title="Create a new Task"
				// width={720}
				onClose={closeAddTaskDrawer}
				open={openAddTaskDrawer}>
				<Add_Task />
			</Drawer>
			<div
				style={{
					width: "100%",
					overflowX: "auto",
					transform: taskTableData.length > 9 ? "translateY(16px)" : "",
				}}>
				<Table
					size="small"
					columns={taskTableColumns}
					dataSource={taskTableData}
					scroll={{ x: 1200, y: 40000 }}
					loading={taskLoading}
					pagination={taskTableParams[0].pagination}
					onChange={handleTableChange}
					bordered={true}
					virtual={true}
				/>
			</div>
		</div>
	);
};

export default Task_Table;
