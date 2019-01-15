<template>
  <el-container>
    <el-header class="manage-head" height="150px">
      <div>
        <h1 class="sysTitle">爱宠邦宠物管理系统</h1>
        <div class="userInfo">
          <el-button>{{user.Name}}</el-button>
          <el-button @click="quit" icon="el-icon-close">退出</el-button>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="path" :router="true" width="200px">
          <el-submenu index="1" :disabled="platform">
            <template slot="title">
              <i class="el-icon-service"></i>
              <span>平台管理</span>
            </template>
            <el-menu-item index="/manage/platform/users">用户管理</el-menu-item>
            <el-menu-item index="/manage/platform/petMaster">宠主管理</el-menu-item>
            <el-menu-item index="/manage/platform/shop">门店管理</el-menu-item>
            <el-menu-item index="/manage/platform/supplier">供应商管理</el-menu-item>
            <el-menu-item index="/manage/platform/cityStatistics">城市统计</el-menu-item>
            <el-menu-item index="/manage/platfrom/saleStatistics">销量统计</el-menu-item>
            <el-menu-item index="/manage/platform/platFormMap">地图</el-menu-item>
          </el-submenu>
          <el-submenu index="2" :disabled="suppliers">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>供应商管理</span>
            </template>
            <el-menu-item index="/manage/suppliers/supplierInfo">供应商信息</el-menu-item>
            <el-menu-item index="/manage/suppliers/supplierCom">供应商货品管理</el-menu-item>
            <el-menu-item index="/manage/suppliers/supplierStat">统计</el-menu-item>
          </el-submenu>
          <el-submenu index="3" :disabled="shop">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>门店管理</span>
            </template>
            <el-menu-item index="/manage/shop/submitShopInfo" :disabled="shopInfo">门店申请</el-menu-item>
            <el-menu-item index="/manage/shop/commodity_management" :disabled="shopManage">商品管理</el-menu-item>
            <el-menu-item index="/manage/shop/service" :disabled="shopManage">服务管理</el-menu-item>
            <el-menu-item index="/manage/shop/shopOrder" :disabled="shopManage">订单管理</el-menu-item>
            <el-menu-item index="/manage/shop/sales_statistics" :disabled="shopManage">商品统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      platform: true,
      suppliers: true,
      shop: true,
      shopInfo: false,
      shopManage: false,

      user: {}
    };
  },
  created() {
    axios({
      method: "get",
      url: "/index/getSession"
    }).then(({ data }) => {
      // console.log("主页面的data", data);
      this.user = data;
      if (!data) {
        this.$router.push("/login");
      } else if (data.attribute == "Administrators") {
        this.platform = false;
        this.$alert("你是平台管理员账户，只能进行平台管理", "消息");
      } else if (data.attribute == "store") {
        this.shop = false;
        this.$alert("你是商店管理员账户，只能进行商店管理", "消息");
        axios({
          method: "get",
          url: "/shop",
          params: {
            usersId: data._id
          }
        }).then(({ data }) => {
          if (data.length > 0) {
            this.shopInfo = true;
          } else {
            this.shopManage = true;
          }
        });
      } else if (data.attribute == "supplier") {
        this.suppliers = false;
        this.$alert("你是供应商管理员账户，只能进行供应商管理", "消息");
      }
    });
  },
  methods: {
    quit() {
      axios({
        method: "get",
        url: "/index/removeSession"
      }).then(({ data }) => {
        // console.log(data);
        this.$alert("退出成功", "消息");
        this.$router.push("/login");
      });
    }
  },
  computed: {
    path() {
      return this.$router.history.current.path;
    }
  }
};
</script>

<style scoped>
.manage-head {
  background-color: skyblue;
}
.sysTitle {
  color: white;
  font-size: 38px;
  font-weight: bold;
  margin: 0;
}
.userInfo {
  width: 200px;
  height: 50px;
  padding: 10px;
  margin-top: 5px;
  text-align: center;
  border-radius: 10px;
  background-color: silver;
}

.el-submenu {
  background-color: aliceblue;
}

.el-aside {
  background-color: aliceblue;
  height: 100%;
}

.el-main {
  background-color: aliceblue;
}
</style>


