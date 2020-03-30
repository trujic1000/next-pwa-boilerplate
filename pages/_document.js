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
					<link rel="icon" href="/img/favicon.ico" />
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
	const sheets = new ServerStyleSheet();
	// Render app and page and get the context of the page with collected side effects.
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: App => props => sheets.collectStyles(<App {...props} />)
		});

	const initialProps = await Document.getInitialProps(ctx);
	return {
		...initialProps,
		styles: [
			...React.Children.toArray(initialProps.styles),
			sheets.getStyleElement()
		]
	};
};
export default MyDocument;
