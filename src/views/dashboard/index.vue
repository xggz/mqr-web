<template>
  <div class="profile-box">
    <div class="box-header">
      <div class="avatar-wrapper">
        <div class="avatar-box">
          <el-image :src="robotInfo.qqAvatar" fit="fit"
                    style="width: 100px; height: 100px; border-radius: 50%">
            <div slot="error" class="image-slot">机器人未配置</div>
          </el-image>
        </div>
      </div>
      <div class="robot-info">
        <span class="ri-name">{{ robotInfo.nickname }}</span>
        <span class="ri-qq">
          <el-tag type="danger" effect="dark" size="mini">{{ robotInfo.qq }}</el-tag>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getRobotInfo } from "@/request/dashboard";
import { getQQAvatar } from "@/util/qq";

export default {
  name: "DashboardLogin",
  data() {
    return {
      robotInfo: {
        qq: '',
        nickname: '',
        state: 0,
        qqAvatar: ''
      }
    }
  },
  created() {
    let loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.8)'
    });
    getRobotInfo().then(res => {
      let robotInfo = res.data.data;
      this.robotInfo.qq = robotInfo.qq;
      this.robotInfo.nickname = robotInfo.nickname;
      this.robotInfo.state = robotInfo.state;
      this.robotInfo.qqAvatar = getQQAvatar(robotInfo.qq);
    }).finally(() => {
      loading.close();
    })
  }
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
  padding: 8px;
  border: 3px dotted #f56c6c;
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
    margin: 0 5px;
  }
}
</style>