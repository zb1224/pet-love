<template>
  <el-container>
    <el-header>
      <div>
        <h1>爱宠邦宠物管理系统</h1>
        <div>
          <span>你好</span>
          <el-button icon="el-icon-close">退出</el-button>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="path" :router="true" width="200px">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
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
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>供应商管理</span>
            </template>
            <el-menu-item index="/manage/suppliers/supplierInfo">供应商信息</el-menu-item>
            <el-menu-item index="/manage/suppliers/supplierCom">供应商货品管理</el-menu-item>
            <el-menu-item index="/manage/suppliers/supplierStat">统计</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>门店管理</span>
            </template>
            <el-menu-item index>门店申请</el-menu-item>
            <el-menu-item index>商品管理</el-menu-item>
            <el-menu-item index>选择供应商货品</el-menu-item>
            <el-menu-item index>服务管理</el-menu-item>
            <el-menu-item index="/manage/shopOrders">订单管理</el-menu-item>
            <el-menu-item index>统计</el-menu-item>
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
      user: {}
    };
  },
  created() {
    axios({
      method: "get",
      url: "/index/getSession"
    }).then(({ data }) => {
      // console.log(data);
      this.user = data;
      if (!data) {
        this.$router.push("/login");
      } else if (data.attribute == "Administrators") {
      } else if (data.attribute == "store") {
      } else if (data.attribute == "supplier") {
      }
    });
  },
  computed: {
    path() {
      return this.$router.history.current.path;
    }
  }
};
</script>
<style scoped>

</style>


