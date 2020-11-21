import { getQuery, postBody } from "@/request/http";

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