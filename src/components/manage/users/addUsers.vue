<template>
 <div>
     <el-button type="primary" @click="dialogVisible = true" icon="el-icon-circle-plus-outline">增加</el-button>
<el-dialog
  title="增加用户"
  :visible.sync="dialogVisible"
  width="50%">
   <el-form :model="addUserFrom" status-icon :rules="rules" ref="addUserFrom" label-width="100px">
            <el-form-item label="手机号：" prop="logTel">
                <el-input v-model="addUserFrom.logTel"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="logPwd">
            <el-input v-model="addUserFrom.logPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="logEmail">
            <el-input v-model="addUserFrom.logEmail"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="Name">
            <el-input v-model="addUserFrom.Name"></el-input>
        </el-form-item>
        <el-form-item label="身份：" prop="attribute">
            <el-radio v-model="addUserFrom.attribute" label="Administrators" disabled>平台管理员</el-radio>
            <el-radio v-model="addUserFrom.attribute" label="store">店主</el-radio>
           <el-radio v-model="addUserFrom.attribute" label="supplier">供应商</el-radio>
        </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('addUserFrom')">重置</el-button>
    <el-button @click="addUser('addUserFrom')">增 加</el-button>      
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
</el-dialog>
 </div>
</template>


<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      rules: {
        logTel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^1\d{10}$/, message: "手机号格式不正确" },
          { validator: this.repeatPhone }
        ],
        logPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在6到16个字符"
          }
        ],
        logEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            message: "邮箱格式不正确"
          }
        ],
        Name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        attribute: [{ required: true, message: "请选择身份", trigger: "blur" }]
      },
      dialogVisible: false,
      addUserFrom: {
        logPwd: "",
        logTel: "",
        logEmail: "",
        Name: "",
        attribute: ""
      }
    };
  },
  methods: {
    ...mapActions("userModules", ["showUsers"]),
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    repeatPhone(rules, value, callback) {
      console.log(value);
      axios({
        methods: "get",
        url: "/index",
        params: {
          logTel: value
        }
      }).then(({ data }) => {
        console.log(data);
        if (data.status == 0) {
          callback("手机号重复");
        } else {
          callback();
        }
      });
    },
    addUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/users",
            data: {
              status: "1",
              ...this.addUserFrom
            }
          }).then(({ data }) => {
            this.dialogVisible = false;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>