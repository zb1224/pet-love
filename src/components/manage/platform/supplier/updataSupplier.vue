<template>
    <div>
<el-dialog
  title="修改店铺信息 "
  :visible.sync="updataVisible"
  width="50%">
   <el-form :model="supplier" ref="supplier" status-icon label-width="150px">
      <el-form-item label="供应商姓名：" prop="users.Name">
                <el-input v-model="supplier.users.Name" disabled></el-input>
       </el-form-item>
          <el-form-item label="供应商名称：" prop="supName" required>
                <el-input v-model="supplier.supName"></el-input>
      </el-form-item>
     <el-form-item label="供应商地址：" prop="supAddr" required>
                <el-input v-model="supplier.supAddr"></el-input>
      </el-form-item>
      <el-form-item label="供应商电话：" prop="supTel" required>
      <el-input v-model="supplier.supTel"></el-input>
        </el-form-item>
        <el-form-item label="供应商网站：" prop="supInternet" required>
         <el-input v-model="supplier.supInternet"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码：" prop="supLicense" required>
            <el-input v-model="supplier.supLicense"></el-input>
        </el-form-item>
        <el-form-item label="营业执照照片：" prop="supImg" required>
           <el-upload
            class="avatar-uploader"
            action="/index/upload"
            :auto-upload="true"
            :show-file-list="false"
            :on-success="imageSuccess">
      <img v-if="supplier.supImg" :src="supplier.supImg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>
        <el-form-item label="备注：" prop="supRemarks" required>
              <el-input type="textarea" v-model="supplier.supRemarks"></el-input>
        </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="upDataSupplier('supplier')">修 改</el-button>
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
    ...mapState("supplierModules", ["supplier", "updataVisible"]),
    updataVisible: {
      get() {
        return this.$store.state.supplierModules.updataVisible;
      },
      set(updataVisible) {
        this.$store.commit("supplierModules/setVisible", updataVisible);
      }
    },
    logTel: {
      get() {
        return this.$store.state.supplierModules.supplier.users.logTel;
      },
      set(value) {
        this.$store.commit("supplierModules/setLogTel", value);
      }
    }
  },
  methods: {
    ...mapActions("supplierModules", ["showSuppliers"]),
     imageSuccess(res, file) {
      this.supplier.supImg = "/upload/" + res;
    },
    upDataSupplier(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: "put",
            url: "/supplier/" + this.supplier._id,
            data: {
              ...this.supplier,
              users: this.supplier.users._id
            }
          }).then(({ data }) => {
            this.updataVisible = false;
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
</style>