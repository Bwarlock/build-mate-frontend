import { Button, Card, Pagination, Spin } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useGetData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setProjectTableParams } from "../store/projectSlice";

const Project_Card = ({ showAddProjectDrawer }) => {
	//Projects Page Component
	const {
		tableData: projectTableData,
		loading: projectLoading,
		tableParams: params,
	} = useSelector((state) => state.project);
	const tableParams = params[0];
	const dispatch = useDispatch();
	const { getProjects } = useGetData();

	const handlePageChange = (page, pageSize) => {
		dispatch(
			setProjectTableParams({
				...tableParams,
				pagination: {
					...tableParams.pagination,
					current: page,
					pageSize: pageSize,
				},
			})
		);

		getProjects({
			page: page,
			limit: pageSize,
		});
	};

	useEffect(() => {
		if (!projectTableData.length) {
			getProjects({
				page: tableParams.pagination.current,
				limit: tableParams.pagination.pageSize,
			});
		}
	}, []);
	return (
		<>
			<Spin spinning={projectLoading} fullscreen={true} />
			<div
				className="gridded"
				style={{
					display: "grid",
					gap: "2rem",
					padding: "4rem",
					gridTemplateColumns: "repeat(3, 1fr)",
					// justifyContent: "center",
					alignItems: "center",
					justifyItems: "center",
				}}>
				{projectTableData.map((pro, index) => {
					return (
						<Card
							hoverable
							className="card"
							key={index}
							title={pro.name}
							extra={
								<Link to={"/dashboard/project/" + pro._id ? pro._id : ""}>
									More
								</Link>
							}
							style={{
								width: 300,
								height: "fit-content",
								textWrap: "nowrap",
								// borderRadius: 10,
							}}>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Description : </span>
								{pro.description}
							</p>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Staff : </span>
								{pro.staff
									.map((sta) => {
										return sta.name;
									})
									.join(", ")}
							</p>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Client : </span>
								{pro.client.join(", ")}
							</p>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Tasks : </span>
								{pro.tasks.join(", ")}
							</p>
							<p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Created At : </span>
								<small>
									{new Date(pro.createdAt).getDate() + 1}&nbsp;&nbsp;{", "}
									{new Date(pro.createdAt).getMonth() + 1}&nbsp;&nbsp;{", "}
									{new Date(pro.createdAt).getFullYear()}
								</small>
							</p>

							<small>&nbsp;&nbsp;{pro.owner}</small>
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
					padding: 16,
				}}>
				<Button
					onClick={() => {
						getProjects({
							page: tableParams.pagination.current,
							limit: tableParams.pagination.pageSize,
						});
					}}>
					Refresh
				</Button>
				<Pagination
					pageSize={tableParams.pagination.pageSize}
					total={tableParams.pagination.total}
					current={tableParams.pagination.current}
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
