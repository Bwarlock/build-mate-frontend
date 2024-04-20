import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

function ProtectedRoute() {
	const { user, token } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (!user && !token) {
			navigate("/login");
		}
	}, []);
	return <Outlet />;
}

export default ProtectedRoute;
