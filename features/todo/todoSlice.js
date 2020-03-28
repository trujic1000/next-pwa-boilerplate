import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

const createRandomId = () =>
	Math.random()
		.toString(36)
		.substring(2);

const todo = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: {
			reducer(state, action) {
				const { id, text } = action.payload;
				state.push({ id, text, completed: false });
			},
			prepare({ text }) {
				return {
					payload: {
						id: createRandomId(),
						text
					}
				};
			}
		},
		updateTodo: (state, action) => {
			const todo = state.find(todo => todo.id === action.payload.id);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},
		deleteTodo: (state, action) => {
			const todoIndex = state.findIndex(todo => todo.id === action.payload.id);
			state.splice(todoIndex, 1);
		}
	}
});

export const { addTodo, updateTodo, deleteTodo } = todo.actions;
export default todo.reducer;
