import { getCache, setCache, removeCache } from "@/util/cache";

const state = {
    logged: getCache('Access-Token') != null,
    userInfo: JSON.parse(getCache('userInfo'))
}

const getters = {
    isLogin: state => {
        return state.logged;
    },
    username: state => {
        if (state.userInfo == null) {
            return '未登录';
        }
        return state.userInfo.username;
    },
    avatar: state => {
        if (state.userInfo == null) {
            return 'default-avatar.png';
        }
        return state.userInfo.avatar;
    }
}

const mutations = {
    signIn: (state, { accessToken }) => {
        let tokenInfo = JSON.parse(require('js-base64').Base64.decode(accessToken.split('.')[1]));
        let userInfo = {
            username: tokenInfo.username,
            avatar: tokenInfo.avatar
        };
        state.logged = true;
        state.userInfo = userInfo;
        setCache('Access-Token', accessToken);
        setCache('userInfo', JSON.stringify(userInfo));
        setCache('expiresIn', tokenInfo.exp)
    },
    signOut: state => {
        state.logged = false;
        removeCache('Access-Token');
        removeCache('userInfo');
        removeCache('expiresIn');
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}