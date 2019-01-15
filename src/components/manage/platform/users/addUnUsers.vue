<template>
 <div>
     <el-button type="primary" @click="openUnusers" icon="el-icon-circle-plus-outline">待审核（{{number}}）</el-button>
<el-dialog
  title="待审核用户"
  :visible.sync="dialogVisible"
  width="80%"
  >
   <el-table :data="unUsers" style="width: 100%" :fit="true">
    <el-table-column prop="Name" label="昵称"></el-table-column>
    <el-table-column prop="logTel" label="电话"></el-table-column>
    <el-table-column prop="logEmail" label="邮箱"></el-table-column>
    <el-table-column prop="attribute" label="身份" :formatter="attributeFormatter"></el-table-column>
    <el-table-column prop="status" label="状态" :formatter="statusFormatter"></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button type="info" size="small" @click="passUser(scope.row)">通 过</el-button>
        <el-button type="info" size="small" @click="unpassUser(scope.row._id)">取 消</el-button>
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
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible: false,
      number: 0,
      unUsers: [],
      unUsersPagination: {
        curpage: 1,
        eachpage: 5
      }
    };
  },
  mounted() {
    this.showUnUserNum();
  },
  computed: {},
  methods: {
    ...mapActions("userModules", ["showUsers"]),
    openUnusers() {
      this.dialogVisible = true;
      this.showUnUser();
    },
    showUnUserNum() {
      axios({
        methods: "get",
        url: "/users/unusers",
        params: {
          type: "status",
          text: "0"
        }
      }).then(({ data }) => {
        console.log("777", data);
        this.number = data.length;
      });
    },
    showUnUser() {
      axios({
        methods: "get",
        url: "/users",
        params: {
          page: this.unUsersPagination.curpage,
          rows: this.unUsersPagination.eachpage,
          type: "status",
          text: "0"
        }
      }).then(({ data }) => {
        console.log("456", data);
        this.unUsers = data.rows;
        this.unUsersPagination = data;
      });
    },
    passUser(data) {
      axios({
        method: "put",
        url: "/users/" + data._id,
        data: {
          ...data,
          status: "1"
        }
      }).then(({ data }) => {
        this.showUnUser();
        this.showUsers();
        this.showUnUserNum();
      });
    },
    unpassUser(id) {
      axios({
        method: "delete",
        url: "/users/" + id
      }).then(({ data }) => {
        this.showUnUser();
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