<template>
  <div>
    <el-radio-group v-model="type" @change="showChart">
      <el-radio-button label="销量统计"></el-radio-button>
      <el-radio-button label="销售额统计"></el-radio-button>
    </el-radio-group>
    <div>
      <el-radio-group v-if="type=='销量统计'" v-model="type1">
        <el-radio-button label="各个商品按月份统计"></el-radio-button>
        <el-radio-button label="各个商品按季度统计"></el-radio-button>
        <el-radio-button label="各个商品按年份统计"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <el-radio-group v-if="type=='销量统计'&&type1=='各个商品按月份统计'" v-model="type2" @change="showMonthMoneyChart">
        <el-radio-button label="1月"></el-radio-button>
        <el-radio-button label="2月"></el-radio-button>
        <el-radio-button label="3月"></el-radio-button>
        <el-radio-button label="4月"></el-radio-button>
        <el-radio-button label="5月"></el-radio-button>
        <el-radio-button label="6月"></el-radio-button>
        <el-radio-button label="7月"></el-radio-button>
        <el-radio-button label="8月"></el-radio-button>
        <el-radio-button label="9月"></el-radio-button>
        <el-radio-button label="10月"></el-radio-button>
        <el-radio-button label="11月"></el-radio-button>
        <el-radio-button label="12月"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <el-radio-group v-if="type=='销量统计'&&type1=='各个商品按季度统计'" v-model="type3" @change="showSeasonMoneyChart">
        <el-radio-button label="第一季度"></el-radio-button>
        <el-radio-button label="第二季度"></el-radio-button>
        <el-radio-button label="第三季度"></el-radio-button>
        <el-radio-button label="第四季度"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <el-radio-group v-if="type=='销量统计'&&type1=='各个商品按年份统计'" v-model="type4" @change="showYearMoneyChart">
        <el-radio-button label="2018年"></el-radio-button>
        <el-radio-button label="2019年"></el-radio-button>
      </el-radio-group>
    </div>

    <div class="total" id="myChart" ref="myChart"></div>
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
// import "echarts/extension/bmap/bmap";
import axios from "axios";
const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("shopComModule");
import { createNamespacedHelpers } from "vuex";

export default {
  data() {
    return {
      type: "",
      type1: "",
      type2: "",
      type3: "",
      type4: "",
      comSalesMoneyAxisData: [],
      comSalesMoneySeriesData: [],
      comSalesCountAxisData:[],
      comSalesCountSeriesData:[],
      // comSalesCountAxisData: ["狗粮","猫粮","鱼食","其他"],
      // comSalesCountSeriesData: [{name:"狗粮",value:20},{name:"猫粮",value:0},{name:"鱼食",value:0},{name:"其他",value:0}],
      comSalesCount: [],
      // comSalesCountArr:[],
      zoom: 0
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.showChart();
    // });
    this.getTime();
    this.getSession();
  },

  methods: {
    ...mapActions(["getTime"]),
    ...mapActions(["getSession"]),
    showMonthMoneyChart() {
      console.log("type2",this.type2)
       let myChart = echarts.init(this.$refs.myChart);
      if (this.type2 == "1月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month1
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
        console.log("this.comSalesCountAxisData",comSalesCountAxisDataArr)
        console.log("this.comSalesCountSeriesData",comSalesCountSeriesDataArr)
        
      } else if (this.type2 == "2月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month2
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type2 == "3月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month3
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type2 == "4月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month4
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type2 == "5月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month5
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type2 == "6月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month6
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type2 == "7月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month7
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type2 == "8月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month8
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type2 == "9月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month9
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type2 == "10月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month10
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type2 == "11月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month11
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type2 == "12月") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value: this.comSalesCount[i].year2019.month12
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      }
      myChart.setOption(this.comSalesCountOptions, true);
    },
    showYearMoneyChart() {
      let myChart = echarts.init(this.$refs.myChart);
      if (this.type4 == "2018年") {
           let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value:
              this.comSalesCount[i].year2018.month1+
              this.comSalesCount[i].year2018.month2+
              this.comSalesCount[i].year2018.month3+
              this.comSalesCount[i].year2018.month4+
              this.comSalesCount[i].year2018.month5+
              this.comSalesCount[i].year2018.month6+
              this.comSalesCount[i].year2018.month7+
              this.comSalesCount[i].year2018.month8+
              this.comSalesCount[i].year2018.month9+
              this.comSalesCount[i].year2018.month10+
              this.comSalesCount[i].year2018.month11+
              this.comSalesCount[i].year2018.month12
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      }else if(this.type4 == "2019年"){
                   let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value:
              this.comSalesCount[i].year2019.month1+
              this.comSalesCount[i].year2019.month2+
              this.comSalesCount[i].year2019.month3+
              this.comSalesCount[i].year2019.month4+
              this.comSalesCount[i].year2019.month5+
              this.comSalesCount[i].year2019.month6+
              this.comSalesCount[i].year2019.month7+
              this.comSalesCount[i].year2019.month8+
              this.comSalesCount[i].year2019.month9+
              this.comSalesCount[i].year2019.month10+
              this.comSalesCount[i].year2019.month11+
              this.comSalesCount[i].year2019.month12
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      }
        myChart.setOption(this.comSalesCountOptions, true);
    },
    showSeasonMoneyChart() {
      let myChart = echarts.init(this.$refs.myChart);
      if (this.type3 == "第一季度") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value:
              this.comSalesCount[i].year2019.month1 +
              this.comSalesCount[i].year2019.month2 +
              this.comSalesCount[i].year2019.month3
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type3 == "第二季度") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value:
              this.comSalesCount[i].year2019.month4 +
              this.comSalesCount[i].year2019.month5 +
              this.comSalesCount[i].year2019.month6
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type3 == "第三季度") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value:
              this.comSalesCount[i].year2019.month7 +
              this.comSalesCount[i].year2019.month8 +
              this.comSalesCount[i].year2019.month9
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      } else if (this.type3 == "第四季度") {
        let comSalesCountAxisDataArr = [];
        let comSalesCountSeriesDataArr = [];
        for (let i = 0; i < this.comSalesCount.length; i++) {
          comSalesCountAxisDataArr.push(this.comSalesCount[i].type);
          comSalesCountSeriesDataArr.push({
            name: this.comSalesCount[i].type,
            value:
              this.comSalesCount[i].year2019.month10 +
              this.comSalesCount[i].year2019.month11 +
              this.comSalesCount[i].year2019.month12
          });
        }
        // 商品名称的数组
        this.comSalesCountAxisData = comSalesCountAxisDataArr;
        //各月的销售额统计
        this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
      }
        myChart.setOption(this.comSalesCountOptions, true);
    },
    showChart() {
      console.log("chart");
     
 let myChart = echarts.init(this.$refs.myChart);
      if (this.type == "销量统计") {
        axios({
          url: "/comSalesCount",
          method: "get",
          params: {
            shopId: this.shopId
          }
        }).then(({ data }) => {
          let comSalesCountArr = [];
          // let comSalesCountSeriesDataArr = [];
          // for (let i = 0; i < data.length; i++) {
          //   comSalesCountAxisDataArr.push(data[i].type);
          // }
          comSalesCountArr = data;
          this.comSalesCount = comSalesCountArr;
          // this.comSalesCountSeriesData = comSalesCountSeriesDataArr;
          
          console.log("返回来的数据", data);
        });
      } else if (this.type == "销售额统计") {
        axios({
          url: "/comSalesMoney",
          method: "get",
          params: {
            trueTime: this.trueTime,
            shopId: this.shopId
          }
        }).then(res => {
          console.log("this.trueTime", this.trueTime);
          console.log("this.shopId", this.shopId);
          this.comSalesMoneyAxisData = res.data.axisData;
          this.comSalesMoneySeriesData = res.data.seriesData;
          myChart.setOption(this.comSalesMoneyOpitons, true);
          console.log(this.comSalesMoneyAxisData, this.comSalesMoneySeriesData);
        });
      }
    }
  },
  computed: {
    ...mapState(["trueTime"]),
    ...mapState(["shopId"]),
    comSalesCountOptions() {
      return {
        title: {
          text: "销量的统计图"
        },
        tooltip: {},
        xAxis: {
          data: this.comSalesCountAxisData
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.comSalesCountSeriesData
          }
        ]
      };
    },
    comSalesMoneyOpitons() {
      return {
        title: {
          text: "近六个月的商品销售额统计"
        },
        tooltip: {},
        xAxis: {
          data: this.comSalesMoneyAxisData
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.comSalesMoneySeriesData
          }
        ]
      };
    }
    //    comSalesMoneyOpitons() {
    //     return {
    //         title: {
    //             text: "各个阶段年龄分布",
    //             subtext: "纯属虚构",
    //             x: "center"
    //         },
    //         tooltip: {
    //             trigger: "item",
    //             formatter: "{a} <br/>{b} : {c} ({d}%)"
    //         },
    //         legend: {
    //             orient: "vertical",
    //             left: "left",
    //             data: this.comSalesMoneyAxisData
    //         },
    //         series: [
    //             {
    //                 name: "访问来源",
    //                 type: "pie",
    //                 radius: "55%",
    //                 center: ["50%", "60%"],
    //                 data: this.comSalesMoneySeriesData,
    //                 itemStyle: {
    //                     emphasis: {
    //                         shadowBlur: 10,
    //                         shadowOffsetX: 0,
    //                         shadowColor: "rgba(0, 0, 0, 0.5)"
    //                     }
    //                 }
    //             }
    //         ]
    //     };
    // }
  }
};
</script>
<style scoped>
.total {
  width: 100%;
  height: 500px;
}
</style>