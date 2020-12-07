import {getQuery, postBody, postQuery} from "@/request/http";

/**
 * 获取机器人信息
 *
 * @returns {Promise}
 */
export function getRobotInfo() {
    return getQuery('/sys-setting/robot-info', null);
}

/**
 * 保存机器人信息
 *
 * @param data
 * @returns {Promise}
 */
export function saveRobotInfo(data) {
    return postBody('/sys-setting/robot-info', data);
}

/**
 * 启动机器人运行
 *
 * @returns {Promise}
 */
export function robotStart() {
    return getQuery('/robot/start', null);
}

/**
 * 停止机器人运行
 *
 * @returns {Promise}
 */
export function robotStop() {
    return getQuery('/robot/stop', null);
}

/**
 * 获取机器人验证信息
 *
 * @returns {Promise}
 */
export function robotVerify() {
    return getQuery('/sys-setting/robot-verify', null);
}

/**
 * 提交机器人验证信息
 *
 * @param code
 */
export function saveRobotVerify(code) {
    return postQuery('/sys-setting/robot-verify', {
        code: code
    });
}

/**
 * 获取白名单配置
 *
 * @returns {Promise}
 */
export function getRobotAllowList() {
    return getQuery('/sys-setting/robot-allow-list', null);
}

/**
 * 保存白名单配置
 *
 * @param data
 * @returns {Promise}
 */
export function saveRobotAllowList(data) {
    return postBody('/sys-setting/robot-allow-list', data);
}