import React from "react";
import styled from "styled-components";
import TodoList from "../features/todo/TodoList";

const Wrapper = styled.div`
	margin: auto;
	max-width: 400px;
	margin-top: 100px;
	text-align: center;
`;

const Index = () => (
	<Wrapper>
		<main>
			<TodoList />
		</main>
	</Wrapper>
);

Index.getInitialProps = async () => {};

export default Index;
