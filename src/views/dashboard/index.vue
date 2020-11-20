<template>
  <div class="raw-context">
    <div class="profile-container">
      <div class="profile-content">
        <div class="profile-nav">
          <el-menu default-active="1" background-color="#545c64" text-color="#fff"
                   active-text-color="#ffd04b" class="profile-menu">
            <el-menu-item index="1">
              <i class="el-icon-cpu"></i>
              <span slot="title">控制面板</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-s-grid"></i>
              <span slot="title">插件管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-s-data"></i>
              <span slot="title">数据统计</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">API调试台</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title">网站配置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardLogin"
}
</script>

<style>
.profile-container {
  display: flex;
  width: 960px;
  margin: 30px auto 0;
  flex-direction: row;
  background: #fff;
  box-sizing: border-box;
}

.profile-content {
  flex: 1;
  flex-basis: 0;
  overflow-y: auto;
  box-sizing: border-box;
}

.profile-nav {
  width: 180px;
  height: 100%;
}

.profile-menu {
  height: 100%;
}
</style>