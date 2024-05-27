import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Project_Card from "./components/Project_Card";
import Add_Project from "./components/Add_Project";
import Add_Staff from "./components/Add_Staff";
import Dashboard from "./components/Dashboard";
import Staff from "./components/Staff";
import Add_Task from "./components/Add_Task";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Clients from "./components/Clients";
import Add_Client from "./components/Add_Client";
import Document from "./components/Documents";
import TextEditor from "./components/TextEditor";
import Project_Table from "./components/Project_Table";
import Task_Table from "./components/Task_Table";
import Task_Detail from "./components/Task_Detail";
import Page_Not_Exist from "./components/Page_Not_Exist";
import Project from "./components/Project";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/page-not-found" element={<Page_Not_Exist />}></Route>
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />}>
						<Route path="/dashboard/project" element={<Project />}></Route>
						<Route path="/dashboard/staff" element={<Staff />}></Route>
						<Route path="/dashboard/tasks" element={<Task_Table />}></Route>
						<Route path="/dashboard/clients" element={<Clients />}></Route>
						<Route
							path="/dashboard/add_client"
							element={<Add_Client />}></Route>
						<Route
							path="/dashboard/add_project"
							element={<Add_Project />}></Route>
						<Route path="/dashboard/add_staff" element={<Add_Staff />}></Route>
						<Route path="/dashboard/add_task" element={<Add_Task />}></Route>
					</Route>
					<Route path="/task_detail/:id" element={<Task_Detail />}></Route>
					<Route path="/documents/:id" element={<TextEditor />}></Route>
					TODO: show a list of documents and a button to create a new document
					<Route path="/documents" element={<Document />}></Route>
					<Route path="*" element={<Page_Not_Exist />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
