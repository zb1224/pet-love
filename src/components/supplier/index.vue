<template>
  <el-container>
    <el-header>
      <div>
        <h1>供应商信息管理</h1>
        <div>
          <span>你好</span>
          <el-button icon="el-icon-close">退出</el-button>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="path" :router="true" width="180px">
          <el-menu-item index="/manage/supplier/supplierInfo">
            <i class="el-icon-info"></i>
            <span slot="title">供应商信息</span>
          </el-menu-item>
          <el-menu-item index="/manage/">
            <i class="el-icon-info"></i>
            <span slot="title">供应商品</span>
          </el-menu-item>
          <el-menu-item index="/manage/">
            <i class="el-icon-info"></i>
            <span slot="title">统计</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>底部</el-footer>
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
      this.user = data;
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
