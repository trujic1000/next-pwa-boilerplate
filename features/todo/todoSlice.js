import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	todos: []
};

const createRandomId = () =>
	Math.random()
		.toString(36)
		.substring(2);

const todo = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				id: createRandomId(),
				text: action.payload.text,
				completed: false
			};
			state.todos.push(todo);
		},
		updateTodo: (state, action) => {
			const todoIndex = state.todos.findIndex(
				({ id }) => id === action.payload.id
			);
			state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
		},
		deleteTodo: (state, action) => {
			state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
		}
	}
});

export const { addTodo, updateTodo, deleteTodo } = todo.actions;
export default todo.reducer;
