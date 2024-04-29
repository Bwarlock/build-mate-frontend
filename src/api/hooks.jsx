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
import { clearTask, storeTaskSelect, storeTaskTable } from "../store/taskSlice";
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
				dispatch(storeUser(res.data.user)); // Storing User in Redux-persist LocalStorage
				localStorage.setItem("token", res.data.token); // Storing Token Myself
				navigate("/dashboard");
			})
			.catch((e) => {
				console.log(e);
				message.error(e.message);
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
		localStorage.removeItem("token");
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
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function register(data) {
		Register.v1(data)
			.then((res) => {
				console.log(res);
				message.success("User Registered!");
				dispatch(storeUser(res.data.user)); // Storing User in Redux-persist LocalStorage
				localStorage.setItem("token", res.data.token); // Storing Token Myself
				navigate("/dashboard");
			})
			.catch((e) => {
				console.log(e);
				message.error(e.message);
			});
	}
	return register;
};

export const useGetData = () => {
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
				message.error(e.message);
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
				message.error(e.message);
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
				message.error(e.message);
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
				message.error(e.message);
			});
	}
	function getTasks(params) {
		GetTask.v1(params)
			.then((res) => {
				console.log(res);
				dispatch(
					storeTaskTable(
						res.data.tasks.map((val, index) => {
							return { ...val, key: "" + index };
						})
					)
				);
			})
			.catch((e) => {
				console.log(e);
				message.error(e.message);
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
				message.error(e.message);
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
				message.error(e.message);
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
				message.error(e.message);
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
				message.success("Client Created!");
				getClients({ page: 1, limit: 10 });
				selectClients({ page: 1, limit: 10 });
				navigate("/dashboard/clients");
			})
			.catch((e) => {
				console.log(e);
				message.error(e.message);
			});
	}
	function addStaff(data) {
		CreateStaff.v1(data)
			.then((res) => {
				console.log(res);
				message.success("Staff Created!");
				getStaff({ page: 1, limit: 10 });
				selectStaff({ page: 1, limit: 10 });
				navigate("/dashboard/staff");
			})
			.catch((e) => {
				console.log(e);
				message.error(e.message);
			});
	}
	function addTask(data) {
		CreateTask.v1(data)
			.then((res) => {
				console.log(res);
				message.success("Task Created!");
				getTasks({ page: 1, limit: 10 });
				selectTasks({ page: 1, limit: 10 });
				navigate("/dashboard/tasks");
			})
			.catch((e) => {
				console.log(e);
				message.error(e.message);
			});
	}
	function addProject(data) {
		CreateProject.v1(data)
			.then((res) => {
				console.log(res);
				message.success("Task Created!");
				getProjects({ page: 1, limit: 10 });
				selectProjects({ page: 1, limit: 10 });
				navigate("/dashboard/project");
			})
			.catch((e) => {
				console.log(e);
				message.error(e.message);
			});
	}
	return { addClient, addStaff, addTask, addProject };
};
