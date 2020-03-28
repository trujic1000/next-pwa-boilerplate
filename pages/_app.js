import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import App from "next/app";
import reset from "styled-reset";
import { css, createGlobalStyle, ThemeProvider } from "styled-components";

import { initializeStore } from "../store";

const theme = {
	colors: {
		primary: "#F3E03A",
		secondary: "#1C1C1C",
		white: "#FFF"
	}
};

const fontFaces = css`
	@font-face {
		font-family: "Roboto";
		src: local("Roboto"), url("fonts/Roboto-Regular.woff") format("woff");
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: "Roboto";
		src: url("fonts/Roboto-Bold.woff") format("woff");
		font-weight: bold;
		font-style: normal;
	}
`;

const GlobalStyle = createGlobalStyle`
	${reset};
	${fontFaces};

	html {
		box-sizing: border-box;
	}

	*,
	*::before,
	*::after {
 		box-sizing: inherit;
	}

	html, body {
		height: 100%;
		background-color: ${props => props.theme.colors.secondary};
		color: ${props => props.theme.colors.primary};
	}

	body {
		line-height: 1.5;
		font-family: "Roboto", sans-serif;
	}
`;

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {})
			}
		};
	}

	componentDidMount() {
		if (process.env.NODE_ENV !== "production") {
			const axe = require("react-axe");
			axe(React, ReactDom, 1000);
		}
	}

	render() {
		const { Component, pageProps, store } = this.props;
		return (
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<Head>
						<title>Todo App</title>
					</Head>
					<GlobalStyle />
					<Component {...pageProps} />
				</Provider>
			</ThemeProvider>
		);
	}
}

export default withRedux(initializeStore)(MyApp);
