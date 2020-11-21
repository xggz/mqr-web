<template>
  <div class="profile-box">
    <div class="box-header">
      <div class="avatar-wrapper">
        <div class="avatar-box" @click="robotInfoEdit">
          <el-image :src="robotInfo.qqAvatar" fit="fit"
                    style="width: 120px; height: 120px; border-radius: 50%">
            <div slot="error" class="image-slot">机器人未配置</div>
          </el-image>
        </div>
      </div>
      <div class="robot-info">
        <span>
          <el-tag size="small" effect="dark">{{ robotInfo.nickname }}</el-tag>
        </span>
        <span>
          <el-tag size="small" effect="dark">{{ robotInfo.qq }}</el-tag>
        </span>
        <span style="cursor: pointer">
          <el-tag type="danger" effect="dark" size="medium">{{ robotInfo.stateMemo }}</el-tag>
        </span>
      </div>
    </div>
    <div class="box-nav">
      <el-tooltip class="item" effect="dark" content="配置账号" placement="left-start">
        <el-button type="primary" icon="el-icon-edit" circle @click="robotInfoEdit"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="停止运行" placement="left-start">
        <el-button icon="el-icon-switch-button" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="白名单配置" placement="left-start">
        <el-button icon="el-icon-check" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="黑名单配置" placement="left-start">
        <el-button icon="el-icon-close" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="事件设置" placement="left-start">
        <el-button icon="el-icon-setting" circle></el-button>
      </el-tooltip>
    </div>
    <el-dialog class="dialog-robot" title="机器人账号配置" :visible.sync="robotInfoVisible" width="400px" :append-to-body="true">
      <el-form ref="robotForm" :rules="robotRules" :model="robotForm" label-width="100px">
        <el-form-item label="QQ号" prop="qq">
          <el-input ref="qq" v-model="robotForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="QQ密码" prop="password">
          <el-input type="password" ref="password" v-model="robotForm.password"></el-input>
        </el-form-item>
        <el-form-item label="账号昵称" prop="nickname">
          <el-input ref="nickname" v-model="robotForm.nickname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="robotInfoSubmit">保存</el-button>
          <el-button @click="robotInfoVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRobotInfo, saveRobotInfo } from "@/request/dashboard";
import { getQQAvatar, getStateMemo } from "@/util/qq";

export default {
  name: "DashboardLogin",
  data() {
    return {
      robotInfoVisible: false,
      robotForm: {
        qq: '',
        nickname: '',
        password: ''
      },
      robotInfo: {
        qq: '',
        nickname: '',
        password: '',
        state: 0,
        stateMemo: '',
        qqAvatar: ''
      },
      robotRules: {
        qq: [
          { required: true, message: 'QQ号不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'QQ密码不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '账号昵称不能为空', trigger: 'blur' }
        ]
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
      if (robotInfo != null) {
        this.robotInfo.qq = robotInfo.qq;
        this.robotInfo.nickname = robotInfo.nickname;
        this.robotInfo.password = robotInfo.password;
        this.robotInfo.state = robotInfo.state;
        this.robotInfo.qqAvatar = getQQAvatar(robotInfo.qq);
        this.robotForm.qq = robotInfo.qq;
        this.robotForm.nickname = robotInfo.nickname;
        this.robotForm.password = robotInfo.password;
      }
      this.robotInfo.stateMemo = getStateMemo(this.robotInfo.state);
    }).finally(() => {
      loading.close();
    })
  },
  methods: {
    robotInfoEdit() {
      this.robotInfoVisible = true;
    },
    robotInfoSubmit() {
      this.$refs['robotForm'].validate((result, items) => {
        if (result) {
          if (this.robotInfo.state != null && this.robotInfo.state != 0 && this.robotInfo.state != 1) {
            this.$message.warning('请先停止机器人后再编辑');
            return;
          }
          let robotLoading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.8)'
          });
          saveRobotInfo(this.robotForm).then(() => {
            this.robotInfo.qq = this.robotForm.qq;
            this.robotInfo.nickname = this.robotForm.nickname;
            this.robotInfo.password = this.robotForm.password;
            this.robotInfo.qqAvatar = getQQAvatar(this.robotForm.qq);
            this.robotInfo.state = 1;
            this.robotInfo.stateMemo = getStateMemo(1);
            this.$message.success('保存成功');
          }).finally(() => {
            this.robotInfoVisible = false;
            robotLoading.close();
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
.profile-box {
  display: flex;
  flex: 1;
}

.box-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #fffacd;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
}

.avatar-box {
  width: 120px;
  height: 120px;
  padding: 10px;
  border: 3px dotted #f56c6c;
  border-radius: 50%;
  cursor: pointer
}

.image-slot {
  width: 100%;
  height: 100%;
  line-height: 120px;
  text-align: center;
  background-color: #666;
  color: #999;
  font-size: 13px;
}

.robot-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  font-style: oblique;
  span {
    display: flex;
    margin: 0 5px;
  }
}

.box-nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80px;
  padding: 20px 0;
}
</style>

<style scoped>
.box-nav >>> .el-button + .el-button {
  margin-left: 0px !important;
  margin-top: 15px;
}
</style>