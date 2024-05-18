import { Card } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useGetData } from "../api/hooks";
import { useSelector } from "react-redux";
import Add_Project from "./Add_Project";

const Project = () => {
  const [openAddProjectDrawer, setOpenAddProjectDrawer] = useState(false);

  const showAddProjectDrawer = () => {
    setOpenAddProjectDrawer(true);
  };

  const closeAddProjectDrawer = () => {
    setOpenAddProjectDrawer(false);
  };
  //Projects Page Component
  const { tableData: projectTableData } = useSelector((state) => state.project);
  const { getProjects } = useGetData();

  useEffect(() => {
    if (!projectTableData.length) {
      getProjects({ page: 1, limit: 10 });
    }
  }, []);
  return (
    <>
      <div className="gridded">
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
              }}
            >
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
            // <div className="card" key={index}>
            // 	{JSON.stringify(pro)}
            // </div>
          );
        })}
        {/* Open drawer on Add project button click */}
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
          }}
        >
          <PlusOutlined style={{ fontSize: 24 }} />
        </Card>
        <Drawer
          title="Create New Project"
          onClose={closeAddProjectDrawer}
          open={openAddProjectDrawer}
        >
          <Add_Project />
        </Drawer>
      </div>
      {/* <Table columns={columns} dataSource={data} />; */}
    </>
  );
};
export default Project;
