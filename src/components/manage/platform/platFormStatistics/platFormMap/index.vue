<template>
<div>
    <div class="total" id="mapContent" ref="mapContent"></div>
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
      shopCityLocationArr: [
        [120.33, 36.07, 10, "青岛"],
        [91.11, 29.97, 6, "拉萨"],
        [121.48, 31.22, 9, "上海"],
        [114.87, 40.82, 10, "张家口"],
        [121.56, 29.86, 2, "宁波"],
        [102.73, 25.04, 15, "昆明"],
        [123.38, 41.8, 7, "沈阳"],
        [104.06, 30.67, 3, "成都"],
        [116.46, 39.92, 11, "北京"]
      ],
      shopMapLocationArr: [
        [104.062275, 30.685623, "爱心宠物店", "成都通锦大厦一楼"],
        [104.079726, 30.64296, "蠢萌宠物店", "四川省成都市武侯区林荫中街8号"],
        [104.119394, 30.672233, "玲珑宠物店", "建设南路1号"],
        [104.077363, 30.600042, "卡哇伊宠物店", "天顺路225号"]
      ],
      zoom: 0
    };
  },
  mounted() {
    this.showMap();
  },
  methods: {
    showMap() {
    let mapContent = echarts.init(this.$refs.mapContent);
      axios({
        url: "/map/cityShopNum",
        method: "get"
      }).then(({data}) => {
          console.log(data)
        this.shopCityLocationArr = data;
      mapContent.setOption(this.mapOptions, true);
      });
      mapContent.on("finished", () => {
        // 从echarts对象中获取bmap对象
        var bmap = mapContent
          .getModel()
          .getComponent("bmap")
          .getBMap();

        // 设置最小缩放值
        bmap.setMinZoom(5);
        // 设置最大缩放值
        // bmap.setMaxZoom(15);
        // 缩放结束后的事件
        bmap.addEventListener("zoomend", e => {
          let zoom = this.zoom;
          this.zoom = bmap.getZoom();
          // 打印出当前缩放值
          if (zoom < bmap.getZoom() && bmap.getZoom() == 10) {
            axios({
              url: "/map/cityShopLocation",
              method: "get"
            }).then(({data}) => {
                console.log(data)
            // this.shopMapLocationArr = data;
            let options = this.mapOptions;
            options.bmap.zoom = 10;
            mapContent.setOption(this.mapOptions, false);
            });
          } else if (zoom > bmap.getZoom() && bmap.getZoom() <= 10) {
            this.shopMapLocationArr = [];
            let options = this.mapOptions;
            mapContent.setOption(this.mapOptions, false);
          }
        });
      });
    }
  },
  computed: {
    mapOptions() {
      return {
        title: {
          text: "全国门店统计",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item"
        },
        bmap: {
          center: [104.072259, 30.663403],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#044161"
                }
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry",
                stylers: {
                  color: "#064f85"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#005b96",
                  lightness: 1
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#00508b"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  color: "#056197",
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry.fill",
                stylers: {
                  color: "#029fd4"
                }
              },
              {
                featureType: "city",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "district",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
            ]
          }
        },
        series: [
          {
            name: "门店数",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.shopCityLocationArr,
            symbolSize: function(val) {
              return val[2] * 2;
            },
            // label: {
            //     show: true,
            //     formatter: function(params) {
            //         return params.data[3];
            //     }
            // },
            itemStyle: {
              normal: {
                color: "#ddb926"
              }
            },
            tooltip: {
              formatter: function(params, ticket, callback) {
                return (
                  "城市：" + params.data[3] + "<br>门店数：" + params.data[2]
                );
              }
            }
          },
          {
            name: "门店位置",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.shopMapLocationArr,
            symbol: "pin",
            symbolSize: 20,
            itemStyle: {
              normal: {
                color: "red"
              }
            },
            tooltip: {
              formatter: function(params, ticket, callback) {
                return (
                  "店铺名称：" + params.data[2] + "<br>地址：" + params.data[3]
                );
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
  height: 500px;
}
</style>
