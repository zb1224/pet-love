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
  width="90%">
  <el-row class="tab">
  <el-col :span="8">
    <el-row>
      商品操作：
 <el-table :data="comInfo" style="width: 100%" :fit="true" :border="true" :stripe="true">
  <el-table-column prop="comName" label="商品名"></el-table-column>
  <el-table-column prop="supplier.supName" label="供应商"></el-table-column>
  <el-table-column prop="shopComNum" label="数量" width="80"></el-table-column>
    <el-table-column fixed="right" label="操作" width="80">
      <template slot-scope="scope">
        <el-button type="info" size="mini" @click="downShop(scope.row._id)">下架</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      small
      @current-change="comChangePage"
      :current-page="comPagination.current"
      :page-size="comPagination.eachpage"
      layout="prev, pager, next"
      :total="comPagination.total">
    </el-pagination>
  </div>
    </el-row>
  </el-col>
  <el-col :span="14">
    <el-row>
      订单操作：
      <el-table :data="ordersInfo" style="width: 100%" :fit="true" :border="true" :stripe="true">
  <el-table-column prop="petMaster.truthName" label="付款方"  width="100"></el-table-column>
  <el-table-column prop="shop.shopName" label="收款方"></el-table-column>
  <el-table-column prop="orderContent" label="交易内容" width="100"></el-table-column>
  <el-table-column prop="buyTime" label="交易时间" width="100"></el-table-column>
  <el-table-column prop="orderStatus" label="订单状态" width="100"></el-table-column>
    <el-table-column fixed="right" label="是否冻结" width="110" property="status">
       <template slot-scope="scope" >
          <el-switch 
          active-color="#13ce66" 
          inactive-color="#ff4949" 
          active-value="0" 
          inactive-value="1"
          active-text="否" 
          inactive-text="是"
          v-model="scope.row.status" 
          @change=changeSwitch(scope.$index,scope.row)>
          </el-switch>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      small
      @current-change="ordersChangePage"
      :current-page="ordersPagination.current"
      :page-size="ordersPagination.eachpage"
      layout="prev, pager, next"
      :total="ordersPagination.total">
    </el-pagination>
  </div>
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
      comInfo: {},
      ordersInfo: {
        petMaster: "",
        shop: ""
      },
      rowId: "",
      comPagination: {
        curpage: 1,
        eachpage: 5
      },
      ordersPagination: {
        curpage: 1,
        eachpage: 5
      }
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
    comShow() {
      console.log("comShow", this.rowId);
      axios({
        method: "get",
        url: "/shopCom",
        params: {
          page: this.comPagination.curpage,
          rows: this.comPagination.eachpage,
          shopId: this.rowId
        }
      }).then(({ data }) => {
        console.log("2131423", data);
        this.comInfo = data.rows;
        this.comPagination = data;
        this.Visible = true;
      });
    },
    ordersShow() {
      axios({
        method: "get",
        url: "/orders",
        params: {
          page: this.ordersPagination.curpage,
          rows: this.ordersPagination.eachpage,
          shopId: this.rowId
        }
      }).then(({ data }) => {
        console.log("orders", data.rows);
        this.ordersInfo = data.rows;
        this.ordersPagination = data;
        this.Visible = true;
      });
    },
    dataShopRow(row, event, column) {
      console.log("565656", row._id);
      this.rowId = row._id;
      this.comShow();
      this.ordersShow();
    },
    comChangePage(i) {
      console.log(i);
      this.comPagination.curpage = i;
      this.comShow();
    },
    ordersChangePage(i) {
      this.ordersPagination.curpage = i;
      this.ordersShow();
    },
    downShop(id) {
      axios({
        method: "delete",
        url: "/shopCom/" + id
      }).then(({ data }) => {
        this.$alert("下架成功", "提示");
        this.comShow();
      });
    },
    changeSwitch(index, data) {
      console.log(data);
      axios({
        method: "put",
        url: "/orders/" + data._id,
        data: {
          ...data
        }
      }).then(({ data }) => {
        console.log("orders", data);
        this.ordersShow();
      });
    }
  },
  components: {}
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab {
  display: flex;
  justify-content: space-between;
}
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