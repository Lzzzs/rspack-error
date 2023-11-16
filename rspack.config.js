const { defineConfig } = require('@rspack/cli');
const rspack = require('@rspack/core');
const path = require('path');

const port = 8080;
const isProduction = process.env.NODE_ENV === 'production';


const config = defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, './src'),
		}
	},
	entry: './src/main.tsx',
	devServer: {
		port,
		historyApiFallback: true,
		server: 'https'
	},
	output: {
		// 生产环境开启 CDN
		publicPath: isProduction ? '__VAN_STATIC_BASE_PATH__/' : '/',
		path: path.resolve(__dirname, 'dist'),
		filename: 'static/js/[name].[contenthash:8].js',
		chunkFilename: 'static/js/async/[name].[contenthash:8].js',
		pathinfo: false,
		hashFunction: 'xxhash64',
		cssFilename: 'static/css/[name].[contenthash:8].css',
		cssChunkFilename: 'static/css/async/[name].[contenthash:8].css',
		clean: true
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM",
		"exceljs": "ExcelJS",
		"wangeditor": "wangEditor",
		"html2canvas": "html2canvas"
	},
	// 生产环境关闭sourcemap
	devtool: isProduction ? false : 'source-map',
	module: {
		rules: [
			{
				test: /\.less$/,
				oneOf: [
					{
						sideEffects: true,
						use: [
							{
								loader: 'postcss-loader',
								options: {
									postcssOptions: {
										plugins: [
											{
												browsers: [
													'last 1 chrome version',
													'last 1 firefox version',
													'last 1 safari version'
												],
												options: {
													flexbox: 'no-2009',
													overrideBrowserslist: [
														'last 1 chrome version',
														'last 1 firefox version',
														'last 1 safari version'
													]
												},
												postcssPlugin: 'autoprefixer',
											}
										]
									},
									sourceMap: true
								}
							},
							{
								loader: 'less-loader',
								options: {
									lessOptions: {
										javascriptEnabled: true
									},
									sourceMap: true,
								}
							}
						],
						resolve: {
							preferRelative: true
						},
						test: /\.module\.\w+$/i,
						type: 'css/module'
					},
					{
						sideEffects: true,
						use: [
							{
								loader: 'postcss-loader',
								options: {
									postcssOptions: {
										plugins: [
											{
												browsers: [
													'last 1 chrome version',
													'last 1 firefox version',
													'last 1 safari version'
												],
												options: {
													flexbox: 'no-2009',
													overrideBrowserslist: [
														'last 1 chrome version',
														'last 1 firefox version',
														'last 1 safari version'
													]
												},
												postcssPlugin: 'autoprefixer',
											}
										]
									},
									sourceMap: true
								}
							},
							{
								loader: 'less-loader',
								options: {
									lessOptions: {
										javascriptEnabled: true
									},
									sourceMap: true,
								}
							}
						],
						resolve: {
							preferRelative: true
						},
						type: 'css'
					}
				]
			},
		],
	},
	optimization: {
		// 抽离公共模块
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: 'initial',
					minChunks: 2,
					minSize: 0,
					maxInitialSize: 5
				},
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
				}
			}
		},

		minimize: true,
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			template: './public/index.html'
		}),
	]
});

module.exports = config;
