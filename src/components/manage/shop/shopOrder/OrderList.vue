<template>
  <el-table :data="orders" border style="width: 1050px">
    <el-table-column label="订单号" width="200" prop="_id"></el-table-column>
    <el-table-column label="订单内容" width="100" prop="orderContent"></el-table-column>
    <el-table-column label="商品（服务）数量" width="150" prop="orderCommoditys.length"></el-table-column>
    <el-table-column label="订单状态" width="100" prop="orderStatus"></el-table-column>
    <el-table-column label="订单时间" width="100" prop="buyTime"></el-table-column>
    <el-table-column label="买家" width="200" prop="petMasterID"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope" width="200">
        <el-button size="mini" @click="inquire(scope.$index, scope.row)">查询</el-button>
        <el-button size="mini" @click="update(scope.$index, scope.row)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers} from "vuex";

const { mapState, mapMutations,mapActions } = createNamespacedHelpers("shopOrderModule");
export default {
  data() {
    return {};
  },

  // 取出首页的存的数据拿出来渲染表格
  computed: {
    ...mapState(["orders"])
  },
  // 查询和修改的的设置，并把当前的订单（当前选择的那个）信息加入仓库，在后面直接调用
  methods: {
    ...mapMutations(["setUpdateVisible", "setInquireVisible", "setOrder"]),
    ...mapActions(["updateinfo"]),
    inquire(index, row) {
      this.setOrder(row);
      this.setInquireVisible(true);
    },
    update(index, row) {
      // this.setOrder(row);
      this.updateinfo(row)
      this.setUpdateVisible(true);
    }
  }
};
</script>

<style scoped>
</style>

