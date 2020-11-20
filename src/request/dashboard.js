import { getQuery } from "@/request/http";

/**
 * 获取机器人信息
 *
 * @returns {Promise}
 */
export function getRobotInfo() {
    return getQuery('/sys-setting/robot-info', null);
}