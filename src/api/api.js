import { AuthAxiosInstance, LoginAxiosInstance } from "./axios";

// Api Endpoints

export function Login(data) {
	return Login.v1(data);
}

Login.v1 = function v1(data) {
	return LoginAxiosInstance({
		method: "post",
		url: "/auth/login",
		data: data,
	});
};

export function Register(data) {
	return Register.v1(data);
}

Register.v1 = function v1(data) {
	return LoginAxiosInstance({
		method: "post",
		url: "/auth/register",
		data: data,
	});
};

export function CreateClient(data) {
	return CreateClient.v1(data);
}

CreateClient.v1 = function v1(data) {
	return AuthAxiosInstance({
		method: "post",
		url: `/owner/create-client`,
		data: data,
	});
};

export function GetClients(params) {
	return GetClients.v1(params);
}

GetClients.v1 = function v1(params) {
	return AuthAxiosInstance({
		method: "get",
		url: `/owner/get-clients`,
		params: params,
	});
};

export function CreateStaff(data) {
	return CreateStaff.v1(data);
}

CreateStaff.v1 = function v1(data) {
	return AuthAxiosInstance({
		method: "post",
		url: `/owner/create-staff`,
		data: data,
	});
};

export function GetStaff(params) {
	return GetStaff.v1(params);
}

GetStaff.v1 = function v1(params) {
	return AuthAxiosInstance({
		method: "get",
		url: `/owner/get-staff`,
		params: params,
	});
};

export function CreateTask(data) {
	return CreateTask.v1(data);
}

CreateTask.v1 = function v1(data) {
	return AuthAxiosInstance({
		method: "post",
		url: `/owner/create-task`,
		data: data,
	});
};

export function GetTask(params) {
	return GetTask.v1(params);
}

GetTask.v1 = function v1(params) {
	return AuthAxiosInstance({
		method: "get",
		url: `/owner/get-tasks`,
		params: params,
	});
};

export function CreateProject(data) {
	return CreateProject.v1(data);
}

CreateProject.v1 = function v1(data) {
	return AuthAxiosInstance({
		method: "post",
		url: `/owner/create-project`,
		data: data,
	});
};

export function GetProject(params) {
	return GetProject.v1(params);
}

GetProject.v1 = function v1(params) {
	return AuthAxiosInstance({
		method: "get",
		url: `/owner/get-projects`,
		params: params,
	});
};
