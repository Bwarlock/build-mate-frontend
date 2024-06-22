import { Button, Table, Tooltip, Space, Tag, Modal } from "antd";
import { useEffect } from "react";
import { useDeleteData, useGetData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setProjectTableParams } from "../store/projectSlice";
import { horizontalScroll } from "../util/functions";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDeleteConfirm, useTableColumns } from "./Component_Hooks";

function Project_Table({ showAddProjectDrawer }) {
	//Projects Page Component
	const { projectTableColumns } = useTableColumns();
	const {
		tableData: projectTableData,
		loading: projectLoading,
		tableParams: projectTableParams,
	} = useSelector((state) => state.project);

	const dispatch = useDispatch();
	const { getProjects } = useGetData();

	const handleTableChange = (pagination, filters, sorter) => {
		getProjects(
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
		if (!projectTableData.length) {
			getProjects();
		}

		// return horizontalScroll();
	}, []);

	return (
		<>
			<div className="headingTitle">Project</div>
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
					// transform: projectTableData.length > 9 ? "translateY(-8px)" : "",
				}}>
				<Button
					onClick={() => {
						getProjects();
					}}>
					Refresh
				</Button>

				<Button
					onClick={showAddProjectDrawer}
					style={{
						alignSelf: "end",
						// marginBottom: projectTableData.length > 9 ? "" : "1rem",
						marginBottom: "1rem",
						minWidth: "140px",
						minHeight: "40px",
					}}
					size="small"
					type="primary">
					Create New Project
				</Button>
			</div>

			<div
				style={{
					width: "100%",
					overflowX: "auto",
					// transform: projectTableData.length > 9 ? "translateY(16px)" : "",
				}}>
				<Table
					size="small"
					columns={projectTableColumns}
					dataSource={projectTableData}
					scroll={{ x: 1200, y: 40000 }}
					loading={projectLoading}
					pagination={projectTableParams[0].pagination}
					onChange={handleTableChange}
					bordered={true}
					virtual={true}
				/>
			</div>
		</>
	);
}
Project_Table.propTypes = {
	showAddProjectDrawer: PropTypes.func.isRequired,
};
export default Project_Table;
