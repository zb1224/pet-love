<template>
  <div>
    <el-card class="box-card">
      <el-form :model="supplier" status-icon :rules="supplier_rules" ref="supplierForm">
        <el-form-item label="供应商编号">
          <span>{{supplier._id}}</span>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model="supplier.supName"></el-input>
        </el-form-item>
        <el-form-item label="供应商地址">
          <el-input v-model="supplier.supAddr"></el-input>
        </el-form-item>
        <el-form-item label="供货商电话">
          <el-input v-model="supplier.supTel"></el-input>
        </el-form-item>
        <el-form-item label="供应商网址">
          <el-input v-model="supplier.supInternet"></el-input>
        </el-form-item>
        <el-form-item label="供应商执照编号">
          <el-input v-model="supplier.supLicense"></el-input>
        </el-form-item>
        <el-form-item label="供应商执照">
          <el-upload
            class="avatar-uploader"
            action="/suppliers/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="supplier.supImg" :src="supplier.supImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input type="textarea" v-model="supplier.supRemarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="perfectInfo('supplierForm')">完善供应商信息！</el-button>
          <el-button>取消</el-button>
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
      user: {},
      supplier: {
        _id: "未注册",
        supName: "",
        supAddr: "",
        supTel: "",
        supInternet: "",
        supLicense: "",
        supImg: "",
        supRemarks: ""
      },
      supplier_rules: {}
    };
  },

  methods: {
    perfectInfo(supplierForm) {
      this.$refs[supplierForm].validate(valid => {
        if (valid) {
          if (this.supplier._id == "未注册") {
            let {
              supName,
              supAddr,
              supTel,
              supInternet,
              supLicense,
              supImg,
              supRemarks
            } = this.supplier;
            axios({
              method: "post",
              url: "/suppliers",
              params: {
                supName,
                supAddr,
                supTel,
                supInternet,
                supLicense,
                supImg,
                supRemarks
              }
            }).then(({ data }) => {
              let supplierId = data._id;
              axios({
                method: "post",
                url: "/suppliers/user",
                params: {
                  _id: this.user._id,
                  supplierId
                }
              }).then(({ data }) => {
                if (data == "suc") {
                  this.$alert("完善数据成功，等待审核", "消息");
                }
              });
            });
          } else {
            let {
              _id,
              supName,
              supAddr,
              supTel,
              supInternet,
              supLicense,
              supImg,
              supRemarks
            } = this.supplier;
            axios({
              method: "put",
              url: "/suppliers/" + _id,
              params: {
                supName,
                supAddr,
                supTel,
                supInternet,
                supLicense,
                supImg,
                supRemarks
              }
            }).then(({ data }) => {
              console.log(data);
            });
          }
        } else {
          this.$alert("输入数据有误，不能完善", "消息");
        }
      });
    },

    handleAvatarSuccess(path) {
      console.log(path);
      this.supplier.supImg = "/upload/" + path;
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    getSession() {
      axios({
        method: "get",
        url: "/index/getSession"
      }).then(({ data }) => {
        // console.log(data);
        if (!data.logTel) {
          this.$router.push("/login");
        } else if (data.logTel) {
          // console.log(data.supplier);
          if (data.supplier == undefined) {
            this.$alert("你的信息还未完善", "消息");
            this.user = data;
          } else {
            axios({
              method: "get",
              url: "/suppliers/" + data.supplier
            }).then(({ data }) => {
              this.supplier = data;
              this.user = data;
            });
          }
        }
      });
    }
  },

  created() {
    axios({
      method: "get",
      url: "/index/getSession"
    }).then(({ data }) => {
      // console.log(data);
      if (!data.logTel) {
        this.$router.push("/login");
      } else if (data.logTel) {
        // console.log(data.supplier);
        if (data.supplier == undefined) {
          this.$alert("你的信息还未完善", "消息");
          this.user = data;
        } else {
          axios({
            method: "get",
            url: "/suppliers/" + data.supplier
          }).then(({ data }) => {
            this.supplier = data;
            this.user = data;
          });
        }
      }
    });
  }
};
</script>

<style scoped>
.box-card {
  width: 520px;
  margin: 10px auto;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: black;
  border: 1px solid lightslategray;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>