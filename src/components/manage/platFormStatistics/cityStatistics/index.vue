<template>
    <div>
        <el-radio-group v-model="type" @change="changeType">
          <div class="yangshi1">
          <div @click="getData1">
              <el-radio-button label="各个城市商品销量"></el-radio-button>
          </div>
           <div @click="getData2">
              <el-radio-button label="各个城市服务销量"></el-radio-button>
            </div>
            </div>
         </el-radio-group>
        <div><el-radio-group v-if="type" v-model="type1" @change="type2=''">
            <el-radio-button label="按月份统计"></el-radio-button>
            <el-radio-button label="按季度统计"></el-radio-button>
            <el-radio-button label="按年份统计"></el-radio-button>
        </el-radio-group></div>
        <div><el-radio-group v-if="type1=='按月份统计'" v-model="type2" @change="changeMonth">
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
        </el-radio-group></div>
        <div><el-radio-group v-if="type1=='按季度统计'" v-model="type2" @change="changeSeason">
            <el-radio-button label="第一季度"></el-radio-button>
            <el-radio-button label="第二季度"></el-radio-button>
            <el-radio-button label="第三季度"></el-radio-button>
            <el-radio-button label="第四季度"></el-radio-button>
        </el-radio-group></div>
        <div><el-radio-group v-if="type1=='按年份统计'" v-model="type2" @change="changeYear">
            <el-radio-button label="2018年"></el-radio-button>
            <el-radio-button label="2019年"></el-radio-button>
    </el-radio-group></div>
        <div class="total" id="content" ref="content"></div>
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
import "echarts/extension/bmap/bmap";
import axios from "axios";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      type: "",
      type1: "",
      type2: "",
      cityComData: [],
      cityServeData: [],
      cityArr: [],
      cityServeArr: [],
      cityComArr: []
    };
  },
  mounted() {
    this.show();
  },
  methods: {
    getData1() {
      this.type1=""
      this.type2=""
      let content = echarts.init(this.$refs.content);
      content.setOption(this.comOptions, false);  
      if (this.type == "各个城市商品销量") {
        this.show();
      }
    },
    getData2() {
      this.type1=""
      this.type2=""
      let content = echarts.init(this.$refs.content);
      content.setOption(this.serveOptions, false);
      if (this.type == "各个城市服务销量") {
        this.show();
      }
    },
    show() {
      if (this.type == "各个城市商品销量") {
        axios({
          url: "/orders/statistics",
          method: "get",
          params: {
            type: "Com"
          }
        }).then(({ data }) => {
          console.log("各个城市商品销量", data);
          this.cityComData = data;
        });
      } else if (this.type == "各个城市服务销量") {
        axios({
          url: "/orders/statistics",
          method: "get",
          params: {
            type: "Serve"
          }
        }).then(({ data }) => {
          console.log("各个城市服务销量", data);
          this.cityServeData = data;
        });
      }
    },
    changeType() {
      this.type1 = "";
      this.type2 = "";
      this.show();
    },
    changeMonth() {
      let content = echarts.init(this.$refs.content);
      let cityArr = [];
      if (this.type == "各个城市商品销量") {
        let cityComArr = [];
        if (this.type2 == "1月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month1
            });
          });
        } else if (this.type2 == "2月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month2
            });
          });
        } else if (this.type2 == "3月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month3
            });
          });
        } else if (this.type2 == "4月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month4
            });
          });
        } else if (this.type2 == "5月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month5
            });
          });
        } else if (this.type2 == "6月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month6
            });
          });
        } else if (this.type2 == "7月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month7
            });
          });
        } else if (this.type2 == "8月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month8
            });
          });
        } else if (this.type2 == "9月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month9
            });
          });
        } else if (this.type2 == "10月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month10
            });
          });
        } else if (this.type2 == "11月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month11
            });
          });
        } else if (this.type2 == "12月") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value: item.year2019.month12
            });
          });
        }
        this.cityArr = cityArr;
        this.cityComArr = cityComArr;
        content.setOption(this.comOptions, true);
      } else {
        let cityServeArr = [];
        if (this.type2 == "1月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month1
            });
          });
        } else if (this.type2 == "2月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month2
            });
          });
        } else if (this.type2 == "3月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month3
            });
          });
        } else if (this.type2 == "4月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month4
            });
          });
        } else if (this.type2 == "5月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month5
            });
          });
        } else if (this.type2 == "6月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month6
            });
          });
        } else if (this.type2 == "7月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month7
            });
          });
        } else if (this.type2 == "8月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month8
            });
          });
        } else if (this.type2 == "9月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month9
            });
          });
        } else if (this.type2 == "10月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month10
            });
          });
        } else if (this.type2 == "11月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month11
            });
          });
        } else if (this.type2 == "12月") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value: item.year2019.month12
            });
          });
        }
        this.cityArr = cityArr;
        this.cityServeArr = cityServeArr;
        content.setOption(this.serveOptions, true);
      }
    },
    changeSeason() {
      let content = echarts.init(this.$refs.content);
      let cityArr = [];
      if (this.type == "各个城市商品销量") {
        let cityComArr = [];
        if (this.type2 == "第一季度") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value:
                item.year2019.month1 +
                item.year2019.month2 +
                item.year2019.month3
            });
          });
        } else if (this.type2 == "第二季度") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value:
                item.year2019.month4 +
                item.year2019.month5 +
                item.year2019.month6
            });
          });
        } else if (this.type2 == "第三季度") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value:
                item.year2019.month7 +
                item.year2019.month8 +
                item.year2019.month9
            });
          });
        } else if (this.type2 == "第四季度") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value:
                item.year2019.month10 +
                item.year2019.month11 +
                item.year2019.month12
            });
          });
        }
        this.cityArr = cityArr;
        this.cityComArr = cityComArr;
        content.setOption(this.comOptions, true);
      } else {
        let cityServeArr = [];
        if (this.type2 == "第一季度") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value:
                item.year2019.month1 +
                item.year2019.month2 +
                item.year2019.month3
            });
          });
        } else if (this.type2 == "第二季度") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value:
                item.year2019.month4 +
                item.year2019.month5 +
                item.year2019.month6
            });
          });
        } else if (this.type2 == "第三季度") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value:
                item.year2019.month7 +
                item.year2019.month8 +
                item.year2019.month9
            });
          });
        } else if (this.type2 == "第四季度") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value:
                item.year2019.month10 +
                item.year2019.month11 +
                item.year2019.month12
            });
          });
        }
        this.cityArr = cityArr;
        this.cityServeArr = cityServeArr;
        content.setOption(this.serveOptions, true);
      }
    },
    changeYear() {
      let content = echarts.init(this.$refs.content);
      let cityArr = [];
      if (this.type == "各个城市商品销量") {
        let cityComArr = [];
        if (this.type2 == "2018年") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value:
                item.year2018.month1 +
                item.year2018.month2 +
                item.year2018.month3 +
                item.year2018.month4 +
                item.year2018.month5 +
                item.year2018.month6 +
                item.year2018.month7 +
                item.year2018.month8 +
                item.year2018.month9 +
                item.year2018.month10 +
                item.year2018.month11 +
                item.year2018.month12
            });
          });
          console.log(cityComArr);
        } else if (this.type2 == "2019年") {
          this.cityComData.forEach(function(item) {
            cityArr.push(item.city);
            cityComArr.push({
              name: item.city,
              value:
                item.year2019.month1 +
                item.year2019.month2 +
                item.year2019.month3 +
                item.year2019.month4 +
                item.year2019.month5 +
                item.year2019.month6 +
                item.year2019.month7 +
                item.year2019.month8 +
                item.year2019.month9 +
                item.year2019.month10 +
                item.year2019.month11 +
                item.year2019.month12
            });
          });
        }
        this.cityArr = cityArr;
        this.cityComArr = cityComArr;
        content.setOption(this.comOptions, true);
      } else {
        let cityServeArr = [];
        if (this.type2 == "2018年") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value:
                item.year2018.month1 +
                item.year2018.month2 +
                item.year2018.month3 +
                item.year2018.month4 +
                item.year2018.month5 +
                item.year2018.month6 +
                item.year2018.month7 +
                item.year2018.month8 +
                item.year2018.month9 +
                item.year2018.month10 +
                item.year2018.month11 +
                item.year2018.month12
            });
          });
        } else if (this.type2 == "2019年") {
          this.cityServeData.forEach(function(item) {
            cityArr.push(item.city);
            cityServeArr.push({
              name: item.city,
              value:
                item.year2019.month1 +
                item.year2019.month2 +
                item.year2019.month3 +
                item.year2019.month4 +
                item.year2019.month5 +
                item.year2019.month6 +
                item.year2019.month7 +
                item.year2019.month8 +
                item.year2019.month9 +
                item.year2019.month10 +
                item.year2019.month11 +
                item.year2019.month12
            });
          });
        }
        this.cityArr = cityArr;
        this.cityServeArr = cityServeArr;
        content.setOption(this.serveOptions, true);
      }
    }
  },
  computed: {
    comOptions() {
      return {
        title: {
          text: "各个城市商品销量占比",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.cityArr
        },
        series: [
          {
            name: "城市",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.cityComArr,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    },
    serveOptions() {
      return {
        title: {
          text: "各个城市服务销量占比",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.cityArr
        },
        series: [
          {
            name: "城市",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.cityServeArr,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    }
  }
};
</script>


<style scoped>
.total {
  width: 100%;
  height: 400px;
}
.yangshi1{
  display: flex;
}
</style>

