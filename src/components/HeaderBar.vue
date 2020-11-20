<template>
  <div id="header" class="header">
    <div class="header-content">
      <div class="header-link">
        <div class="logo-box">
          <el-image
              :src="require('../assets/logo.jpg')"
              style="width: 30px; height: 30px;"
              fit="cover"></el-image>
          <span class="title">MQR</span>
        </div>
        <span class="header-title">首页</span>
        <div class="account-wrap" v-show="isLogin">
          <el-dropdown placement="top" @command="accountHandler">
            <span class="el-dropdown-link">
              <el-avatar size="small" :src="userInfo.avatar" lazy></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="center" disabled>{{ userInfo.username }}</el-dropdown-item>
              <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jumpPage } from "@/util/page";

export default {
  name: "HeaderBar",
  data() {
    return {
      isLogin: false,
      userInfo: {
        username: '',
        avatar: ''
      }
    }
  },
  created() {
    this.isLogin = this.$store.getters["auth/isLogin"];
    if (this.isLogin) {
      this.userInfo.username = this.$store.getters["auth/username"];
      this.userInfo.avatar = this.$store.getters["auth/avatar"];
    } else {
      jumpPage('/auth/login');
    }
  },
  methods: {
    accountHandler(command) {
      if (command == 'logout') {
        this.$store.commit('auth/signOut');
        this.isLogin = this.$store.getters["auth/isLogin"];
        this.$message.success("退出成功");
        jumpPage('/auth/login')
      }
    }
  }
}
</script>

<style lang="less">
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
  justify-content: center;
  height: 60px;
  z-index: 999;
  box-sizing: border-box;
  background-color: #545c64;
}

.header-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 960px;
}

.header-link {
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #FFF;
}

.header-link .logo-box {
  display: flex;
  font-size: 15px;
  line-height: 16px;
  color: #fff;
  height: 30px;
  .title {
    display: flex;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    font-size: 13px;
  }
}

.header-link .header-title {
  display: flex;
}

.account-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 60px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: flex-end;
}
</style>

<style scoped>
.el-dropdown-menu >>> .center {
  text-align: center;
}

.account-wrap .el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
</style>