import { Button, Card, Flex, Modal, Pagination, Spin, Tooltip } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
	DeleteFilled,
	DeleteOutlined,
	ExclamationCircleFilled,
	PlusOutlined,
} from "@ant-design/icons";
import { useDeleteData, useGetData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setProjectTableParams } from "../store/projectSlice";

const Project_Card = ({ showAddProjectDrawer }) => {
	//Projects Page Component
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
	const handlePageChange = (page, pageSize) => {
		getProjects(
			{
				page: page,
				limit: pageSize,
			},
			{
				...projectTableParams[0],
				pagination: {
					...projectTableParams[0].pagination,
					current: page,
					pageSize: pageSize,
				},
			}
		);
	};

	useEffect(() => {
		if (!projectTableData.length) {
			getProjects();
		}
	}, []);
	return (
		<>
			<Spin spinning={projectLoading} fullscreen={true} />
			<div
				style={{
					fontSize: 32,
					fontWeight: "bold",
					display: "flex",
					justifyContent: "center",
					// padding: 16,
					marginBottom: "1rem",
				}}>
				Project
			</div>
			<div
				style={{
					display: "flex",
					gap: 12,
					justifyContent: "center",
					// padding: 16,
					marginBottom: "1rem",
				}}>
				<Button
					onClick={() => {
						getProjects();
					}}>
					Refresh
				</Button>
				<Pagination
					pageSize={projectTableParams[0].pagination.pageSize}
					total={projectTableParams[0].pagination.total}
					current={projectTableParams[0].pagination.current}
					onChange={handlePageChange}
				/>
			</div>
			<div
				className="gridded"
				style={{
					display: "grid",
					width: "100%",
					gap: "3rem",
					// padding: "1rem",
					marginBottom: "1rem",
					gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
					alignItems: "center",
					justifyItems: "center",
				}}>
				{projectTableData.map((pro, index) => {
					return (
						<Card
							hoverable
							className="card"
							key={index}
							title={
								<span
									style={{
										display: "flex",
										alignItems: "center",
									}}>
									<span
										style={{
											marginRight: 8,
											maxWidth: 160,
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}>
										{pro?.name}
									</span>
									<Tooltip title="Delete">
										<Button
											style={{}}
											type="text"
											size="middle"
											icon={<DeleteOutlined />}
											// danger
											onClick={() => {
												showDeleteConfirm(pro?._id);
											}}></Button>
									</Tooltip>
								</span>
							}
							extra={<Link to={`/project_detail/${pro?._id}`}>More</Link>}
							// actions={[
							// 	<Tooltip title="Delete">
							// 		<div
							// 			style={{
							// 				width: "100%",
							// 				display: "flex",
							// 				justifyContent: "end",
							// 				paddingRight: 16,
							// 			}}>
							// 			<Button
							// 				style={{}}
							// 				type="text"
							// 				size="middle"
							// 				icon={<DeleteOutlined />}
							// 				// danger
							// 				onClick={() => {
							// 					showDeleteConfirm(pro._id);
							// 				}}>
							// 				Delete
							// 			</Button>
							// 		</div>
							// 	</Tooltip>,
							// 	// <DeleteOutlined key="delete" />,
							// ]}
							style={{
								width: 300,
								height: "fit-content",
								textWrap: "nowrap",
								cursor: "unset",
								borderRadius: 10,
							}}>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Description : </span>
								{pro?.description}
							</p>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Staff : </span>
								{pro?.staff
									?.map((sta) => {
										return sta?.name;
									})
									?.join(", ")}
							</p>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Client : </span>
								{pro?.client
									?.map((clin) => {
										return clin?.name;
									})
									?.join(", ")}
							</p>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Tasks : </span>
								{pro?.tasks
									?.map((tas) => {
										return tas?.name;
									})
									?.join(", ")}
							</p>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Created At : </span>
								<small>
									{new Date(pro?.createdAt)?.toDateString()}
									{/* {new Date(pro.createdAt).getDate() + 1}&nbsp;&nbsp;{", "}
									{new Date(pro.createdAt).getMonth() + 1}&nbsp;&nbsp;{", "}
									{new Date(pro.createdAt).getFullYear()} */}
								</small>
							</p>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Owner : </span>
								{pro?.owner?.name}
							</p>
						</Card>
					);
				})}
				<Card
					className="card"
					key="Add"
					hoverable
					onClick={showAddProjectDrawer}
					style={{
						width: 180,
						height: 180,
						// margin: 20,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						// borderRadius: 10,
					}}>
					<PlusOutlined style={{ fontSize: 24 }} />
				</Card>
			</div>
			<div
				style={{
					display: "flex",
					gap: 12,
					justifyContent: "center",
					// padding: 16,
				}}>
				<Button
					onClick={() => {
						getProjects();
					}}>
					Refresh
				</Button>
				<Pagination
					pageSize={projectTableParams[0].pagination.pageSize}
					total={projectTableParams[0].pagination.total}
					current={projectTableParams[0].pagination.current}
					onChange={handlePageChange}
				/>
			</div>
		</>
	);
};
Project_Card.propTypes = {
	showAddProjectDrawer: PropTypes.func.isRequired,
};
export default Project_Card;
