<template>
<div>
  <el-table :data="petMasters" style="width: 100%" :fit="true" :border="true" :stripe="true"  @row-dblclick="dataOrdersRow">
  <el-table-column prop="truthName" label="姓名"></el-table-column>
  <el-table-column prop="masterNickName" label="昵称"></el-table-column>
   <el-table-column prop="masterTel" label="电话"></el-table-column>
   <el-table-column prop="masterAddr" label="地址"></el-table-column>
    <el-table-column prop="region" label="区域"></el-table-column>
    <el-table-column prop="integral" label="积分"></el-table-column>
    <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="info" size="mini" @click="updataPetMaster(scope.row._id)">修 改</el-button>
        <el-button type="info" size="mini" @click="blackPetMaster(scope.row)">拉 黑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  title="宠主订单信息"
  :visible.sync="Visible"
  width="80%">
  <el-row>
  <el-col :span="24">
    <el-row>
  <el-table :data="petMasterOrdersInfo" style="width: 100%" :fit="true" :border="true" :stripe="true">
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
      @current-change="ordersChangePage"
      :current-page="petMasterOrdersPagination.current"
      :page-size="petMasterOrdersPagination.eachpage"
      layout="prev, pager, next"
      :total="petMasterOrdersPagination.total">
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
      petMasterOrdersInfo: {},
      rowId: "",
      petMasterOrdersPagination: {
        curpage: 1,
        eachpage: 5
      }
    };
  },
  computed: {
    ...mapState("petMasterModules", ["petMasters", "updataVisible"])
  },
  methods: {
    ...mapActions("petMasterModules", ["updataPetMasterInfo"]),
    ...mapActions("petMasterModules", ["showPetMasters", "showUnPetMasters"]),
    ...mapMutations("petMasterModules", ["setVisible"]),
    updataPetMaster(id) {
      this.updataPetMasterInfo(id);
      this.setVisible(true);
    },
    blackPetMaster(data) {
      axios({
        method: "put",
        url: "/petMaster/" + data._id,
        data: {
          ...data,
          status: "0"
        }
      }).then(({ data }) => {
        this.showPetMasters();
        this.showUnPetMasters();
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
    ordersShow() {
      axios({
        method: "get",
        url: "/orders",
        params: {
          page: this.petMasterOrdersPagination.curpage,
          rows: this.petMasterOrdersPagination.eachpage,
          petMasterId: this.rowId
        }
      }).then(({ data }) => {
        console.log(data);
        this.petMasterOrdersInfo = data.rows;
        this.petMasterOrdersPagination = data;
        this.Visible = true;
      });
    },
    dataOrdersRow(row, event, column) {
      this.rowId = row._id;
      this.ordersShow();
    },
    ordersChangePage(i) {
      console.log(i);
      this.petMasterOrdersPagination.curpage = i;
       this.ordersShow();
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

<style scoped>
</style>