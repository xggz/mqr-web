const path = require('path');

module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    chainWebpack: config =>{
        config.plugin('html')
            .tap(args => {
                args[0].title = "茉莉云";
                return args;
            })
    },
    configureWebpack:{
        resolve: {
            extensions: ['.js', '.json', '.vue', '.scss', '.css'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                '~@': path.resolve(__dirname, './static')
            }
        },
        externals :{
            TMap:'TMap'
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin ---- 开发环境注释才有css热更新，生产环境时必须加上
        // extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8282,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: "http://127.0.0.1:8181",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    // 第三方插件配置
    pluginOptions: {
        'process.env': {
            NODE_ENV: '"development"'
        }
    }
}