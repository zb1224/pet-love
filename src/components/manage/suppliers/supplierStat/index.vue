<template>
  <div class="box">
    <div>
      <SupplierPurchase></SupplierPurchase>
    </div>
    <div>
      <SupplierSalesVolume></SupplierSalesVolume>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SupplierPurchase from "./SupplierPurchase";
import SupplierSalesVolume from "./SupplierSalesVolume";
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/extension/bmap/bmap";

export default {
  components: {
    SupplierPurchase,
    SupplierSalesVolume
  }
};
</script>

<style>
.box{
  display: flex;
}
</style>
