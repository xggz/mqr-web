<template>
  <div class="auth-content">
    <h2 class="title">Welcome</h2>
    <div class="content-box">
      <el-form ref="loginForm" :rules="rules" :model="loginForm">
        <el-form-item prop="username">
          <el-input ref="username" v-model="loginForm.username" placeholder="用户名" suffix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input ref="password" v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="loginSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { jumpPage } from "@/util/page";
import { login } from '@/request/auth';

export default {
  name: "AuthLogin",
  data() {
    return {
      isLogin: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isLogin = this.$store.getters["auth/isLogin"];
    if (this.isLogin) {
      jumpPage('/dashboard');
    }
  },
  methods: {
    loginSubmit() {
      this.$refs['loginForm'].validate((result, items) => {
        if (result) {
          let loginLoading = this.$loading({
            lock: true,
            text: '登录中',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.8)'
          });
          login(this.loginForm.username, this.loginForm.password).then(res => {
            this.$store.commit('auth/signIn', {
              accessToken: res.data
            });
            this.$message.success('登录成功');
            jumpPage('/dashboard')
          }).finally(() => {
            loginLoading.close();
          });
        } else {
          this.$refs[Object.keys(items)[0]].focus();
        }
      });
    }
  }
}
</script>

<style lang="less">
.auth-content {
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f7f0f0;
  .title {
    font-size: 30px;
  }
  .content-box {
    min-width: 660px;
    height: 360px;
    background-color: #fff;
  }
}
</style>