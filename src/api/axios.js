import axios from "axios";

const BASE_URL = "http://localhost:8000/api";
// const BASE_URL = "https://api.build-mate.in/api";

export const BaseAxiosInstance = axios.create({
	baseURL: BASE_URL,
});

export const LoginAxiosInstance = axios.create({
	baseURL: BASE_URL,
	// withCredentials: true,
});

export const AuthAxiosInstance = axios.create({
	baseURL: BASE_URL,
	// withCredentials: true,
});
// TODO: add interceptors for 401 and remove token from local storage


AuthAxiosInstance.interceptors.request.use(
	(config) => {
		// Get the token from cookies or localStorage
		// Add the token to the headers
		// Switch to Cookie httpOnly and Secure When possible
		config.headers.Authorization = `Bearer ${
			localStorage.getItem("token") || ""
		}`;
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);
