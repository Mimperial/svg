// const webpack = require('webpack')
module.exports = {
    devServer: {
        // 设置主机地址
        host: 'localhost',
        // 设置默认端口
        port: 8080,
        // 设置代理
        proxy: {
            '/article': {
                // 目标 API 地址
                target: 'http://192.168.3.40:8080',
                // 如果要代理 websockets
                ws: false,
                // 将主机标头的原点更改为目标URL
                changeOrigin: false
            },

        }
    },
    lintOnSave:false, //对于定义但没使用的变量，flase编译不检查，通过

    configureWebpack: {
        plugins: [
            { from: 'node_modules/@liveqing/liveplayer/dist/component/crossdomain.xml'},
            { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer.swf'},
            { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer-lib.min.js', to: 'js/'}
        ]
    }

      
}