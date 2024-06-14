import { Button, Table, Tooltip, Space, Tag, Modal } from "antd";
import { useEffect } from "react";
import { useDeleteData, useGetData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setProjectTableParams } from "../store/projectSlice";
import { horizontalScroll } from "../util/functions";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Project_Table({ showAddProjectDrawer }) {
	//Projects Page Component
	const columns = [
		// TODO: add ID column
		// Manipulate the API response in the hooks to include the ID

		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			fixed: "left",
			width: 150,
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
			width: 100,
			ellipsis: {
				showTitle: false,
			},
			render: (text, record) => (
				<Tooltip placement="topLeft" title={text}>
					<Link to={`/project_detail/${record?._id}`}>{text}</Link>
				</Tooltip>
			),
		},
		{
			title: "createdAt",
			dataIndex: "createdAt",
			key: "createdAt",
			width: 140,
			ellipsis: {
				showTitle: false,
			},
			render: (createdAt) => (
				<Tooltip
					placement="topLeft"
					title={new Date(createdAt)?.toDateString()}>
					{new Date(createdAt)?.toDateString()}
				</Tooltip>
			),
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			width: 200,
			ellipsis: {
				showTitle: false,
			},
			render: (description) => (
				<Tooltip placement="topLeft" title={description}>
					{description}
				</Tooltip>
			),
		},

		{
			title: "Client",
			dataIndex: "client",
			key: "client",
			width: 200,
			ellipsis: {
				showTitle: false,
			},
			render: (_, { client }) => {
				return (
					<Tooltip
						placement="topLeft"
						title={client.reduce((accumulator, currentObject) => {
							return accumulator + currentObject?.name + " , ";
						}, "")}>
						<Space
							size="small"
							style={{
								textOverflow: "ellipsis",
								overflow: "hidden",
							}}>
							{client.map((clien, index) => {
								return (
									<Tag color={"lightblue"} key={index}>
										{clien?.name?.toUpperCase()}
									</Tag>
								);
							})}
						</Space>
					</Tooltip>
				);
			},
		},
		{
			title: "Staff",
			dataIndex: "staff",
			key: "staff",
			width: 300,
			ellipsis: {
				showTitle: false,
			},
			render: (_, { staff }) => {
				return (
					<Tooltip
						placement="topLeft"
						title={staff.reduce((accumulator, currentObject) => {
							return accumulator + currentObject?.name + " , ";
						}, "")}>
						<Space
							size="small"
							style={{
								textOverflow: "ellipsis",
								overflow: "hidden",
							}}>
							{staff.map((staf, index) => {
								return (
									<Tag color={"volcano"} key={index}>
										{staf?.name?.toUpperCase()}
									</Tag>
								);
							})}
						</Space>
					</Tooltip>
				);
			},
		},
		{
			title: "Tasks",
			dataIndex: "tasks",
			key: "tasks",
			width: 300,
			ellipsis: {
				showTitle: false,
			},
			render: (_, { tasks }) => {
				return (
					<Tooltip
						placement="topLeft"
						title={tasks.reduce((accumulator, currentObject) => {
							return accumulator + currentObject?.name + " , ";
						}, "")}>
						<Space
							size="small"
							style={{
								textOverflow: "ellipsis",
								overflow: "hidden",
							}}>
							{tasks.map((task, index) => {
								return (
									<Tag color={"volcano"} key={index}>
										{task?.task_id?.toUpperCase()}
									</Tag>
								);
							})}
						</Space>
					</Tooltip>
				);
			},
		},
		{
			title: "Owner",
			dataIndex: "owner",
			key: "owner",
			width: 200,
			ellipsis: {
				showTitle: false,
			},
			render: (owner) => (
				<Tooltip placement="topLeft" title={owner?.email}>
					{owner?.name}
				</Tooltip>
			),
		},

		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 80,
			render: (text, record) => (
				<Space
					size="small"
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}>
					<Tooltip title="Delete">
						<Button
							type="primary"
							icon={<DeleteFilled />}
							danger
							onClick={() => {
								showDeleteConfirm(record?._id);
							}}></Button>
					</Tooltip>
				</Space>
			),
		},
	];

	const {
		tableData: projectTableData,
		loading: projectLoading,
		tableParams: projectTableParams,
	} = useSelector((state) => state.project);

	const dispatch = useDispatch();
	const { getProjects } = useGetData();
	const { deleteProject } = useDeleteData();

	const showDeleteConfirm = (id) => {
		Modal.confirm({
			title: "Confirm deleting this Project?",
			icon: <ExclamationCircleFilled />,
			content:
				"Project will be removed from staff and client as well , one has to manually add it after restoring the project",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			closable: true,
			maskClosable: true,
			// centered: true,
			onOk() {
				handleDeleteProject(id);
			},
			onCancel() {},
		});
	};

	const handleDeleteProject = (id) => {
		deleteProject(id);
	};

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

		return horizontalScroll();
	}, []);

	return (
		<>
			<div
				style={{
					fontSize: 32,
					fontWeight: "bold",
					display: "flex",
					justifyContent: "center",
					// padding: 16,
				}}>
				Project
			</div>
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
						marginBottom: projectTableData.length > 9 ? "" : "1rem",
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
					transform: projectTableData.length > 9 ? "translateY(16px)" : "",
				}}>
				<Table
					size="small"
					columns={columns}
					dataSource={projectTableData}
					scroll={{ x: 1200 }}
					loading={projectLoading}
					pagination={projectTableParams[0].pagination}
					onChange={handleTableChange}
					bordered={true}
				/>
			</div>
		</>
	);
}
Project_Table.propTypes = {
	showAddProjectDrawer: PropTypes.func.isRequired,
};
export default Project_Table;
