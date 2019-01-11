<template>
<div>
  <el-table :data="suppliers" style="width: 100%" :fit="true" :border="true" :stripe="true" @row-dblclick="dataShopRow">
  <el-table-column prop="users.Name" label="名字" width="70"></el-table-column>
  <el-table-column prop="supName" label="名称"></el-table-column>
  <el-table-column prop="supAddr" label="地址"></el-table-column>
   <el-table-column prop="supTel" label="电话" width="200"></el-table-column>
<el-table-column prop="supInternet" label="网站"></el-table-column>
    <el-table-column prop="supLicense" label="执照号码" width="200"></el-table-column>
    <el-table-column prop="supRemarks" label="备注" width="100"></el-table-column>
    <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="info" size="mini" @click="updataSupplier(scope.row._id)">修 改</el-button>
        <el-button type="info" size="mini" @click="removeSupplier(scope.row._id)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  title="供应商商品信息"
  :visible.sync="Visible"
  width="50%">
  <el-row>
  <el-col :span="24">
    
  </el-col>
</el-row>
</el-dialog>
</div>
</template>



<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      Visible: false,
      supplierInfo: {
        
      }
    };
  },
  computed: {
    ...mapState("supplierModules", ["suppliers"]),
    ...mapState("supplierModules", ["updataVisible"])
  },
  methods: {
    ...mapActions("supplierModules", ["updataSupplierInfo"]),
    ...mapActions("supplierModules", ["showSuppliers"]),
    ...mapMutations("supplierModules", ["setVisible"]),
    updataSupplier(id) {
      this.updataSupplierInfo(id);
      this.setVisible(true);
    },
    removeSupplier(id) {
      axios({
        method: "delete",
        url: "/supplier/" + id
      }).then(({ data }) => {
        this.$alert("删除成功", "提示");
        this.showSuppliers();
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
    dataShopRow(row, event, column) {
      axios({
        method: "get",
        url: "/supplier/" + row._id
      }).then(({ data }) => {
        console.log(data);
        this.supplierInfo = data;
        this.Visible = true;
      });
    }
  },
  components: {}
};
</script>

<style>
.jobs {
  float: left;
  font-size: 16px;
  margin: 20px;
}
.jober {
  margin: 10px;
}
.buju {
  float: left;
  display: flex;
}
.teshu {
  width: 100%;
  font-size: 16px;
  margin: 20px;
}
.card {
  display: flex;
  padding: 10px;
}
.rows {
  width: 100%;
  font-size: 16px;
  margin: 20px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 300px;
  height: 200px;
}
.image1 {
  height: 130px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>