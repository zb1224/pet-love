<template>
 <div>
     <el-button type="primary" @click="openUnPetMaster" icon="el-icon-circle-plus-outline">黑名单（{{number}}）</el-button>
<el-dialog
  title="黑名单用户"
  :visible.sync="dialogVisible"
  width="80%"
  >
   <el-table :data="unPetMaters" style="width: 100%" :fit="true">
  <el-table-column prop="truthName" label="姓名"></el-table-column>
  <el-table-column prop="masterNickName" label="昵称"></el-table-column>
   <el-table-column prop="masterTel" label="电话"></el-table-column>
   <el-table-column prop="masterAddr" label="地址"></el-table-column>
    <el-table-column prop="region" label="区域"></el-table-column>
    <el-table-column prop="integral" label="积分"></el-table-column>
    <el-table-column fixed="right" label="操作" width="160">
      <template slot-scope="scope">
        <el-button type="info" size="small" @click="passPetMasters(scope.row)">洗 白</el-button>
        <el-button type="info" size="small" @click="unPassPetMasters(scope.row._id)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <span slot="footer" class="dialog-footer">     
    <el-button @click="dialogVisible = false">关 闭</el-button>
  </span>
</el-dialog>
 </div>
</template>


<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  mounted() {
    this.showUnPetMastersNum();
  },
  computed: {
    ...mapState("petMasterModules", ["unPetMaters", "unPetMatersPagination","number"])
  },
  methods: {
    ...mapActions("petMasterModules", ["showPetMasters", "showUnPetMasters","showUnPetMastersNum"]),
    openUnPetMaster(){
        this.dialogVisible = true
        this.showUnPetMasters();
    },
    passPetMasters(data) {
      axios({
        method: "put",
        url: "/petMaster/" + data._id,
        data: {
          ...data,
          status: "1"
        }
      }).then(({ data }) => {
        this.showUnPetMasters();
        this.showPetMasters();
        this.showUnPetMastersNum();
      });
    },
    unPassPetMasters(id) {
      axios({
        method: "delete",
        url: "/petMaster/" + id
      }).then(({ data }) => {
        this.showUnPetMasters();
        this.showUnPetMastersNum();
      });
    },
    statusFormatter(row, column) {
      let status = row.status;
      if (status == 0) {
        return "未通过";
      } else {
        return "已通过";
      }
    }
  }
};
</script>

<style scoped>
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