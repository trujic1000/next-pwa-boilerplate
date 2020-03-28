import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";

export const initializeStore = () => {
	return configureStore({
		reducer: {
			todo: todoReducer
		}
	});
};
