<template>
  <div class="profile-box">
    <div class="box-header">
      <div class="avatar-wrapper">
        <div class="avatar-box">
          <el-image src="http://q1.qlogo.cn/g?b=qq&nk=qq号&s=100" fit="fit"
                    style="width: 100px; height: 100px; border-radius: 50%">
            <div slot="error" class="image-slot">机器人未配置</div>
          </el-image>
        </div>
      </div>
      <div class="robot-info">
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardLogin"
}
</script>

<style lang="less">
.profile-box {
  display: flex;
  flex: 1;
}

.box-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
}

.avatar-box {
  width: 100px;
  height: 100px;
  padding: 5px;
  border: 3px dotted #666;
  border-radius: 50%;
}

.image-slot {
  width: 100%;
  height: 100%;
  line-height: 100px;
  text-align: center;
  background-color: #666;
  color: #999;
  font-size: 13px;
}

.robot-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
  span {
    display: flex;
    color: #999;
    margin: 0 10px;
  }
}
</style>