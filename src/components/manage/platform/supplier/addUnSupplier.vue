<template>
 <div>
     <el-button type="primary" @click="dialogVisible = true" icon="el-icon-circle-plus-outline">待审核（{{unSuppliers.length}}）</el-button>
<el-dialog
  title="待审核用户"
  :visible.sync="dialogVisible"
  width="80%"
  >
   <el-table :data="unSuppliers" style="width: 100%" :fit="true" :border="true" :stripe="true">
  <el-table-column prop="users.Name" label="名字" width="70"></el-table-column>
  <el-table-column prop="supName" label="名称"></el-table-column>
  <el-table-column prop="supAddr" label="地址"></el-table-column>
   <el-table-column prop="supTel" label="电话" width="200"></el-table-column>
<el-table-column prop="supInternet" label="网站"></el-table-column>
    <el-table-column prop="supLicense" label="执照号码" width="200"></el-table-column>
    <el-table-column prop="supRemarks" label="备注" width="100"></el-table-column>
    <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="info" size="mini" @click="passSupplier(scope.row)">通 过</el-button>
        <el-button type="info" size="mini" @click="unpassSupplier(scope.row._id)">删 除</el-button>
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
      unSuppliers: [],
      unSuppliersPagination: {
        curpage: 1,
        eachpage: 5
      }
    };
  },
  mounted() {
    this.showUnSuppliers();
  },
  computed: {},
  methods: {
    ...mapActions("supplierModules", ["showSuppliers"]),
    showUnSuppliers() {
      axios({
        methods: "get",
        url: "/supplier",
        params: {
          page: this.unSuppliersPagination.curpage,
          rows: this.unSuppliersPagination.eachpage,
          type: "status",
          text: "0"
        }
      }).then(({ data }) => {
        console.log("456", data);
        this.unSuppliers = data.rows;
        this.unSuppliersPagination = data;
      });
    },
    passSupplier(data) {
        console.log(data)
      axios({
        method: "put",
        url: "/supplier/" + data._id,
        data: {
          ...data,
          users:data.users._id,
          status: "1"
        }
      }).then(({ data }) => {
        this.showUnSuppliers();
        this.showSuppliers();
      });
    },
    unpassSupplier(id) {
      axios({
        method: "delete",
        url: "/supplier/" + id
      }).then(({ data }) => {
        this.showUnSuppliers();
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