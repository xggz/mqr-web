import axios from 'axios'
import conf from '@/config'
import { getCache } from "@/util/cache";
import { Message } from 'element-ui'

// 接口请求超时 时间
axios.defaults.timeout = conf.timeout;

// 接口url前缀
axios.defaults.baseURL = conf.baseUrl;

// 接口请求拦截
axios.interceptors.request.use(
    config => {
        config.headers = conf.headers;
        if (conf.ignoreAuthUrls.indexOf(config.url) < 0) {
            const accessToken = getCache('Access-Token');
            if (accessToken != null) {
                config.headers['Access-Token'] = accessToken;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 接口响应拦截
axios.interceptors.response.use(
    respose => {
        const res = respose.data;
        if (res.code && res.code !== 'A0000') {
            Message({
                message: res.message,
                type: 'error',
                duration: 3000
            });
            return Promise.reject('apiError');
        }
        return respose;
    },
    error => {
        Message({
            message: '请求失败',
            type: 'error',
            duration: 3000
        });
        return Promise.reject(error);
    }
);

/**
 * GET query请求
 *
 * @param url
 * @param params
 * @returns {Promise}
 */
export function getQuery(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        });
    });
}

/**
 * GET path请求
 *
 * @param url
 * @param path
 * @returns {Promise}
 */
export function getPath(url, path) {
    if (url.charAt(url.length - 1) != '/') {
        url = url + '/';
    }
    return new Promise((resolve, reject) => {
        axios.get(url + path).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        });
    });
}

/**
 * POST query请求
 *
 * @param url
 * @param params
 * @returns {Promise}
 */
export function postQuery(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, null, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        });
    });
}

/**
 * POST body请求
 *
 * @param url
 * @param data
 * @returns {Promise}
 */
export function postBody(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        });
    });
}

/**
 * PUT query请求
 *
 * @param url
 * @param params
 * @returns {Promise}
 */
export function putQuery(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, null, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        });
    });
}

/**
 * PUT body请求
 *
 * @param url
 * @param data
 * @returns {Promise}
 */
export function putBody(url, data) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        });
    });
}

/**
 * DELETE query请求
 *
 * @param url
 * @param params
 * @returns {Promise}
 */
export function deleteQuery(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        });
    });
}

/**
 * DELETE path请求
 *
 * @param url
 * @param path
 * @returns {Promise}
 */
export function deletePath(url, path) {
    if (url.charAt(url.length - 1) != '/') {
        url = url + '/';
    }
    return new Promise((resolve, reject) => {
        axios.delete(url + path).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        });
    });
}