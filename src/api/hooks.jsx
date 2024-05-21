import { useNavigate } from "react-router-dom";
import {
	Login,
	Register,
	GetClients,
	CreateClient,
	GetStaff,
	GetTask,
	GetProject,
	CreateStaff,
	CreateTask,
	CreateProject,
	GetDocument,
	GetDocuments,
	CreateDocument,
	CheckDomain,
} from "./api";
import { useDispatch, useSelector } from "react-redux";
import { clearGlobal, storeUser } from "../store/globalSlice";
import { message } from "antd";
import {
	clearClient,
	storeClientSelect,
	storeClientTable,
} from "../store/clientSlice";
import {
	clearStaff,
	storeStaffSelect,
	storeStaffTable,
} from "../store/staffSlice";
import {
	clearTask,
	storeTaskSelect,
	storeTaskTable,
	taskLoading,
} from "../store/taskSlice";
import {
	clearProject,
	storeProjectSelect,
	storeProjectTable,
} from "../store/projectSlice";

// Api Hooks For Redirect and Other React Logic

export const useLogin = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function login(data) {
		Login.v1(data)
			.then((res) => {
				console.log(res);
				// TODO:check if the domain is correct
				dispatch(storeUser(res.data.user)); // Storing User in Redux-persist LocalStorage
				localStorage.setItem("token", res.data.token); // Storing Token Myself
				navigate("/dashboard");
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	return login;
};

export const useLogout = () => {
	const dispatch = useDispatch();
	function logout() {
		dispatch(clearGlobal());
		dispatch(clearClient());
		dispatch(clearStaff());
		dispatch(clearTask());
		dispatch(clearProject());
		localStorage.clear();
	}
	return logout;
};

export const useCheckLogin = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.global);

	function checkLogin(TrueRedirect, FalseRedirect) {
		if (Object.keys(user).length && TrueRedirect) {
			navigate(TrueRedirect);
		} else if (!Object.keys(user).length && FalseRedirect) {
			navigate(FalseRedirect);
		}
	}
	return checkLogin;
};

export const useRegister = () => {
	// const navigate = useNavigate();
	// const dispatch = useDispatch();

	function register(data) {
		Register.v1(data)
			.then((res) => {
				console.log(res);
				message.success("Registration Successful! Please Login");
				// dispatch(storeUser(res.data.user)); // Storing User in Redux-persist LocalStorage
				// localStorage.setItem("token", res.data.token); // Storing Token Myself
				// Navigate the user to correct domain after successful registration
				const domain = res.data.user.domainName;
				const redirectUrl = `http://${domain}.build-mate.in/dashboard`;
				window.location = redirectUrl;
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	return register;
};

export const useGetData = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function getClients(params) {
		GetClients.v1(params)
			.then((res) => {
				console.log(res);
				dispatch(
					storeClientTable(
						res.data.clientData.map((val, index) => {
							return { ...val, key: "" + index };
						})
					)
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	function selectClients(params) {
		GetClients.v1(params)
			.then((res) => {
				console.log(res);
				dispatch(
					storeClientSelect(
						res.data.clientData.map((val) => {
							return {
								label: val.name,
								value: val._id,
							};
						})
					)
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	function getStaff(params) {
		GetStaff.v1(params)
			.then((res) => {
				console.log(res);
				dispatch(
					storeStaffTable(
						res.data.staffData.map((val, index) => {
							return { ...val, key: "" + index };
						})
					)
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	function selectStaff(params) {
		GetStaff.v1(params)
			.then((res) => {
				console.log(res);
				dispatch(
					storeStaffSelect(
						res.data.staffData.map((val) => {
							return {
								label: val.name,
								value: val._id,
							};
						})
					)
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	function getTasks(params) {
		dispatch(taskLoading(true));
		GetTask.v1(params)
			.then((res) => {
				console.log(res);
				dispatch(
					storeTaskTable(
						res.data.tasks.map((val, index) => {
							return { ...val, key: "" + index, id: val._id };
						})
					)
				);
				dispatch(taskLoading(false));
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
				dispatch(taskLoading(false));
			});
	}
	function selectTasks(params) {
		GetTask.v1(params)
			.then((res) => {
				console.log(res);
				dispatch(
					storeTaskSelect(
						res.data.tasks.map((val) => {
							return {
								label: val.name,
								value: val._id,
							};
						})
					)
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	function getProjects(params) {
		GetProject.v1(params)
			.then((res) => {
				console.log(res);
				dispatch(
					storeProjectTable(
						res.data.projects.map((val, index) => {
							return { ...val, key: "" + index };
						})
					)
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	function selectProjects(params) {
		GetProject.v1(params)
			.then((res) => {
				console.log(res);
				dispatch(
					storeProjectSelect(
						res.data.projects.map((val) => {
							return {
								label: val.name,
								value: val._id,
							};
						})
					)
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}

	function getDocument(id) {
		GetDocument.v1(id)
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				// Navigate to documents page if the document is not found
				navigate("/documents");
				message.error(e.response.data.message);
			});
	}

	function getDocuments(id) {
		GetDocuments.v1(id)
			.then((res) => {
				console.log(res);
				// TODO: store the documents in redux
			})
			.catch((e) => {
				message.error(e.response.data.message);
			});
	}

	// This function will be used on the login page to check if the domain is active or if it exists
	function checkDomain() {
		CheckDomain.v1()
			.then((res) => {
				console.log(res);
				// if the domain is valid then check if the domain is on hold
				if (res.data.domain.isOnHold)
					message.error(
						"Services are on hold. Please contact the admin. If you are admin please contact support."
					);
			})
			.catch((e) => {
				// If domain is not valid then show the error and redirect to the register page after 5 seconds
				message.error(e.response.data.message);
				// redirect to "https://cloud.build-mate.in/register" after 5 seconds
				setTimeout(() => {
					window.location = "https://cloud.build-mate.in/register";
				}, 5000);
			});
	}

	return {
		getClients,
		selectClients,
		getStaff,
		selectStaff,
		getTasks,
		selectTasks,
		getProjects,
		selectProjects,
		getDocument,
		getDocuments,
		checkDomain,
	};
};

export const useAddData = () => {
	const navigate = useNavigate();
	const {
		getClients,
		selectClients,
		getStaff,
		selectStaff,
		getTasks,
		selectTasks,
		getProjects,
		selectProjects,
	} = useGetData();

	function addClient(data) {
		CreateClient.v1(data)
			.then((res) => {
				console.log(res);
				message.success(res.data.message);
				getClients({ page: 1, limit: 10 });
				selectClients({ page: 1, limit: 10 });
				navigate("/dashboard/clients");
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	function addStaff(data) {
		CreateStaff.v1(data)
			.then((res) => {
				message.success(res.data.message);
				getStaff({ page: 1, limit: 10 });
				selectStaff({ page: 1, limit: 10 });
				navigate("/dashboard/staff");
			})
			.catch((e) => {
				message.error(e.response.data.message);
			});
	}
	function addTask(data) {
		CreateTask.v1(data)
			.then((res) => {
				message.success(res.data.message);
				getTasks({ page: 1, limit: 10 });
				selectTasks({ page: 1, limit: 10 });
				navigate("/dashboard/tasks");
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	function addProject(data) {
		CreateProject.v1(data)
			.then((res) => {
				message.success(res.data.message);
				getProjects({ page: 1, limit: 10 });
				selectProjects({ page: 1, limit: 10 });
				navigate("/dashboard/project");
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	function addDocument(data) {
		CreateDocument.v1(data)
			.then((res) => {
				message.success(res.data.message);
				const documentID = res.data.document._id;
				// Update the list of documents
				navigate(`/documents/${documentID}`);
			})
			.catch((e) => {
				console.log(e);
				message.error(e.response.data.message);
			});
	}
	return { addClient, addStaff, addTask, addProject, addDocument };
};
