const { resolve } = require("path");
const isProd = process.env.NODE_ENV === "production";
/** @type {import("webpack").Configuration} */
module.exports = {
	mode: isProd ? "production" : "development",
	experiments: {
		rspackFuture: {
			disableTransformByDefault: true
		}
	},
	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.(js|jsx)$/,
						use: {
							loader: "builtin:swc-loader",
							options: {
								sourceMap: true,
								jsc: {
									parser: {
										syntax: "ecmascript",
										jsx: true
									},
									transform: {
										react: {
											development: !isProd,
											refresh: !isProd,
										}
									}
								}
							}
						}
					},
					{
						test: /\.ts$/,
						use: {
							loader: "builtin:swc-loader",
							options: {
								sourceMap: true,
								jsc: {
									parser: {
										syntax: "typescript",
									},
									transform: {
										react: {
											runtime: "automatic",
											development: !isProd,
											refresh: !isProd,
										}
									}
								}
							}
						}
					}
				]
			}

		]
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			"@internal": resolve(__dirname, "src/rome/internal"),
			// rome: resolve(__dirname, "src/rome/internal/virtual-packages/rome"),
		},
	},
	devtool: isProd && "source-map",
	output: {},
	entry: {
		"main": resolve(__dirname, "./src/index.js")
	},
	builtins: { treeShaking: isProd, progress: {}, minify: isProd },
	stats: {
		warnings: false,
	},
	optimization: {
	}
};
