import { Drawer, Radio, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Add_Project from "./Add_Project";
import { setProjectView } from "../store/projectSlice";
import { TableOutlined } from "@ant-design/icons";
import RefIcon from "@ant-design/icons/lib/icons/AppstoreAddOutlined";
import { useEffect, useState } from "react";
import Project_Table from "./Project_Table";
import Project_Card from "./Project_Card";
import { useOutletContext } from "react-router-dom";

//Need To Modularize the Table And Card
//Also with all other components
function Project() {
	const { setDrawerOpener, setShowAddButton } = useOutletContext();
	const [openAddProjectDrawer, setOpenAddProjectDrawer] = useState(false);
	const dispatch = useDispatch();
	const { view: projectView } = useSelector((state) => state.project);

	const showAddProjectDrawer = () => {
		setOpenAddProjectDrawer(true);
	};

	const closeAddProjectDrawer = () => {
		setOpenAddProjectDrawer(false);
	};

	const handleViewChange = (e) => {
		dispatch(setProjectView(e.target.value));
	};
	useEffect(() => {
		setDrawerOpener(() => {
			return showAddProjectDrawer;
		});
		setShowAddButton(true);
	}, []);
	return (
		<>
			<Drawer
				title="Create New Project"
				onClose={closeAddProjectDrawer}
				open={openAddProjectDrawer}>
				<Add_Project />
			</Drawer>
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
					defaultValue={projectView}
					buttonStyle="solid">
					<Tooltip title="Table View">
						<Radio.Button value="table">
							<TableOutlined />
						</Radio.Button>
					</Tooltip>
					<Tooltip title="Card View">
						<Radio.Button value="card">
							<RefIcon />
						</Radio.Button>
					</Tooltip>
				</Radio.Group>
				{projectView === "table" && (
					<Project_Table showAddProjectDrawer={showAddProjectDrawer} />
				)}
				{projectView === "card" && (
					<Project_Card showAddProjectDrawer={showAddProjectDrawer} />
				)}
			</div>
		</>
	);
}

export default Project;
