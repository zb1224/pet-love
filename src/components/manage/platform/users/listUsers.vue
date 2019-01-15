<template>
  <el-table :data="users" style="width: 100%" :fit="true" :border="true" :stripe="true">
    <el-table-column prop="Name" label="昵称"></el-table-column>
    <el-table-column prop="logTel" label="电话"></el-table-column>
    <el-table-column prop="logEmail" label="邮箱"></el-table-column>
    <el-table-column prop="attribute" label="身份" :formatter="attributeFormatter"></el-table-column>
    <el-table-column prop="status" label="状态" :formatter="statusFormatter"></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button type="info" size="small" @click="updataUser(scope.row._id)">修 改</el-button>
        <el-button type="info" size="small" @click="removeUser(scope.row._id)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>



<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("userModules", ["users"]),
    ...mapState("userModules", ["updataVisible"])
  },
  methods: {
    ...mapActions("userModules", ["updataUserInfo"]),
    ...mapActions("userModules", ["showUsers"]),
    ...mapMutations("userModules", ["setVisible"]),
    updataUser(id) {
      console.log(id);
      this.updataUserInfo(id);
      this.setVisible(true);
    },
    removeUser(id) {
      axios({
        method: "delete",
        url: "/users/" + id
      }).then(({ data }) => {
        this.$alert("删除成功", "提示");
        this.showUsers();
      });
    },
    statusFormatter(row, column) {
      let status = row.status;
      if (status == 0) {
        return "未通过";
      } else {
        return "已通过";
      }
    },
    attributeFormatter(row, column) {
      let attribute = row.attribute;
      if (attribute == "store") {
        return "店主";
      } else if (attribute == "supplier") {
        return "供应商";
      } else {
        return "管理员";
      }
    }
  },
  components: {}
};
</script>

<style>
</style>