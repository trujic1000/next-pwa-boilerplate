import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
	render() {
		return (
			<html lang="en-GB">
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<meta name="theme-color" content="#673ab7" />
					<meta
						name="Description"
						content="an example of NextJS app with 100% accessible lighthouse score"
					/>
					<link rel="manifest" href="/manifest.json" />
					<link rel="icon" href="static/img/favicon.ico" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

MyDocument.getInitialProps = async ctx => {
	const sheet = new ServerStyleSheet();
	// Render app and page and get the context of the page with collected side effects.
	const originalRenderPage = ctx.renderPage;

	try {
		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
			});

		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					{sheet.getStyleElement()}
				</>
			)
		};
	} finally {
		sheet.seal();
	}
};
export default MyDocument;
