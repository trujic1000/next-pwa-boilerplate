import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Todo from "./Todo";
import { addTodo } from "~/features/todo/todoSlice";

const Form = styled.form`
	border: 1px solid #eef6ff;
	padding: 20px;
	margin-bottom: 20px;

	h1 {
		font-size: 24px;
		font-weight: bold;
		margin: 5px 0;
	}

	p {
		margin: 5px 0 10px 0;
	}

	input {
		padding: 5px;
		border: 1px solid #eef6ff;
		margin: 0 10px;
		outline: none;
	}

	button {
		padding: 5px 7px;
		cursor: pointer;
		background: ${props => props.theme.colors.primary};
		outline: none;
		border: 1px solid ${props => props.theme.colors.primary};
		color: ${props => props.theme.colors.secondary};
		transition: opacity 150ms linear;
		&:hover {
			opacity: 0.8;
		}
	}
`;

const TodoList = () => {
	const [text, setText] = useState("");
	const todos = useSelector(state => state.todos);
	const dispatch = useDispatch();

	const onClick = e => {
		e.preventDefault();
		dispatch(addTodo({ text }));
		setText("");
	};

	return (
		<>
			<Form>
				<h1>Welcome!</h1>
				<p>To get started, tell us what you want to do today:</p>
				<input
					type="text"
					placeholder="I want to do..."
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<button onClick={onClick}>Add Todo</button>
			</Form>
			<ul>
				{todos.map(todo => (
					<Todo key={todo.id} todo={todo} />
				))}
			</ul>
		</>
	);
};

export default TodoList;
