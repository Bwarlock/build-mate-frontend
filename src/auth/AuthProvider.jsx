import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	//Auth Token and User Storing Component
	const [user, setUser] = useState(
		() => JSON.parse(localStorage.getItem("user")) || ""
	);
	const [token, setToken] = useState(() => localStorage.getItem("token") || "");

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
	}, [user, token]);
	const login = (token, user) => {
		setToken(token);
		setUser(user);
	};

	const logout = () => {
		setUser("");
		setToken("");
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
AuthProvider.propTypes = {
	children: PropTypes.node.isRequired, // Validate children prop
};

export const useAuth = () => {
	//Auth Context Porvider
	return useContext(AuthContext);
};
