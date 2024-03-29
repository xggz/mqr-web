<template>
  <div class="profile-box">
    <div class="box-header">
      <div class="avatar-wrapper">
        <div class="avatar-box rotate" @click="robotInfoEdit">
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
        <span style="cursor: pointer" @click="robotStateConfirm">
          <el-button
              :type="robotInfo.state == 4 ? 'success':'info'" size="small"
          >
            {{ robotInfo.stateMemo }}
            <i class="el-icon--right" :class="{'el-icon-loading': robotInfo.state == 4}"/>
          </el-button>
        </span>
      </div>
    </div>
    <div class="box-nav">
      <el-tooltip class="item" effect="dark" content="配置账号" placement="left-start">
        <el-button type="primary" icon="el-icon-edit" circle @click="robotInfoEdit"></el-button>
      </el-tooltip>
      <el-tooltip
          class="item"
          effect="dark"
          content="停止运行"
          placement="left-start"
          v-if="robotInfo.state != 1 && robotInfo.state != 0"
      >
        <el-button type="danger" icon="el-icon-switch-button" circle @click="robotStopConfirm"></el-button>
      </el-tooltip>
      <el-tooltip
          class="item"
          effect="dark"
          content="启动运行"
          placement="left-start"
          v-if="robotInfo.state == 1 && robotInfo.state != 0"
      >
        <el-button type="success" icon="el-icon-video-play" circle @click="robotStartSubmit"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="白名单配置" placement="left-start">
        <el-button type="primary" icon="el-icon-postcard" circle @click="allowListConfirm"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="事件设置" placement="left-start">
        <el-button type="primary" icon="el-icon-setting" circle></el-button>
      </el-tooltip>
    </div>
    <el-dialog class="dialog-robot" title="机器人账号配置" :visible.sync="robotInfoVisible" :append-to-body="true">
      <el-form ref="robotForm" :rules="robotRules" :model="robotForm" label-width="100px">
        <el-form-item label="QQ号" prop="qq">
          <el-input
              ref="qq"
              v-model="robotForm.qq"
              @focus="robotFormFocus.qq = true"
              @blur="robotFormFocus.qq = false"
          />
        </el-form-item>
        <el-form-item label="QQ密码" prop="password">
          <el-input
              type="password"
              ref="password"
              v-model="robotForm.password"
              @focus="robotFormFocus.password = true"
              @blur="robotFormFocus.password = false"
          />
        </el-form-item>
        <el-form-item label="账号昵称" prop="nickname">
          <el-input
              ref="nickname"
              v-model="robotForm.nickname"
              @focus="robotFormFocus.nickname = true"
              @blur="robotFormFocus.nickname = false"
          />
        </el-form-item>
        <el-form-item prop="admins" label="管理员QQ">
          <el-input
              ref="admins"
              type="textarea"
              v-model="robotForm.admins"
              @focus="robotFormFocus.admins = true"
              @blur="robotFormFocus.admins = false"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="robotInfoSubmit">保存</el-button>
          <el-button @click="robotInfoVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog class="robot-state-dialog" title="机器人状态" :visible.sync="robotStateVisible" width="460px">
      <h2 class="title">{{ robotInfo.stateMemo }}</h2>
      <div v-if="robotVerify.type == 'SMS'" style="text-align: center;">
        <el-tag>请接收短信后，填入下方输入框，再点击下面的提交验证按钮</el-tag>
        <div style="display: flex;justify-content: center; align-content: center;font-size: 18px;margin: 20px 0;">{{ robotVerify.content }}</div>
      </div>
      <div v-if="robotVerify.type == 'SLIDER'" style="text-align: center;">
        <el-tag>请先阅读<a href="https://bbs.molicloud.com/thread/105" target="_blank">滑块验证教程<i class="el-icon-top-right el-icon--right"></i></a>，再点击下面的提交验证按钮</el-tag>
        <el-input
            style="margin: 20px 0;"
            type="textarea"
            :rows="5"
            placeholder="验证地址"
            readonly
            v-model="robotVerify.content">
        </el-input>
      </div>
      <div v-if="robotVerify.type == 'URL'" style="text-align: center;">
        <el-tag>请在新窗口打开验证地址，完成验证后再点击下面的提交验证按钮</el-tag>
        <el-input
            style="margin: 20px 0;"
            type="textarea"
            :rows="5"
            placeholder="验证地址"
            readonly
            v-model="robotVerify.content">
        </el-input>
      </div>
      <div v-if="robotVerify.type == 'QRCODE'" style="text-align: center;">
        <el-tag>请用手机QQ扫描下面二维码，完成验证后再点击下面的提交验证按钮</el-tag>
        <img :src="'data:image/png;base64,'+robotVerify.content"/>
      </div>
      <div class="verify-img-box" v-if="robotVerify.type == 'IMG'">
        <img :src="'data:image/png;base64,'+robotVerify.content"/>
      </div>
      <div v-show="robotVerify.type == 'IMG' || robotVerify.type == 'SLIDER' || robotVerify.type == 'SMS'">
        <el-input v-model="verifyCode" type="primary" placeholder="请输入验证信息"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="robotStateVisible = false">取 消</el-button>
        <el-button v-show="robotInfo.state == 2" type="primary" @click="robotStateSubmit">提交验证</el-button>
      </span>
    </el-dialog>
    <el-dialog class="allow-list-dialog" title="白名单配置" :visible.sync="allowListVisible" width="460px">
      <el-form ref="allowListForm" :model="allowListForm" label-width="120px">
        <el-form-item label="开启群白名单" prop="groupAllowListSwitch">
          <el-switch v-model="allowListForm.groupAllowListSwitch"></el-switch>
        </el-form-item>
        <el-form-item label="群白名单" prop="groupAllowList">
          <el-select
              :disabled="!allowListForm.groupAllowListSwitch"
              v-model="allowListForm.groupAllowList"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="多个用回车键确认">
          </el-select>
        </el-form-item>
        <el-form-item label="开启好友白名单" prop="friendAllowListSwitch">
          <el-switch v-model="allowListForm.friendAllowListSwitch"></el-switch>
        </el-form-item>
        <el-form-item label="好友白名单" prop="friendAllowList">
          <el-select
              :disabled="!allowListForm.friendAllowListSwitch"
              v-model="allowListForm.friendAllowList"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="多个用回车键确认">
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="allowListSubmit">保存</el-button>
          <el-button @click="allowListVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRobotAllowList,
  getRobotInfo,
  robotStart,
  robotStop,
  robotVerify, saveRobotAllowList,
  saveRobotInfo,
  saveRobotVerify
} from "@/request/dashboard";
import {getQQAvatar, getStateMemo} from "@/util/qq";
// 定时刷新机器人信息
let robotInfoTimer = null;

export default {
  name: "DashboardLogin",
  data() {
    return {
      robotInfoVisible: false,
      robotStateVisible: false,
      allowListVisible: false,
      verifyCode: '',
      robotForm: {
        qq: '',
        nickname: '',
        password: '',
        admins: '',
      },
      robotFormFocus: {
        qq: false,
        nickname: false,
        password: false,
        admins: false,
      },
      robotInfo: {
        qq: '',
        nickname: '',
        password: '',
        admins: '',
        state: 0,
        stateMemo: '',
        qqAvatar: ''
      },
      robotVerify: {
        type: '',
        content: ''
      },
      allowListForm: {
        groupAllowList: '',
        friendAllowList: '',
        groupAllowListSwitch: false,
        friendAllowListSwitch: false
      },
      robotRules: {
        qq: [
          {required: true, message: 'QQ号不能为空', trigger: 'blur'},
        ],
        password: [
          {required: true, message: 'QQ密码不能为空', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '账号昵称不能为空', trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.initRobotInfo();
    robotInfoTimer = setInterval(this.initRobotInfo, 2000);
  },
  destroyed() {
    clearInterval(robotInfoTimer);
  },
  methods: {
    initRobotInfo() {
      getRobotInfo().then(res => {
        let robotInfo = res.data.data;
        if (robotInfo != null) {
          this.robotInfo.qq = robotInfo.qq;
          this.robotInfo.nickname = robotInfo.nickname;
          this.robotInfo.password = robotInfo.password;
          this.robotInfo.admins = robotInfo.admins.join(",")
          this.robotInfo.state = robotInfo.state;
          this.robotInfo.qqAvatar = getQQAvatar(robotInfo.qq);
          if (this.robotForm.qq == '' && !this.robotFormFocus.qq) {
            this.robotForm.qq = robotInfo.qq;
          }
          if (this.robotForm.nickname == '' && !this.robotFormFocus.nickname) {
            this.robotForm.nickname = robotInfo.nickname;
          }
          if (this.robotForm.password == '' && !this.robotFormFocus.password) {
            this.robotForm.password = robotInfo.password;
          }
          if (this.robotForm.admins == '' && !this.robotFormFocus.admins) {
            this.robotForm.admins = robotInfo.admins.join(",");
          }
        }
        this.robotInfo.stateMemo = getStateMemo(this.robotInfo.state);
      });
    },
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
          let robotForm = JSON.parse(JSON.stringify(this.robotForm));
          robotForm.admins = robotForm.admins.split(",");
          saveRobotInfo(robotForm).then(() => {
            this.robotInfo.qq = this.robotForm.qq;
            this.robotInfo.nickname = this.robotForm.nickname;
            this.robotInfo.password = this.robotForm.password;
            this.robotInfo.admins = this.robotForm.admins;
            this.robotInfo.qqAvatar = getQQAvatar(this.robotForm.qq);
            this.robotInfo.state = 1;
            this.robotInfo.stateMemo = getStateMemo(1);
            this.$message.success('保存成功');
          }).finally(() => {
            robotLoading.close();
            this.robotInfoVisible = false;
          });
        } else {
          this.$refs[Object.keys(items)[0]].focus();
        }
      });
    },
    robotStartSubmit() {
      let runLoading = this.$loading({
        lock: true,
        text: '启动中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.8)'
      });
      robotStart().then(() => {
        this.$notify({
          title: '启动中...',
          message: '请观察机器人头像下方动态，看是否需要登录验证',
          type: 'success',
          duration: 0
        });
      }).finally(() => {
        runLoading.close();
      });
    },
    robotStopConfirm() {
      this.$confirm('确认停止机器人运行吗？').then(() => {
        let stopLoading = this.$loading({
          lock: true,
          text: '停止中',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.8)'
        });
        robotStop().then(() => {
          this.$message.success('已停止运行');
        }).finally(() => {
          stopLoading.close();
        });
      }).catch(() => {
      });
    },
    robotStateConfirm() {
      this.initRobotInfo();
      if (this.robotInfo.state == 2) {
        robotVerify().then(res => {
          let info = res.data.data;
          this.robotVerify.type = info.type;
          this.robotVerify.content = info.content;
        });
      }
      this.robotStateVisible = true;
    },
    robotStateSubmit() {
      let verifyLoading = this.$loading({
        lock: true,
        text: '提交中',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.8)'
      });
      let code = this.robotVerify.type == 'URL' ? 'yes' : this.verifyCode;
      saveRobotVerify(code).then(() => {
        this.$message.success('提交成功');
      }).finally(() => {
        verifyLoading.close();
        this.robotStateVisible = false;
      });
    },
    allowListConfirm() {
      this.allowListVisible = true;
      getRobotAllowList().then(res => {
        let allowList = res.data.data;
        if (allowList != null) {
          this.allowListForm.groupAllowListSwitch = allowList.groupAllowListSwitch;
          this.allowListForm.groupAllowList = allowList.groupAllowList;
          this.allowListForm.friendAllowListSwitch = allowList.friendAllowListSwitch;
          this.allowListForm.friendAllowList = allowList.friendAllowList;
        }
      });
    },
    allowListSubmit() {
      if (this.robotInfo.state != null && this.robotInfo.state != 0 && this.robotInfo.state != 1) {
        this.$message.warning('请先停止机器人后再编辑');
        return;
      }
      let allowListLoading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.8)'
      });
      let allowListForm = JSON.parse(JSON.stringify(this.allowListForm));
      saveRobotAllowList(allowListForm).then(() => {
        this.$message.success('保存成功');
      }).finally(() => {
        allowListLoading.close();
        this.allowListVisible = false;
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
    align-items: center;
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

.robot-state-dialog .title {
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}

.robot-state-dialog .verify-iframe {
  width: 100%;
  height: 380px;
  border: 1px solid rgb(238, 238, 238);
  border-radius: 5px;
}

.robot-state-dialog .verify-img-box {
  text-align: center;
  margin-bottom: 20px;
}

@media screen and (max-width: 800px)  {
  .index-content {
    min-width: 100% !important;
  }
  .profile-nav {
    display: none;
  }
  .header-content {
    padding: 0 20px;
  }
  .profile-container {
    margin-top: 0 !important;;
  }
  .footer-content {
    padding: 20px !important;
  }
  .dialog-robot > .el-dialog {
    width: 100% !important;
  }
  .el-message-box {
    width: 100% !important;
  }
  .robot-state-dialog > .el-dialog {
    width: 100% !important;
  }
}
</style>

<style scoped>
.box-nav >>> .el-button + .el-button {
  margin-left: 0px !important;
  margin-top: 20px;
}
</style>