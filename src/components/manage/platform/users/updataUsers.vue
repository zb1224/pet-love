<template>
    <div>
<el-dialog
  title="修改用户"
  :visible.sync="updataVisible"
  width="50%">
   <el-form :model="user" ref="user" status-icon label-width="100px">
          <el-form-item label="手机号：" prop="logTel">
                <el-input v-model="user.logTel"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="logPwd">
            <el-input v-model="user.logPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="logEmail">
            <el-input v-model="user.logEmail"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="Name">
            <el-input v-model="user.Name"></el-input>
        </el-form-item>
        <el-form-item label="身份：" prop="attribute">
            <el-radio v-model="user.attribute" label="Administrators" disabled>平台管理员</el-radio>
            <el-radio v-model="user.attribute" label="store">店主</el-radio>
           <el-radio v-model="user.attribute" label="supplier">供应商</el-radio>
        </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="upDataUser('user')">修 改</el-button>
    <el-button @click="updataVisible = false">取 消</el-button>
  </span>
</el-dialog>
    </div>
</template>


<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("userModules", ["user", "updataVisible"]),
    updataVisible: {
      get() {
        return this.$store.state.userModules.updataVisible;
      },
      set(updataVisible) {
        this.$store.commit("userModules/setVisible", updataVisible);
      }
    }
  },
  methods: {
    ...mapActions("userModules", ["showUsers"]),
    upDataUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: "put",
            url: "/users/" + this.user._id,
            data: {
              status: 1,
              ...this.user
            }
          }).then(({ data }) => {
            this.updataVisible = false;
            this.showUsers();
          });
        } else {
          alert("输入不能为空");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>