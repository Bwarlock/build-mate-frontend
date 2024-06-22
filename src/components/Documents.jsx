import { Button, Checkbox, ConfigProvider, Form, Input, Radio } from "antd";
import { useEffect, useState } from "react";
import { useAddData } from "../api/hooks";
import { Card, Flex, Modal, Pagination, Spin, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import RefIcon from "@ant-design/icons/lib/icons/AppstoreAddOutlined";
import {
	DeleteFilled,
	DeleteOutlined,
	ExclamationCircleFilled,
	FileTextFilled,
	FileTextOutlined,
	PlusOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import { useDeleteData, useGetData } from "../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setDocumentView } from "../store/documentSlice";

const Document = () => {
	const { addDocument } = useAddData();
	const [values, setValues] = useState({
		title: "",
		content: "",
		readUsers: [],
		writeUsers: [],
	});
	const handleSubmit = () => {
		if (values.title) {
			addDocument(values);
		} else {
			addDocument({ ...values, title: "New Document" });
		}
	};

	const {
		tableData: documentTableData,
		loading: documentLoading,
		tableParams: documentTableParams,
		view: documentView,
	} = useSelector((state) => state.document);
	const dispatch = useDispatch();
	const { getDocuments } = useGetData();
	const [showAddDocument, setShowAddDocument] = useState(false);
	const showModal = () => {
		setShowAddDocument(true);
	};
	const hideModal = () => {
		setShowAddDocument(false);
	};
	const handlePageChange = (page, pageSize) => {
		getDocuments(
			{
				page: page,
				limit: pageSize,
			},
			{
				...documentTableParams[0],
				pagination: {
					...documentTableParams[0].pagination,
					current: page,
					pageSize: pageSize,
				},
			}
		);
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (!documentTableData.length) {
			getDocuments();
		}
	}, []);
	const handleViewChange = (e) => {
		dispatch(setDocumentView(e.target.value));
	};
	const showDeleteConfirm = (id) => {
		Modal.confirm({
			title: "Confirm deleting this Document?",
			icon: <ExclamationCircleFilled />,
			content: "Document Will be Deleted",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			closable: true,
			maskClosable: true,
			// centered: true,
			onOk() {
				handleDeleteDocument(id);
			},
			onCancel() {},
		});
	};
	const handleDeleteDocument = (id) => {
		// deleteProject(id);
	};
	return (
		<div
			className="insideOutlet"
			style={{
				position: "relative",
			}}>
			<Radio.Group
				style={{
					position: "absolute",
					top: "1rem",
					right: "1rem",
					zIndex: 1,
				}}
				onChange={handleViewChange}
				defaultValue={documentView}
				buttonStyle="solid">
				<Tooltip title="List View">
					<Radio.Button value="list">
						<UnorderedListOutlined />
					</Radio.Button>
				</Tooltip>
				<Tooltip title="Card View">
					<Radio.Button value="card">
						<RefIcon />
					</Radio.Button>
				</Tooltip>
			</Radio.Group>
			<Spin spinning={documentLoading} fullscreen={true} />

			<div
				className="headingTitle"
				style={{
					marginBottom: "1rem",
					// padding: 16,
				}}>
				Writer
			</div>

			<div
				className="gridded-document"
				style={{
					display: "grid",
					gap: "1rem",
					width: "100%",
					// padding: "1rem",
					marginBottom: "1rem",
					gridTemplateColumns:
						documentView == "card"
							? "repeat(auto-fit, minmax(200px, 1fr))"
							: "",
					alignItems: "center",
					justifyItems: "center",
				}}>
				{documentTableData.map((doc, index) => {
					return (
						<Card
							hoverable
							className="card"
							key={index}
							style={{
								width: documentView == "card" ? 180 : "100%",

								height: "fit-content",
								// textWrap: "nowrap",
								cursor: documentView == "list" ? "unset" : "",
								borderRadius: 10,
								// maxWidth: "94vw",
							}}
							styles={{
								body:
									documentView == "list"
										? { padding: 0 }
										: { padding: "8px 16px 8px 16px" },
							}}
							onClick={() => {
								if (documentView == "card") {
									navigate(`/dashboard/documents/${doc?._id}`);
								}
							}}
							title={
								documentView == "list" ? (
									<div
										style={{
											display: "flex",
											alignItems: "center",
										}}>
										<div
											style={{
												marginRight: 8,
												width: 500,
												maxWidth: "60vw",
												overflow: "hidden",
												textOverflow: "ellipsis",
											}}>
											<Tooltip placement="topLeft" title={doc?.title}>
												{doc?.title}
											</Tooltip>
										</div>
									</div>
								) : (
									<div
										style={{
											width: "100%",
											padding: "1rem",
											textAlign: "center",
										}}>
										<FileTextOutlined style={{ fontSize: 72 }} />
									</div>
								)
							}
							extra={
								documentView == "list" ? (
									<div>
										<Link to={`/dashboard/documents/${doc?._id}`}>Edit</Link>
										<Tooltip title="Delete">
											<Button
												style={{
													marginLeft: 8,
													minWidth: 32,
												}}
												type="text"
												size="middle"
												icon={<DeleteOutlined />}
												// danger
												onClick={(e) => {
													e.stopPropagation();
													showDeleteConfirm(doc?._id);
												}}></Button>
										</Tooltip>
									</div>
								) : (
									<></>
								)
							}>
							{documentView == "card" && (
								<>
									<span
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
										}}>
										<div
											style={{
												overflow: "hidden",
												textOverflow: "ellipsis",
												wordWrap: "break-word",
												width: 120,
												maxHeight: 66,
											}}>
											<Tooltip placement="topLeft" title={doc?.title}>
												{doc?.title}
											</Tooltip>
										</div>
										<Tooltip title="Delete">
											<Button
												style={{ minWidth: 32 }}
												type="text"
												size="middle"
												icon={<DeleteOutlined />}
												// danger
												onClick={(e) => {
													e.stopPropagation();
													showDeleteConfirm(doc?._id);
												}}></Button>
										</Tooltip>
									</span>
								</>
							)}

							{/* <p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
								<span style={{ fontWeight: "bold" }}>Created At : </span>
								<small>{new Date(pro?.createdAt)?.toDateString()}</small>
							</p> */}
						</Card>
					);
				})}
				<Card
					className="card"
					key="Add"
					hoverable
					onClick={showModal}
					style={{
						width: 120,
						height: documentView == "card" ? 120 : 60,
						// margin: 20,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						justifySelf:
							documentView == "list" && documentTableData.length > 0
								? "end"
								: "",
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
						getDocuments();
					}}>
					Refresh
				</Button>
				<Pagination
					pageSize={documentTableParams[0].pagination.pageSize}
					total={documentTableParams[0].pagination.total}
					current={documentTableParams[0].pagination.current}
					onChange={handlePageChange}
				/>
			</div>
			<Modal
				title="Create New Document"
				icon={<FileTextFilled />}
				open={showAddDocument}
				okText="Create"
				okType="primary"
				closable={true}
				maskClosable={true}
				onOk={() => {
					hideModal();
					handleSubmit();
				}}
				onCancel={hideModal}>
				<Input
					placeholder="Document Title"
					value={values.title}
					maxLength={56}
					onChange={(e) => {
						setValues((val) => {
							return { ...val, title: e.target.value };
						});
					}}
				/>
			</Modal>
		</div>
	);

	return (
		// TODO: add list of docs here
		<>
			{/* Ask title and to add users in a popup */}
			<Button type="primary" htmlType="submit" onClick={handleSubmit}>
				Create new Document
			</Button>
		</>
	);
};
export default Document;
