import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Project from "./components/Project";
import Add_Project from "./components/Add_Project";
import { AuthProvider } from "./auth/AuthProvider";
import Add_Staff from "./components/Add_Staff";
import Dashboard from "./components/Dashboard";
import Staff from "./components/Staff";
import Tasks from "./components/Tasks";
import Add_Task from "./components/Add_Task";
import LandingPage from "./components/LandingPage";
import "./custom.less";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/dashboard" element={<Dashboard />}>
						<Route path="/dashboard/project" element={<Project />}></Route>
						<Route path="/dashboard/staff" element={<Staff />}></Route>
						<Route path="/dashboard/tasks" element={<Tasks />}></Route>
						<Route
							path="/dashboard/add_project"
							element={<Add_Project />}></Route>
						<Route path="/dashboard/add_staff" element={<Add_Staff />}></Route>
						<Route path="/dashboard/add_task" element={<Add_Task />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
