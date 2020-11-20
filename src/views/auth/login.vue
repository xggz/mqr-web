<template>
  <div class="auth-content">
    <h2 class="title">登录茉莉机器人</h2>
    <div class="content-box">
      <el-form ref="loginForm" :rules="rules" :model="loginForm">
        <el-form-item prop="username" class="form-item">
          <el-input ref="username" v-model="loginForm.username" placeholder="用户名" suffix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <el-input ref="password" v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item size="large" class="form-item" style="margin-top: 5px">
          <el-button type="success" @click="loginSubmit" id="login-btn">登录</el-button>
        </el-form-item>
        <p class="agreement">我同意并遵守服务协议</p>
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
  background-color: white;
  .title {
    font-size: 30px;
    margin: 2rem 0;
    color: #4e4e4e;
  }
  .content-box {
    width: 60%;
    height: 300px;
    background-color: #fff;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 0 6px #ffffff;
    .form-item {
      margin-bottom: 2rem;
    }
    #login-btn {
      width: 100%;
    }
    .agreement {
      text-align: center;
      font-size: 13px;
      color: #545c64;
    }
  }
}
</style>