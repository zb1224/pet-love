<template>
    <div id="myChart1" :style="{width: '450px', height: '500px'}"></div>
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

export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      supplierId: "",
      usersId: ""
    };
  },
  created() {
    this.getSession();
  },
  methods: {
    getSession() {
      axios({
        method: "get",
        url: "/index/getSession"
      }).then(({ data }) => {
        console.log("第一个DATA", data);
        this.usersId = data._id;
        axios({
          method: "get",
          url: "/suppliers",
          params: {
            usersId: this.usersId
          }
        }).then(({ data }) => {
          console.log("第二个data", data);
          for (let i = 0; i < data.length; i++) {
            if (data[i]._id == data[i].users.supplier) {
              this.supplierId = data[i]._id;
              //   console.log("统计的id",data[i]._id)
              axios({
                method: "get",
                url: "/supplierStat/SalesVolume",
                params: {
                  supplierId: this.supplierId
                }
              }).then(({ data }) => {
                console.log("第三个DATA", data);
                let nameArr = [];
                let numsArr = [];
                for (let i = 0; i < data.length; i++) {
                  nameArr.push(data[i].name);
                  numsArr.push(data[i].nums);
                }
                console.log(nameArr);
                console.log(numsArr);
                let myChart1 = echarts.init(
                  document.getElementById("myChart1")
                );
                myChart1.setOption({
                  title: { text: "各商品销量统计" },
                  tooltip: {},
                  xAxis: {
                    data: nameArr
                  },
                  yAxis: {},
                  series: [
                    {
                      name: "销量",
                      type: "bar",
                      data: numsArr
                    }
                  ]
                });
              });
            }
          }
        });
      });
    }
  }
};
</script>

<style>
</style>


