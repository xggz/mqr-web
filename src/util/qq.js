/**
 * 获取QQ头像
 *
 * @param qq
 * @returns {string}
 */
export function getQQAvatar(qq) {
    return 'http://q1.qlogo.cn/g?b=qq&nk=' + qq + '&s=100';
}

/**
 * 获取状态描述
 *
 * @param state
 * @returns {string}
 */
export function getStateMemo(state) {
    let memo = '';
    switch (state) {
        case 1:
            memo = '未启动'
            break;
        case 2:
            memo = '登录需要验证';
            break;
        case 3:
            memo = '登录中';
            break;
        case 4:
            memo = '运行中';
            break;
        case 9:
            memo = '已离线';
            break;
        default:
            memo = '未配置';
            break;
    }
    return memo;
}