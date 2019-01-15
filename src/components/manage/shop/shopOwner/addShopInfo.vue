<template>
  <div>
    <el-card class="box-card">
      <el-form  status-icon  label-width="100px">
        <el-form-item label="店员信息" prop="singleShop.Employee">
          <el-form-item v-for="(clerk, index) in singleShop.Employee" :label="'店员' + (index+1)" :key="index" :prop="'Employee.' + index">
            <el-input v-model="clerk.name" placeholder="请输入姓名"></el-input>
            <el-select v-model="clerk.job" placeholder="请选择职位">
              <el-option label="店长" value="店长"></el-option>
              <el-option label="店员" value="店员"></el-option>
              <el-option label="后勤人员" value="后勤人员"></el-option>
              <el-option label="实习生" value="实习生"></el-option>
            </el-select>
            <el-input v-model="clerk.tel" placeholder="请输入联系电话"></el-input>
            <el-button @click.prevent="removeclerk(clerk)">删除</el-button>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确认修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "shopOwnerMoudles"
);
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["singleShop"]),
    name: {
      get() {
        return this.singleShop.Employee.name;
      },
      set(value) {
        this.setClerkName(value);
      }
    },
    job: {
      get() {
        return this.singleShop.Employee.job;
      },
      set(value) {
        this.setClerkJob(value);
      }
    },
    tel: {
      get() {
        return this.singleShop.Employee.tel;
      },
      set(value) {
        this.setClerkTel(value);
      }
    }
  },
  methods: {
    ...mapActions(["setSingleShop"]),
    ...mapMutations(["setClerkName"]),
    ...mapMutations(["setClerkJob"]),
    ...mapMutations(["setClerkTel"]),
        removeclerk(item) {
      var index = this.singleShop.Employee.indexOf(item);
      if (index !== -1) {
        this.singleShop.Employee.splice(index, 1);
      }
    },
    addclerk() {
      this.singleShop.Employee.push({
        name: "",
        job: "",
        tel: ""
      });
    },
    //   updateSingleShop() {
    //   let name = this.singleShop.Employee.name;
    //   let job = this.singleShop.Employee.job;
    //   let tel = this.singleShop.Employee.tel;
    //   axios({
    //     method: "put",
    //     url: "/shop/" + "5c358d568c45b31e8c89f90a",
    //     data: {
    //   singleShop
    //     }
    //   }).then(() => {
    //      this.setSingleShop();
    //   });
    // }
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.box-card {
  width: 550px;
  margin: 0 auto;
}
</style>
