<template>
  <el-card class="box-register">
    <el-form status-icon :model="user" :rules="register_rules" ref="registerFrom">
      <h1>用户注册</h1>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="user.pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm">
        <el-input v-model="user.confirm" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="用户管理类型" prop="type">
        <el-select v-model="user.type">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="register('registerFrom')">注册账号</el-button>
        <el-button @click="resetForm('registerFrom')">重置</el-button>
        <el-button>
          <router-link to="/login">已有账号，直接登录</router-link>
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        name: "",
        phone: "",
        pwd: "",
        confirm: "",
        email: "",
        type: "store"
      },
      register_rules: {
        name: [
          { required: true, message: "用户名不能为空" },
          { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: "用户名格式不正确" }
        ],
        phone: [
          { required: true, message: "手机不能为空" },
          { pattern: /^1\d{10}$/, message: "手机号格式不正确" },
          { validator: this.validatePhone }
        ],
        pwd: [
          { required: true, message: "密码不能为空" },
          { pattern: /^\d{4,16}$/, message: "密码是4到16位数字" }
        ],
        confirm: [
          { required: true, message: "确认密码不能为空" },
          { validator: this.validateConfirm }
        ],
        email: [
          { required: true, message: "邮箱不能为空" },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "邮箱格式不正确"
          }
        ]
      },
      options: [
        {
          value: "store",
          label: "门店管理员"
        },
        {
          value: "supplier",
          label: "供应商管理员"
        }
      ]
    };
  },
  methods: {
    validatePhone(rule, value, callback) {
      axios({
        methods: "get",
        url: "/index",
        params: {
          logTel: value
        }
      }).then(({ data }) => {
        // console.log(data);
        if (data.length > 0) {
          callback("手机号重复了");
        } else {
          callback();
        }
      });
    },
    validateConfirm(rule, value, callback) {
      if (value == this.user.pwd) {
        callback();
      } else {
        callback("两次密码不一致");
      }
    },
    register(registerFrom) {
      this.$refs[registerFrom].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/index",
            data: {
              Name: this.user.name,
              logPwd: this.user.pwd,
              logTel: this.user.phone,
              logEmail: this.user.email,
              attribute: this.user.type
            }
          }).then(({ data }) => {
            // console.log(data);
            if (data) {
              this.$router.push("/login");
              this.$alert("注册成功，等待管理员审核", "消息");
            } else {
              this.$alert("注册失败", "消息");
            }
          });
        } else {
          this.$alert("验证没有通过", "消息");
        }
      });
    },
    resetForm(registerFrom) {
      this.$refs[registerFrom].resetFields();
    }
  }
};
</script>

<style scoped>
.box-register {
  width: 600px;
  margin: auto;
  margin-top: 100px;
}
</style>
