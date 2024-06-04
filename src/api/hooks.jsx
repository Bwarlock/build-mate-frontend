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
	DeleteTask,
	UpdateTask,
	DeleteProject,
	GetTrashTask,
	GetTrashProject,
	UpdateProject,
	RestoreTask,
	RestoreProject,
} from "./api";
import { useDispatch, useSelector } from "react-redux";
import { clearGlobal, storeUser } from "../store/globalSlice";
import { message } from "antd";
import {
	clearClient,
	clientLoading,
	setClientSelectParams,
	setClientTableParams,
	setClientTotal,
	storeClientSelect,
	storeClientTable,
} from "../store/clientSlice";
import {
	clearStaff,
	setStaffSelectParams,
	setStaffTableParams,
	setStaffTotal,
	staffLoading,
	storeStaffSelect,
	storeStaffTable,
} from "../store/staffSlice";
import {
	clearTask,
	deleteTaskStore,
	restoreTaskStore,
	setTaskSelectParams,
	setTaskTableParams,
	setTaskTotal,
	setTaskTrashParams,
	setTaskTrashTotal,
	storeTaskSelect,
	storeTaskTable,
	storeTaskTrash,
	taskLoading,
	updateTaskStore,
} from "../store/taskSlice";
import {
	clearProject,
	deleteProjectStore,
	projectLoading,
	restoreProjectStore,
	setProjectSelectParams,
	setProjectTableParams,
	setProjectTotal,
	setProjectTrashParams,
	setProjectTrashTotal,
	storeProjectSelect,
	storeProjectTable,
	storeProjectTrash,
	updateProjectStore,
} from "../store/projectSlice";

// Api Hooks For Redirect and Other React Logic

export const useLogin = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function login(data) {
		Login.v1(data)
			.then((res) => {
				// TODO:check if the domain is correct
				dispatch(storeUser(res.data.user)); // Storing User in Redux-persist LocalStorage
				localStorage.setItem("token", res.data.token); // Storing Token Myself
				navigate("/dashboard");
			})
			.catch((e) => {
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
	const logout = useLogout();
	const token = localStorage.getItem("token") || "";

	function checkLogin(TrueRedirect, FalseRedirect) {
		if (Object.keys(user).length && token && TrueRedirect) {
			navigate(TrueRedirect);
		} else if ((!Object.keys(user).length || !token) && FalseRedirect) {
			navigate(FalseRedirect);
		} else if (!token) {
			logout();
			navigate("/login");
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
	const {
		selectParams: projectSelectParams,
		tableParams: projectTableParams,
		trashParams: projectTrashParams,
	} = useSelector((state) => state.project);
	const { selectParams: staffSelectParams, tableParams: staffTableParams } =
		useSelector((state) => state.staff);
	const { selectParams: clientSelectParams, tableParams: clientTableParams } =
		useSelector((state) => state.client);
	const {
		selectParams: taskSelectParams,
		tableParams: taskTableParams,
		trashParams: taskTrashParams,
	} = useSelector((state) => state.task);

	function getClients(params, filters) {
		dispatch(clientLoading(true));
		if (params) {
			dispatch(setClientTableParams(filters));
		} else {
			params = {
				page: clientTableParams[0].pagination.current,
				limit: clientTableParams[0].pagination.pageSize,
			};
		}
		GetClients.v1(params)
			.then((res) => {
				if (res?.data?.clientData?.length ?? null) {
					dispatch(
						storeClientTable(
							res.data.clientData.map((val, index) => {
								return { ...val, key: "" + index, id: val._id };
							})
						)
					);
					dispatch(setClientTotal(res.data?.totalClients ?? 200));
				} else {
					dispatch(storeClientTable([]));
				}
				dispatch(clientLoading(false));
			})
			.catch((e) => {
				dispatch(clientLoading(false));

				message.error(
					e.response?.data?.message ||
						"There was an error while fetching the client data. Please try again or contact support."
				);
			});
	}
	function selectClients(params) {
		dispatch(clientLoading(true));
		if (params) {
			dispatch(
				setClientSelectParams({
					...clientSelectParams[0],
					pagination: {
						...clientSelectParams[0].pagination,
						current: params.page,
						pageSize: params.limit,
					},
				})
			);
		} else {
			params = {
				page: clientSelectParams[0].pagination.current,
				limit: clientSelectParams[0].pagination.pageSize,
			};
		}
		GetClients.v1(params)
			.then((res) => {
				if (res?.data?.clientData?.length ?? null) {
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
					dispatch(setClientTotal(res.data?.totalClients ?? 200));
				} else {
					dispatch(storeClientSelect([]));
				}
				dispatch(clientLoading(false));
			})
			.catch((e) => {
				dispatch(clientLoading(false));
				message.error(
					e.response.data.message ||
						"There was an error while fetching the data."
				);
			});
	}
	function getStaff(params, filters) {
		dispatch(staffLoading(true));
		if (params) {
			dispatch(setStaffTableParams(filters));
		} else {
			params = {
				page: staffTableParams[0].pagination.current,
				limit: staffTableParams[0].pagination.pageSize,
			};
		}
		GetStaff.v1(params)
			.then((res) => {
				if (res?.data?.staffData?.length ?? null) {
					dispatch(
						storeStaffTable(
							res.data.staffData.map((val, index) => {
								return { ...val, key: "" + index, id: val._id };
							})
						)
					);
					dispatch(setStaffTotal(res.data?.totalStaff ?? 200));
				} else {
					dispatch(storeStaffTable([]));
				}
				dispatch(staffLoading(false));
			})
			.catch((e) => {
				dispatch(staffLoading(false));
				message.error(
					e.response.data.message ||
						"There was an error while fetching the staff data. Please try again or contact support."
				);
			});
	}
	function selectStaff(params) {
		dispatch(staffLoading(true));
		if (params) {
			dispatch(
				setStaffSelectParams({
					...staffSelectParams[0],
					pagination: {
						...staffSelectParams[0].pagination,
						current: params.page,
						pageSize: params.limit,
					},
				})
			);
		} else {
			params = {
				page: staffSelectParams[0].pagination.current,
				limit: staffSelectParams[0].pagination.pageSize,
			};
		}
		GetStaff.v1(params)
			.then((res) => {
				if (res?.data?.staffData?.length ?? null) {
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
					dispatch(setStaffTotal(res.data?.totalStaff ?? 200));
				} else {
					dispatch(storeStaffSelect([]));
				}
				dispatch(staffLoading(false));
			})
			.catch((e) => {
				dispatch(staffLoading(false));
				message.error(
					e.response.data.message ||
						"There was an error while fetching the data."
				);
			});
	}
	function getTasks(params, filters) {
		dispatch(taskLoading(true));
		if (params) {
			dispatch(setTaskTableParams(filters));
		} else {
			params = {
				page: taskTableParams[0].pagination.current,
				limit: taskTableParams[0].pagination.pageSize,
			};
		}
		GetTask.v1(params)
			.then((res) => {
				if (res?.data?.tasks?.length ?? null) {
					dispatch(
						storeTaskTable(
							res.data.tasks.map((val, index) => {
								return {
									...val,
									key: "" + index,
									id: val.task_id,
								};
							})
						)
					);
					dispatch(setTaskTotal(res.data?.totalTasks ?? 200));
				} else {
					dispatch(storeTaskTable([]));
				}
				dispatch(taskLoading(false));
			})
			.catch((e) => {
				dispatch(taskLoading(false));
				message.error(
					e.response.data.message ||
						"There was an error while fetching the tasks. Please try again or contact support."
				);
			});
	}
	function getTrashTasks(params, filters) {
		dispatch(taskLoading(true));
		if (params) {
			dispatch(setTaskTrashParams(filters));
		} else {
			params = {
				page: taskTrashParams[0].pagination.current,
				limit: taskTrashParams[0].pagination.pageSize,
			};
		}
		GetTrashTask.v1(params)
			.then((res) => {
				if (res?.data?.tasks?.length ?? null) {
					dispatch(
						storeTaskTrash(
							res.data.tasks.map((val, index) => {
								return {
									...val,
									key: "" + index,
									id: val.task_id,
								};
							})
						)
					);
					dispatch(setTaskTrashTotal(res.data?.totalTrashTasks ?? 200));
				} else {
					dispatch(storeTaskTrash([]));
				}
				dispatch(taskLoading(false));
			})
			.catch((e) => {
				dispatch(taskLoading(false));
				message.error(
					e.response.data.message ||
						"There was an error while fetching the tasks. Please try again or contact support."
				);
			});
	}
	function selectTasks(params) {
		dispatch(taskLoading(true));
		if (params) {
			dispatch(
				setTaskSelectParams({
					...taskSelectParams[0],
					pagination: {
						...taskSelectParams[0].pagination,
						current: params.page,
						pageSize: params.limit,
					},
				})
			);
		} else {
			params = {
				page: taskSelectParams[0].pagination.current,
				limit: taskSelectParams[0].pagination.pageSize,
			};
		}
		GetTask.v1(params)
			.then((res) => {
				if (res?.data?.tasks?.length ?? null) {
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
					dispatch(setTaskTotal(res.data?.totalTasks ?? 200));
				} else {
					dispatch(storeTaskSelect([]));
				}
				dispatch(taskLoading(false));
			})
			.catch((e) => {
				dispatch(taskLoading(false));
				message.error(
					e.response.data.message ||
						"There was an error while fetching the data."
				);
			});
	}

	function getProjects(params, filters) {
		dispatch(projectLoading(true));
		if (params) {
			dispatch(setProjectTableParams(filters));
		} else {
			params = {
				page: projectTableParams[0].pagination.current,
				limit: projectTableParams[0].pagination.pageSize,
			};
		}
		GetProject.v1(params)
			.then((res) => {
				if (res?.data?.projects?.length ?? null) {
					dispatch(
						storeProjectTable(
							res.data.projects.map((val, index) => {
								return { ...val, key: "" + index, id: val.project_id };
							})
						)
					);
					dispatch(setProjectTotal(res.data?.totalProjects ?? 200));
				} else {
					dispatch(storeProjectTable([]));
				}
				dispatch(projectLoading(false));
			})
			.catch((e) => {
				dispatch(projectLoading(false));
				message.error(
					e.response.data.message ||
						"There was an error while fetching the projects. Please try again or contact support."
				);
			});
	}
	function getTrashProjects(params, filters) {
		dispatch(projectLoading(true));
		if (params) {
			dispatch(setProjectTrashParams(filters));
		} else {
			params = {
				page: projectTrashParams[0].pagination.current,
				limit: projectTrashParams[0].pagination.pageSize,
			};
		}
		GetTrashProject.v1(params)
			.then((res) => {
				if (res?.data?.projects?.length ?? null) {
					dispatch(
						storeProjectTrash(
							res.data.projects.map((val, index) => {
								return { ...val, key: "" + index, id: val.project_id };
							})
						)
					);
					dispatch(setProjectTrashTotal(res.data?.totalTrashProjects ?? 200));
				} else {
					dispatch(storeProjectTrash([]));
				}
				dispatch(projectLoading(false));
			})
			.catch((e) => {
				dispatch(projectLoading(false));
				message.error(
					e.response.data.message ||
						"There was an error while fetching the projects. Please try again or contact support."
				);
			});
	}
	function selectProjects(params) {
		dispatch(projectLoading(true));
		if (params) {
			dispatch(
				setProjectSelectParams({
					...projectSelectParams[0],
					pagination: {
						...projectSelectParams[0].pagination,
						current: params.page,
						pageSize: params.limit,
					},
				})
			);
		} else {
			params = {
				page: projectSelectParams[0].pagination.current,
				limit: projectSelectParams[0].pagination.pageSize,
			};
		}
		GetProject.v1(params)
			.then((res) => {
				if (res?.data?.projects?.length ?? null) {
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
					dispatch(setProjectTotal(res.data?.totalProjects ?? 200));
				} else {
					dispatch(storeProjectSelect([]));
				}
				dispatch(projectLoading(false));
			})
			.catch((e) => {
				dispatch(projectLoading(false));
				message.error(
					e.response?.data?.message ||
						"There was an error while fetching the data."
				);
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
				message.error(e.message);
			});
	}

	function getDocuments(id) {
		GetDocuments.v1(id)
			.then((res) => {
				console.log(res);
				// TODO: store the documents in redux
			})
			.catch((e) => {
				message.error(e.message);
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
		getTrashTasks,
		selectTasks,
		getProjects,
		getTrashProjects,
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
	const { tableParams: taskTableParams } = useSelector((state) => state.task);
	const { tableParams: clientTableParams } = useSelector(
		(state) => state.client
	);
	const { tableParams: staffTableParams } = useSelector((state) => state.staff);
	const { tableParams: projectTableParams } = useSelector(
		(state) => state.project
	);

	function addClient(data) {
		CreateClient.v1(data)
			.then((res) => {
				getClients();
				selectClients();
				message.success(res.data.message);
				// navigate("/dashboard/clients");
			})
			.catch((e) => {
				message.error(e.response.data.message);
			});
	}
	function addStaff(data) {
		CreateStaff.v1(data)
			.then((res) => {
				getStaff();
				selectStaff();
				message.success(res.data.message);
				// navigate("/dashboard/staff");
			})
			.catch((e) => {
				message.error(e.response.data.message);
			});
	}
	function addTask(data) {
		CreateTask.v1(data)
			.then((res) => {
				getTasks();
				selectTasks();
				message.success(res.data.message);
				// navigate("/dashboard/tasks");
			})
			.catch((e) => {
				message.error(e.response.data.message);
			});
	}

	function addProject(data) {
		CreateProject.v1(data)
			.then((res) => {
				getProjects();
				selectProjects();
				message.success(res.data.message);
				// navigate("/dashboard/project");
			})
			.catch((e) => {
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
				message.error(e.response.data.message);
			});
	}
	return { addClient, addStaff, addTask, addProject, addDocument };
};

export const useDeleteData = () => {
	const dispatch = useDispatch();
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
	const { tableParams: taskTableParams } = useSelector((state) => state.task);
	const { getTrashProjects, getTrashTasks } = useGetData();

	function deleteTask(id) {
		dispatch(taskLoading(true));
		DeleteTask.v1(id)
			.then((res) => {
				dispatch(deleteTaskStore(id));
				dispatch(taskLoading(false));
				// getTrashTasks();
				message.success(res?.data?.message ?? "Task Deleted ?");
			})
			.catch((e) => {
				dispatch(taskLoading(false));
				message.error(
					e.response?.data?.message ||
						"There was an error while Deleting the Task"
				);
			});
	}
	function deleteProject(id) {
		dispatch(projectLoading(true));
		DeleteProject.v1(id)
			.then((res) => {
				dispatch(deleteProjectStore(id));
				dispatch(projectLoading(false));
				// getTrashProjects();
				message.success(res?.data?.message ?? "Project Deleted ?");
			})
			.catch((e) => {
				dispatch(projectLoading(false));
				message.error(
					e.response?.data?.message ||
						"There was an error while Deleting the Project"
				);
			});
	}
	return { deleteTask, deleteProject };
};

export const useUpdateData = () => {
	const dispatch = useDispatch();
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
	const { tableParams: taskTableParams } = useSelector((state) => state.task);

	function updateTask(id, data) {
		UpdateTask.v1(id, data)
			.then((res) => {
				// console.log(res.data);
				// dispatch(updateTaskStore(data));
				message.success(res?.data?.message ?? "Task Updated Successfully ?");
				getTasks();
			})
			.catch((e) => {
				message.error(
					e.response.data.message ||
						"There was an error while Updating the Task"
				);
			});
	}

	function restoreTask(id, data) {
		RestoreTask.v1(id, data)
			.then((res) => {
				// console.log(res.data);
				dispatch(restoreTaskStore(id));
				message.success(res?.data?.message ?? "Task Restored Successfully ?");
			})
			.catch((e) => {
				message.error(
					e.response.data.message ||
						"There was an error while Updating the Task"
				);
			});
	}

	function updateProject(id, data) {
		UpdateProject.v1(id, data)
			.then((res) => {
				// console.log(res.data);
				// dispatch(updateProjectStore(data));
				message.success(res?.data?.message ?? "Project Updated Successfully ?");
				getProjects();
			})
			.catch((e) => {
				message.error(
					e.response.data.message ||
						"There was an error while Updating the Task"
				);
			});
	}

	function restoreProject(id, data) {
		RestoreProject.v1(id, data)
			.then((res) => {
				// console.log(res.data);
				dispatch(restoreProjectStore(id));
				message.success(res?.data?.message ?? "Task Restored Successfully ?");
			})
			.catch((e) => {
				message.error(
					e.response.data.message ||
						"There was an error while Updating the Task"
				);
			});
	}
	return { updateTask, restoreTask, updateProject, restoreProject };
};
