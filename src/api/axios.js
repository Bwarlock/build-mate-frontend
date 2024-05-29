import { message } from "antd";
import axios from "axios";

// const BASE_URL = "http://localhost:8000/api";
// const BASE_URL = "https://948d-38-183-42-140.ngrok-free.app/api";
const BASE_URL = "https://api.build-mate.in/api";

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

AuthAxiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		// Incase 401 Unauthorized , move the user to /login , clear localstorage
		if (error.response && error.response.status === 401) {
			// message.error(error.message);
			localStorage.clear();
			setTimeout(() => {
				window.location = "/login";
			}, 5000);
		}
		console.log(error);
		return Promise.reject(error);
	}
);
