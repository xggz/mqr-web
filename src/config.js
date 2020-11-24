const config = {
    // 基础url地址
    baseUrl: '/api/api',
    // baseUrl: '/api', // build时，请注释掉上面那个baseUrl，使用当前行的变量
    // 接口请求的超时 时间
    timeout: 60000,
    // 忽略授权校验的url列表
    ignoreAuthUrls: [
        '/sys-user/login'
    ],
    // 接口通用请求头
    headers: {
        'Access-Token': '',
        'Content-Type': 'application/json'
    }
}

export default config;