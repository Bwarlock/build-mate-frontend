import axios from "axios";
import { BASE_URL } from "./api";

export const axiosInstance = axios.create({
	baseURL: BASE_URL, // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
	(config) => {
		// Get the token from cookies or wherever you store it

		// Add the token to the headers

		config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	}
);
