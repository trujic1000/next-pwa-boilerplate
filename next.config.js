const path = require("path");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withOffline = require("next-offline");

const nextConfig = {
	webpack: (config) => {
		config.resolve.alias["~"] = path.resolve(__dirname);
		return config;
	},
	publicRuntimeConfig: {
		BASE_URL: "YOUR_BASE_URL_GOES_HERE",
	},
	workboxOpts: {
		swDest: "service-worker.js",
		runtimeCaching: [
			{
				urlPattern: /[.](png|jpg|ico|css)/,
				handler: "CacheFirst",
				options: {
					cacheName: "assets-cache",
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
			{
				urlPattern: /^https:\/\/code\.getmdl\.io.*/,
				handler: "CacheFirst",
				options: {
					cacheName: "lib-cache",
				},
			},
			{
				urlPattern: /^http.*/,
				handler: "NetworkFirst",
				options: {
					cacheName: "http-cache",
				},
			},
		],
	},
};

module.exports = withPlugins([[withOffline], [withImages]], nextConfig);
