import { AuthAxiosInstance, LoginAxiosInstance } from "./axios";

// Api Endpoints

export function Login(data) {
	return Login.v1(data);
}

Login.v1 = function v1(data) {
	return LoginAxiosInstance({
		method: "post",
		url: "/user/login",
		data: data,
	});
};

export function Register(data) {
	return Register.v1(data);
}

Register.v1 = function v1(data) {
	return LoginAxiosInstance({
		method: "post",
		url: "/register/register-owner",
		data: data,
	});
};

export function CreateClient(data) {
	return CreateClient.v1(data);
}

CreateClient.v1 = function v1(data) {
	return AuthAxiosInstance({
		method: "post",
		// url: `/test/file-upload`,
		url: `/client/create-client`,
		data: data,
	});
};

export function GetClients(params) {
	return GetClients.v1(params);
}

GetClients.v1 = function v1(params) {
	return AuthAxiosInstance({
		method: "get",
		url: `/client/get-clients`,
		params: params,
	});
};

export function CreateStaff(data) {
	return CreateStaff.v1(data);
}

CreateStaff.v1 = function v1(data) {
	return AuthAxiosInstance({
		method: "post",
		url: `/staff/create-staff`,
		data: data,
	});
};

export function GetStaff(params) {
	return GetStaff.v1(params);
}

GetStaff.v1 = function v1(params) {
	return AuthAxiosInstance({
		method: "get",
		url: `/staff/get-staff`,
		params: params,
	});
};

export function CreateTask(data) {
	return CreateTask.v1(data);
}

CreateTask.v1 = function v1(data) {
	return AuthAxiosInstance({
		method: "post",
		url: `/task/create-task`,
		data: data,
	});
};

export function GetTask(params) {
	return GetTask.v1(params);
}

// Gets all tasks: assigned to the user,as well as created by the user
GetTask.v1 = function v1(params) {
	return AuthAxiosInstance({
		method: "get",
		url: `/task/all-tasks`,
		params: params,
	});
};

export function UpdateTask(id) {
	return UpdateTask.v1(id);
}

UpdateTask.v1 = function v1(id, data) {
	return AuthAxiosInstance({
		method: "put",
		url: `/task/update-task/${id}`,
		data: data,
	});
};

export function DeleteTask(id) {
	return DeleteTask.v1(id);
}

DeleteTask.v1 = function v1(id) {
	return AuthAxiosInstance({
		method: "delete",
		url: `/task/delete-task/${id}`,
	});
};

export function CreateProject(data) {
	return CreateProject.v1(data);
}

CreateProject.v1 = function v1(data) {
	return AuthAxiosInstance({
		method: "post",
		url: `/project/create-project`,
		data: data,
	});
};

export function GetProject(params) {
	return GetProject.v1(params);
}

GetProject.v1 = function v1(params) {
	return AuthAxiosInstance({
		method: "get",
		url: `/project/get-projects`,
		params: params,
	});
};

export function CreateDocument(data) {
	return CreateDocument.v1(data);
}

CreateDocument.v1 = function v1(data) {
	return AuthAxiosInstance({
		method: "post",
		url: `/document/create`,
		data: data,
	});
};

export function GetDocument(id) {
	return GetDocument.v1(id);
}

GetDocument.v1 = function v1(id) {
	return AuthAxiosInstance({
		method: "get",
		url: `/document/${id}`,
	});
};

export function GetDocuments(id) {
	return GetDocuments.v1(id);
}

GetDocuments.v1 = function v1() {
	return AuthAxiosInstance({
		method: "get",
		url: `/documents`,
	});
};

// Check if a domain is active, to be used on login page, before rendering the login form
export function CheckDomain(id) {
	return CheckDomain.v1(id);
}

CheckDomain.v1 = function v1(params) {
	return AuthAxiosInstance({
		method: "get",
		url: `/domain/is-domain-active`,
		params: params,
	});
};
