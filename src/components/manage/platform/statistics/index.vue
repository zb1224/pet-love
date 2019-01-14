<template>
  <div>
    <el-radio-group v-model="type" @change="showChart">
      <el-radio-button label="商品的销售总额"></el-radio-button>
      <el-radio-button label="服务的销售总额"></el-radio-button>
    </el-radio-group>
    <el-dropdown>
      <el-select v-model="years" placeholder="请选择年份" @change="showChart">
        <el-option
          v-for="item in yearList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-dropdown>
    <div class="chartAll">
      <div class="myChart" id="myChart" ref="myChart"></div>
      <div class="myChart" id="myChart_2" ref="myChart_2"></div>
      <div class="myChart" id="myChart_3" ref="myChart_3"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";

// 引入提示框组件、标题组件、图例组件。
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";

import axios from "axios";

export default {
  data() {
    return {
      type: "商品的销售总额",
      years: "2019",

      yearList: [
        {
          value: "2019",
          label: "2019年"
        },
        {
          value: "2018",
          label: "2018年"
        },
        {
          value: "2017",
          label: "2017年"
        },
        {
          value: "2016",
          label: "2016年"
        },
        {
          value: "2015",
          label: "2015年"
        }
      ],

      monthlyAmount: [],
      seasonAmount: [],
      yearAmount: [],
      
      yearData: [],

      januarySalesData: [],
      februarySalesData: [],
      marchSalesData: [],
      aprilSalesData: [],
      maySalesData: [],
      juneSalesData: [],
      julySalesData: [],
      augustSalesData: [],
      septemberSalesData: [],
      octoberSalesData: [],
      novemberSalesData: [],
      decemberSalesData: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showChart();
    });
  },

  methods: {
    showChart() {
      let myChart = echarts.init(this.$refs.myChart);
      let myChart_2 = echarts.init(this.$refs.myChart_2);
      let myChart_3 = echarts.init(this.$refs.myChart_3);

      if (this.type == "商品的销售总额") {
        axios({
          method: "get",
          url: "/orders",
          params: {
            type: "buyTime",
            value: this.years
          }
        }).then(({ data }) => {
          if (data.length == 0) {
            this.$alert("没有这一年的数据", "消息");
            this.monthlyAmount = [];
            this.seasonAmount = [];
            myChart.setOption(this.commodityOptions_month, true);
            myChart_2.setOption(this.commodityOptions_season, true);
          } else {
            this.monthlyAmount = [];
            this.seasonAmount = [];
            for (let i = 0; i < data.length; i++) {
              if (data[i].orderContent == "购买商品") {
                let month = data[i].buyTime.split("/")[1];
                if (month == 1) {
                  let januarySales = 0;
                  for (let a = 0; a < data[i].orderCommoditys.length; a++) {
                    januarySales +=
                      data[i].orderCommoditys[a].commodityCondition *
                      data[i].orderCommoditys[a].commodityPrice;
                  }
                  this.januarySalesData.push(januarySales);
                } else if (month == 2) {
                  let februarySales = 0;
                  for (let b = 0; b < data[i].orderCommoditys.length; b++) {
                    februarySales +=
                      data[i].orderCommoditys[b].commodityCondition *
                      data[i].orderCommoditys[b].commodityPrice;
                  }
                  this.februarySalesData.push(februarySales);
                } else if (month == 3) {
                  let marchSales = 0;
                  for (let c = 0; c < data[i].orderCommoditys.length; c++) {
                    marchSales +=
                      data[i].orderCommoditys[c].commodityCondition *
                      data[i].orderCommoditys[c].commodityPrice;
                  }
                  this.marchSalesData.push(marchSales);
                } else if (month == 4) {
                  let aprilSales = 0;
                  for (let d = 0; d < data[i].orderCommoditys.length; d++) {
                    aprilSales +=
                      data[i].orderCommoditys[d].commodityCondition *
                      data[i].orderCommoditys[d].commodityPrice;
                  }
                  this.aprilSalesData.push(aprilSales);
                } else if (month == 5) {
                  let maySales = 0;
                  for (let e = 0; e < data[i].orderCommoditys.length; e++) {
                    maySales +=
                      data[i].orderCommoditys[e].commodityCondition *
                      data[i].orderCommoditys[e].commodityPrice;
                  }
                  this.maySalesData.push(maySales);
                } else if (month == 6) {
                  let juneSales = 0;
                  for (let f = 0; f < data[i].orderCommoditys.length; f++) {
                    juneSales +=
                      data[i].orderCommoditys[f].commodityCondition *
                      data[i].orderCommoditys[f].commodityPrice;
                  }
                  this.juneSalesData.push(juneSales);
                } else if (month == 7) {
                  let julySales = 0;
                  for (let g = 0; g < data[i].orderCommoditys.length; g++) {
                    julySales +=
                      data[i].orderCommoditys[g].commodityCondition *
                      data[i].orderCommoditys[g].commodityPrice;
                  }
                  this.julySalesData.push(julySales);
                } else if (month == 8) {
                  let augustSales = 0;
                  for (let h = 0; h < data[i].orderCommoditys.length; h++) {
                    augustSales +=
                      data[i].orderCommoditys[h].commodityCondition *
                      data[i].orderCommoditys[h].commodityPrice;
                  }
                  this.augustSalesData.push(augustSales);
                } else if (month == 9) {
                  let septemberSales = 0;
                  for (let j = 0; j < data[i].orderCommoditys.length; j++) {
                    septemberSales +=
                      data[i].orderCommoditys[j].commodityCondition *
                      data[i].orderCommoditys[j].commodityPrice;
                  }
                  this.septemberSalesData.push(septemberSales);
                } else if (month == 10) {
                  let octoberSales = 0;
                  for (let k = 0; k < data[i].orderCommoditys.length; k++) {
                    octoberSales +=
                      data[i].orderCommoditys[k].commodityCondition *
                      data[i].orderCommoditys[k].commodityPrice;
                  }
                  this.octoberSalesData.push(octoberSales);
                } else if (month == 11) {
                  let novemberSales = 0;
                  for (let l = 0; l < data[i].orderCommoditys.length; l++) {
                    novemberSales +=
                      data[i].orderCommoditys[l].commodityCondition *
                      data[i].orderCommoditys[l].commodityPrice;
                  }
                  this.novemberSalesData.push(novemberSales);
                } else if (month == 12) {
                  let decemberSales = 0;
                  for (let m = 0; m < data[i].orderCommoditys.length; m++) {
                    decemberSales +=
                      data[i].orderCommoditys[m].commodityCondition *
                      data[i].orderCommoditys[m].commodityPrice;
                  }
                  this.decemberSalesData.push(decemberSales);
                }
              }
            }
            // console.log(this.years);
            this.yearData.push(this.years);
            // 将所有月份订单加入各月集合后进行每月总金额计算
            this.CalculatingMoney();
            myChart.setOption(this.commodityOptions_month, true);
            myChart_2.setOption(this.commodityOptions_season, true);
            myChart_3.setOption(this.commodityOptions_year, true);
          }
        });
      } else if (this.type == "服务的销售总额") {
        axios({
          method: "get",
          url: "/orders",
          params: {
            type: "buyTime",
            value: this.years
          }
        }).then(({ data }) => {
          if (data.length == 0) {
            this.$alert("没有这一年的数据", "消息");
            this.monthlyAmount = [];
            this.seasonAmount = [];
            myChart.setOption(this.commodityOptions_month, true);
            myChart_2.setOption(this.commodityOptions_season, true);
          } else {
            this.monthlyAmount = [];
            this.seasonAmount = [];
            for (let i = 0; i < data.length; i++) {
              if (data[i].orderContent == "购买服务") {
                let month = data[i].buyTime.split("/")[1];
                if (month == 1) {
                  let januarySales = 0;
                  for (let a = 0; a < data[i].orderCommoditys.length; a++) {
                    januarySales += data[i].orderCommoditys[a].commodityPrice;
                  }
                  this.januarySalesData.push(januarySales);
                } else if (month == 2) {
                  let februarySales = 0;
                  for (let b = 0; b < data[i].orderCommoditys.length; b++) {
                    februarySales += data[i].orderCommoditys[b].commodityPrice;
                  }
                  this.februarySalesData.push(februarySales);
                } else if (month == 3) {
                  let marchSales = 0;
                  for (let c = 0; c < data[i].orderCommoditys.length; c++) {
                    marchSales += data[i].orderCommoditys[c].commodityPrice;
                  }
                  this.marchSalesData.push(marchSales);
                } else if (month == 4) {
                  let aprilSales = 0;
                  for (let d = 0; d < data[i].orderCommoditys.length; d++) {
                    aprilSales += data[i].orderCommoditys[d].commodityPrice;
                  }
                  this.aprilSalesData.push(aprilSales);
                } else if (month == 5) {
                  let maySales = 0;
                  for (let e = 0; e < data[i].orderCommoditys.length; e++) {
                    maySales += data[i].orderCommoditys[e].commodityPrice;
                  }
                  this.maySalesData.push(maySales);
                } else if (month == 6) {
                  let juneSales = 0;
                  for (let f = 0; f < data[i].orderCommoditys.length; f++) {
                    juneSales += data[i].orderCommoditys[f].commodityPrice;
                  }
                  this.juneSalesData.push(juneSales);
                } else if (month == 7) {
                  let julySales = 0;
                  for (let g = 0; g < data[i].orderCommoditys.length; g++) {
                    julySales += data[i].orderCommoditys[g].commodityPrice;
                  }
                  this.julySalesData.push(julySales);
                } else if (month == 8) {
                  let augustSales = 0;
                  for (let h = 0; h < data[i].orderCommoditys.length; h++) {
                    augustSales += data[i].orderCommoditys[h].commodityPrice;
                  }
                  this.augustSalesData.push(augustSales);
                } else if (month == 9) {
                  let septemberSales = 0;
                  for (let j = 0; j < data[i].orderCommoditys.length; j++) {
                    septemberSales += data[i].orderCommoditys[j].commodityPrice;
                  }
                  this.septemberSalesData.push(septemberSales);
                } else if (month == 10) {
                  let octoberSales = 0;
                  for (let k = 0; k < data[i].orderCommoditys.length; k++) {
                    octoberSales += data[i].orderCommoditys[k].commodityPrice;
                  }
                  this.octoberSalesData.push(octoberSales);
                } else if (month == 11) {
                  let novemberSales = 0;
                  for (let l = 0; l < data[i].orderCommoditys.length; l++) {
                    novemberSales += data[i].orderCommoditys[l].commodityPrice;
                  }
                  this.novemberSalesData.push(novemberSales);
                } else if (month == 12) {
                  let decemberSales = 0;
                  for (let m = 0; m < data[i].orderCommoditys.length; m++) {
                    decemberSales += data[i].orderCommoditys[m].commodityPrice;
                  }
                  this.decemberSalesData.push(decemberSales);
                }
              }
            }
            // 将所有月份订单加入各月集合后进行每月总金额计算
            this.CalculatingMoney();
            myChart.setOption(this.serviceOptions_month, true);
            myChart_2.setOption(this.serviceOptions_season, true);
            myChart_3.setOption(this.serviceOptions_year, true);
          }
        });
      }
    },
    // 计算每月的销售额
    CalculatingMoney() {
      let januaryAll = 0,
        februaryAll = 0,
        marchAll = 0,
        aprilAll = 0,
        mayAll = 0,
        juneAll = 0,
        julyAll = 0,
        augustAll = 0,
        septemberAll = 0,
        octoberAll = 0,
        novemberAll = 0,
        decemberAll = 0;

      for (let i = 0; i < this.januarySalesData.length; i++) {
        januaryAll += this.januarySalesData[i];
      }
      this.monthlyAmount.push(januaryAll);
      for (let i = 0; i < this.februarySalesData.length; i++) {
        februaryAll += this.februarySalesData[i];
      }
      this.monthlyAmount.push(februaryAll);
      for (let i = 0; i < this.marchSalesData.length; i++) {
        marchAll += this.marchSalesData[i];
      }
      this.monthlyAmount.push(marchAll);
      this.seasonAmount.push(januaryAll + februaryAll + marchAll);

      for (let i = 0; i < this.aprilSalesData.length; i++) {
        aprilAll += this.aprilSalesData[i];
      }
      this.monthlyAmount.push(aprilAll);
      for (let i = 0; i < this.maySalesData.length; i++) {
        mayAll += this.maySalesData[i];
      }
      this.monthlyAmount.push(mayAll);
      for (let i = 0; i < this.juneSalesData.length; i++) {
        juneAll += this.juneSalesData[i];
      }
      this.monthlyAmount.push(juneAll);
      this.seasonAmount.push(aprilAll + mayAll + juneAll);

      for (let i = 0; i < this.julySalesData.length; i++) {
        julyAll += this.julySalesData[i];
      }
      this.monthlyAmount.push(julyAll);
      for (let i = 0; i < this.augustSalesData.length; i++) {
        augustAll += this.augustSalesData[i];
      }
      this.monthlyAmount.push(augustAll);
      for (let i = 0; i < this.septemberSalesData.length; i++) {
        septemberAll += this.septemberSalesData[i];
      }
      this.monthlyAmount.push(septemberAll);
      this.seasonAmount.push(julyAll + augustAll + septemberAll);

      for (let i = 0; i < this.octoberSalesData.length; i++) {
        octoberAll += this.octoberSalesData[i];
      }
      this.monthlyAmount.push(octoberAll);
      for (let i = 0; i < this.novemberSalesData.length; i++) {
        novemberAll += this.novemberSalesData[i];
      }
      this.monthlyAmount.push(novemberAll);
      for (let i = 0; i < this.decemberSalesData.length; i++) {
        decemberAll += this.decemberSalesData[i];
      }
      this.monthlyAmount.push(decemberAll);
      this.seasonAmount.push(octoberAll + novemberAll + decemberAll);
      this.yearAmount.push(
        januaryAll +
          februaryAll +
          marchAll +
          aprilAll +
          mayAll +
          juneAll +
          julyAll +
          augustAll +
          septemberAll +
          octoberAll +
          novemberAll +
          decemberAll
      );
      (this.januarySalesData = []),
        (this.februarySalesData = []),
        (this.marchSalesData = []),
        (this.aprilSalesData = []),
        (this.maySalesData = []),
        (this.juneSalesData = []),
        (this.julySalesData = []),
        (this.augustSalesData = []),
        (this.septemberSalesData = []),
        (this.octoberSalesData = []),
        (this.novemberSalesData = []),
        (this.decemberSalesData = []);
    }
  },
  // 图表
  computed: {
    commodityOptions_month() {
      return {
        title: {
          text: "商品每月销售总额"
        },
        tooltip: {},
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: this.monthlyAmount
          }
        ]
      };
    },
    commodityOptions_season() {
      return {
        title: {
          text: "商品每季销售总额"
        },
        tooltip: {},
        xAxis: {
          data: ["春季", "夏季", "秋季", "冬季"]
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: this.seasonAmount
          }
        ]
      };
    },
    commodityOptions_year() {
      return {
        title: {
          text: "商品每年销售总额"
        },
        tooltip: {},
        xAxis: {
          data: this.yearData
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: this.yearAmount
          }
        ]
      };
    },
    serviceOptions_month() {
      return {
        title: {
          text: "服务每月销售总额"
        },
        tooltip: {},
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: this.monthlyAmount
          }
        ]
      };
    },
    serviceOptions_season() {
      return {
        title: {
          text: "服务每季销售总额"
        },
        tooltip: {},
        xAxis: {
          data: ["春季", "夏季", "秋季", "冬季"]
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: this.seasonAmount
          }
        ]
      };
    },
    serviceOptions_year() {
      return {
        title: {
          text: "服务每年销售总额"
        },
        tooltip: {},
        xAxis: {
          data: this.yearData
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: this.yearAmount
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
.chartAll {
  display: flex;
}
.myChart {
  width: 30%;
  height: 500px;
}
</style>
