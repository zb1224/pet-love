<template>
<div>
  <el-table :data="shops" style="width: 100%" :fit="true" :border="true" :stripe="true" @row-dblclick="dataShopRow">
  <el-table-column prop="shopName" label="店名"></el-table-column>
  <el-table-column prop="users.Name" label="店主" width="70"></el-table-column>
  <el-table-column prop="LicenseNumber" label="营业执照号"></el-table-column>
  <el-table-column prop="city" label="城市"></el-table-column>
   <el-table-column prop="addr" label="地址"></el-table-column>
    <el-table-column prop="legalPerson" label="法人"></el-table-column>
    <el-table-column prop="Tel" label="电话"></el-table-column>
    <el-table-column prop="characteristic" label="特色" width="100"></el-table-column>
     <el-table-column prop="VIPLeve" label="VIP等级" width="50"></el-table-column>
    <el-table-column prop="status" label="状态" :formatter="statusFormatter" width="70"></el-table-column>
    <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="info" size="mini" @click="updataShop(scope.row._id)">修 改</el-button>
        <el-button type="info" size="mini" @click="removeShop(scope.row._id)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  title="店铺商品信息及订单详情"
  :visible.sync="Visible"
  width="80%">
  <el-row>
  <el-col :span="12">
    <el-row>
商品详情
    </el-row>
  </el-col>
  <el-col :span="12">
    <el-row>
      订单详情
    </el-row>
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
      shopInfo: {}
    };
  },
  computed: {
    ...mapState("shopModules", ["shops"]),
    ...mapState("shopModules", ["updataVisible"])
  },
  methods: {
    ...mapActions("shopModules", ["updataShopInfo"]),
    ...mapActions("shopModules", ["showShops"]),
    ...mapMutations("shopModules", ["setVisible"]),
    updataShop(id) {
      this.updataShopInfo(id);
      this.setVisible(true);
    },
    removeShop(id) {
      axios({
        method: "delete",
        url: "/shop/" + id
      }).then(({ data }) => {
        this.$alert("删除成功", "提示");
        this.showShops();
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
      console.log(row)
      axios({
        method: "get",
        url: "/shopCom",
        params:{
          shopId:row._id,
        }
      }).then(({ data }) => {
        console.log("2131423",data);
        this.shopInfo = data;
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