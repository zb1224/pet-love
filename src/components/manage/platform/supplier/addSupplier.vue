<template>
 <div>
     <el-button type="primary" @click="dialogVisible = true" icon="el-icon-circle-plus-outline">增加</el-button>
<el-dialog
  title="增加店铺"
  :visible.sync="dialogVisible"
  width="50%">
   <el-form :model="users" status-icon :rules="rules" ref="users" label-width="150px">
            <el-form-item label="供应商手机号：" prop="logTel">
                <el-input v-model="users.logTel" @focus="changeShopMaster"></el-input>
                <el-tooltip effect="dark" content="你输入的手机号对应这位供应商" placement="right-start" class="item">
                  <el-button>供应商名：{{users.Name}}</el-button>
                </el-tooltip>
            </el-form-item>
    </el-form>
   <el-form :model="addSupplierForm" status-icon ref="addSupplierForm" label-width="150px">
        <el-form-item label="名称：" prop="supName">
                <el-input v-model="addSupplierForm.supName"></el-input>
      </el-form-item>
     <el-form-item label="地址：" prop="supAddr">
                <el-input v-model="addSupplierForm.supAddr"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="supTel">
      <el-input v-model="addSupplierForm.supTel"></el-input>
        </el-form-item>
        <el-form-item label="网站：" prop="supInternet">
         <el-input v-model="addSupplierForm.supInternet"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号：" prop="supLicense">
            <el-input v-model="addSupplierForm.supLicense"></el-input>
        </el-form-item>
        <el-form-item label="照片：" prop="supImg">
           <el-upload
            class="avatar-uploader"
            action="/index/upload"
            :auto-upload="true"
            :show-file-list="false"
            :on-success="imageSuccess">
      <img v-if="addSupplierForm.supImg" :src="addSupplierForm.supImg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>
        <el-form-item label="备注：" prop="supRemarks">
              <el-input type="textarea" v-model="addSupplierForm.supRemarks"></el-input>
        </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('addSupplierForm')">重置</el-button>
    <el-button @click="addSupplier('addSupplierForm')">增 加</el-button>      
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
        ]
      },
      users: {
        logPwd: "",
        logTel: "",
        logEmail: "",
        Name: "",
        attribute: ""
      },
      dialogVisible: false,
      addSupplierForm: {
        supName: "",
        supAddr: "",
        supTel: "",
        supInternet: "",
        supLicense: "",
        supImg: "",
        supRemarks: ""
      }
    };
  },
  methods: {
    ...mapActions("supplierModules", ["showSuppliers"]),
    imageSuccess(res, file) {
      this.addSupplierForm.supImg = "/upload/" + res;
    },
    repeatPhone(rules, value, callback) {
      if (value) {
        axios({
          methods: "get",
          url: "/index",
          params: {
            logTel: value
          }
        }).then(({ data }) => {
          console.log(data);
          if (data.data.attribute == "supplier" && data.data.status == 1) {
            axios({
              methods: "get",
              url: "/index/supplier",
              params: {
                usersId: data.data._id
              }
            }).then(({ data }) => {
              if (data.length > 0) {
                callback("该用户已经有供应公司");
              } else {
                callback();
              }
            });
            this.users = data.data;
          } else {
            callback("查无此供应商用户");
          }
        });
      }
    },
    changeShopMaster() {
      console.log(154);
      this.users = {
        logPwd: "",
        logTel: "",
        logEmail: "",
        Name: "",
        attribute: ""
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addSupplier(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/supplier",
            data: {
              ...this.addSupplierForm,
              users: this.users._id,
              status: "1"
            }
          }).then(({ data }) => {
            this.dialogVisible = false;
            this.showSuppliers();
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
.item {
  width: 200px;
}
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