<template>
  <div class="contanier">
    <el-card class="box-login">
      <el-form :model="user" status-icon :rules="login_rules" ref="loginFrom">
        <h1>用户登录</h1>
        <el-form-item label="用户手机" prop="phone">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="pwd">
          <el-input v-model="user.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login('loginFrom')">登录</el-button>
          <el-button>
            <router-link to="/register">还没有账户？速度去申请一个吧</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        phone: "",
        pwd: ""
      },
      login_rules: {
        phone: [
          { required: true, message: "手机不能为空" },
          { pattern: /^1\d{10}$/, message: "手机号格式不正确" }
        ],
        pwd: [
          { required: true, message: "密码不能为空" },
          { pattern: /^\d{4,16}$/, message: "密码是4到16位数字" }
        ]
      }
    };
  },

  methods: {
    login(loginFrom) {
      this.$refs[loginFrom].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/index/login",
            data: {
              logTel: this.user.phone,
              logPwd: this.user.pwd
            }
          }).then(({ data }) => {
            // console.log(data[0]);
            if (data.length == 1) {
              if (data[0].status == 0) {
                this.$alert("对不起您的账户正在审核中,请联系管理员", "消息");
              } else if (data[0].status == 1) {
                //   console.log("登录成功");
                this.$router.push("/manage");
              }
            } else {
              this.$alert("登录失败，没有此账户", "消息");
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>

.box-login {
  width: 500px;
  margin: auto;
  margin-top: 100px;
}
</style>
