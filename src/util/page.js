import router from '@/router'

/**
 * 页面跳转
 *
 * @param url
 */
export function jumpPage(url) {
    if (router.currentRoute.path != url) {
        router.push(url);
    }
}