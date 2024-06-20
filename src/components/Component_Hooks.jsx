import { Button, Modal, Space, Tag, Tooltip } from "antd";
import { useDeleteData } from "../api/hooks";
import {
	DeleteFilled,
	ExclamationCircleFilled,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

export const useDeleteConfirm = () => {
	const { deleteTask, deleteProject } = useDeleteData();

	const showTaskDeleteConfirm = (id, func) => {
		Modal.confirm({
			title: "Confirm deleting this Task?",
			icon: <ExclamationCircleFilled />,
			content: "Task will go to Trash",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			closable: true,
			maskClosable: true,
			// centered: true,
			onOk() {
				deleteTask(id);
				if (func) {
					func();
				}
			},
			onCancel() {},
		});
	};

	const showProjectDeleteConfirm = (id, func) => {
		Modal.confirm({
			title: "Confirm deleting this Project?",
			icon: <ExclamationCircleFilled />,
			content:
				"Project will be moved to trash. You can restore the project within 30 Days. Note: the staff and client access will be revoked.",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			closable: true,
			maskClosable: true,
			// centered: true,
			onOk() {
				deleteProject(id);
				if (func) {
					func();
				}
			},
			onCancel() {},
		});
	};

	return { showTaskDeleteConfirm, showProjectDeleteConfirm };
};

export const useTableColumns = () => {
	const { showTaskDeleteConfirm, showProjectDeleteConfirm } =
		useDeleteConfirm();

	const taskTableColumns = [
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
					<Link to={`/task_detail/${record?._id}`}>{text}</Link>
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
			title: "Project",
			dataIndex: "project",
			key: "project",
			width: 150,
			ellipsis: {
				showTitle: false,
			},
			render: (project) => (
				<Tooltip placement="topLeft" title={project?.name}>
					{project?.name}
				</Tooltip>
			),
		},
		{
			title: "Assigned To",
			dataIndex: "assignedTo",
			key: "assignedTo",
			width: 300,
			ellipsis: {
				showTitle: false,
			},
			render: (_, { assignedTo }) => {
				return (
					<Tooltip
						placement="topLeft"
						title={assignedTo.reduce((accumulator, currentObject) => {
							return accumulator + currentObject?.name + " , ";
						}, "")}>
						<Space
							size="small"
							style={{
								textOverflow: "ellipsis",
								overflow: "hidden",
							}}>
							{assignedTo.map((staff, index) => {
								return (
									<Tag color={"volcano"} key={index}>
										{staff?.name?.toUpperCase()}
									</Tag>
								);
							})}
						</Space>
					</Tooltip>
				);
			},
		},
		{
			title: "Created By",
			dataIndex: "createdBy",
			key: "createdBy",
			width: 200,
			ellipsis: {
				showTitle: false,
			},
			render: (createdBy) => (
				<Tooltip placement="topLeft" title={createdBy?.name}>
					{createdBy?.name}
				</Tooltip>
			),
		},
		{
			title: "DueDate",
			dataIndex: "dueDate",
			key: "dueDate",
			width: 140,
			ellipsis: {
				showTitle: false,
			},
			render: (dueDate) => (
				<>
					{dueDate ? (
						<Tooltip
							placement="topLeft"
							title={new Date(dueDate)?.toDateString()}>
							{new Date(dueDate)?.toDateString()}
						</Tooltip>
					) : (
						"-"
					)}
				</>
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
								showTaskDeleteConfirm(record?._id);
							}}></Button>
					</Tooltip>
				</Space>
			),
		},
	];
	const projectTableColumns = [
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
								showProjectDeleteConfirm(record?._id);
							}}></Button>
					</Tooltip>
				</Space>
			),
		},
	];
	return { taskTableColumns, projectTableColumns };
};
