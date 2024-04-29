import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useCheckLogin } from "../api/hooks";

function ProtectedRoute() {
	const checkLogin = useCheckLogin();
	useEffect(() => {
		checkLogin(null, "/login");
	}, []);
	return <Outlet />;
}

export default ProtectedRoute;
