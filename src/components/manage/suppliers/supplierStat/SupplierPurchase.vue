<template>
    <div>
        <div id="myChart" :style="{width: '450px', height: '500px'}"></div>
    </div>
</template>

<script>
import axios from "axios";
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/extension/bmap/bmap");

export default {
  data() {
    return {
      usersId: "",
      supplierId: "",
      type: "各个店铺的进货量统计"
    };
  },
  created() {
    this.getSession();
    // this.show();
    // this.showChart();
  },
  methods: {
    getSession() {
      axios({
        method: "get",
        url: "/index/getSession"
      }).then(({ data }) => {
        console.log(data, "data000");
        this.usersId = data._id;
        console.log(this.usersId);
        this.show();
      });
    },
    show() {
      axios({
        method: "get",
        url: "/suppliers",
        params: {
          usersId: this.usersId
        }
      }).then(({ data }) => {
        console.log("show里的data", data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].users._id == this.usersId) {
            console.log("id是", data[i]._id);
            this.supplierId = data[i]._id;
            axios({
              method: "get",
              url: "/supplierStat",
              params: {
                supplierId: this.supplierId
              }
            }).then(({ data }) => {
              console.log(data, "通过id查到的数据tt");
              let arr1 = [];
              let arr2 = [];
              for (let i = 0; i < data.length; i++) {
                arr1.push(data[i].name);
                arr2.push(data[i].number);
              }
              let myChart = echarts.init(document.getElementById("myChart"));
              myChart.setOption({
                title: { text: "各商品进货量统计" },
                tooltip: {},
                xAxis: {
                  data: arr1
                },
                yAxis: {},
                series: [
                  {
                    name: "销量",
                    type: "bar",
                    data: arr2
                  }
                ]
              });
            });
          }
        }
      });
    }
  }
};
</script>

<style  scoped>
.total {
  width: 1000px;
  height: 500px;
}
</style>


