<template>
  <div class="auth-aside">
    <h2 class="title">MQR</h2>
    <el-image :src="require('../assets/aside2.jpg')" fit="cover"></el-image>
  </div>
</template>

<script>
export default {
  name: "AuthAside"
}
</script>

<style lang="less" scoped>
.auth-aside {
  display: flex;
  flex: 1 1 12%;
  flex-direction: column;
  width: 460px;
  height: 100%;
  background-color: #545c64;
  color: #fff;
  justify-content: space-around;
  .title {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 60px;
    text-align: center;
    font-family: fantasy;
  }

}
</style>

<style scoped>
.el-image {
  text-align: center;
}
.el-image >>> img {
  width: 360px;
}
</style>