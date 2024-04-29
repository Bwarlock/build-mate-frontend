import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import storage from "redux-persist/lib/storage";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import clientReducer from "./clientSlice";
import staffReducer from "./staffSlice";
import taskReducer from "./taskSlice";
import projectReducer from "./projectSlice";

const persistConfig = {
	key: "root",
	storage,
};

// Combined Reducers
const rootReducer = combineReducers({
	global: globalReducer,
	client: clientReducer,
	staff: staffReducer,
	task: taskReducer,
	project: projectReducer,
});

// Store Definition
export const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
