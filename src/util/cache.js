/**
 * 获取本地缓存数据
 *
 * @param name
 * @returns {string}
 */
export function getCache(name) {
    return sessionStorage.getItem(name);
}

/**
 * 存入缓存数据到本地
 *
 * @param name
 * @param value
 */
export function setCache(name, value) {
    sessionStorage.setItem(name, value);
}

/**
 * 删除缓存数据
 *
 * @param name
 */
export function removeCache(name) {
    sessionStorage.removeItem(name);
}

/**
 * 清空缓存数据
 */
export function clearCache() {
    sessionStorage.clear();
}