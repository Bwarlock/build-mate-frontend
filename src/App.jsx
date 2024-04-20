import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Project from "./components/Project";
import Add_Project from "./components/Add_Project";
import { AuthProvider } from "./auth/AuthProvider";
import Add_Staff from "./components/Add_Staff";
import Dashboard from "./components/Dashboard";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/project" element={<Project />}></Route>
					<Route path="/add_project" element={<Add_Project />}></Route>
					<Route path="/add_staff" element={<Add_Staff />}></Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
