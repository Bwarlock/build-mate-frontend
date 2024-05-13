import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Project from "./components/Project";
import Add_Project from "./components/Add_Project";
import Add_Staff from "./components/Add_Staff";
import Dashboard from "./components/Dashboard";
import Staff from "./components/Staff";
import Tasks from "./components/Tasks";
import Add_Task from "./components/Add_Task";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Clients from "./components/Clients";
import Add_Client from "./components/Add_Client";
import Document from "./components/Documents";
import TextEditor from "./components/TextEditor";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />}>
						<Route path="/dashboard/project" element={<Project />}></Route>
						<Route path="/dashboard/staff" element={<Staff />}></Route>
						<Route path="/dashboard/tasks" element={<Tasks />}></Route>
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
					<Route path="/documents/:id" element={<TextEditor />} ></Route>
						TODO: show a list of documents and a button to create a new document
						<Route path="/documents" element={<Document />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
