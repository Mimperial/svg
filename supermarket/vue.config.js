// 作为配置文件，直接导出配置对象即可
module.exports = {
    devServer: {
        // 设置主机地址
        host: 'localhost',
        // 设置默认端口
        port: 8080,
        // 设置代理
        proxy: {
            '/collect': {
                // 目标 API 地址
                target: 'http://192.168.10.8:3014',
                // 如果要代理 websockets
                ws: false,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true
            },
            '/check': {
                // 目标 API 地址
                target: 'http://192.168.10.8:3014',
                // 如果要代理 websockets
                ws: false,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true
            },

        }
    }
}