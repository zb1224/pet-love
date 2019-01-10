<template>
    <el-container class="container">
        <el-header class="header">
            <h1>
                <i class="el-icon-document"></i>供应商管理</h1>
            <div class="tips">
                <span>你好</span>
                <el-button icon="el-icon-close" class="exitBtn">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside width="180px">
                <el-menu  class="menu" :router="true">
                    <el-menu-item index="/manage/supplier">
                        <i class="el-icon-info"></i>供应商信息</el-menu-item>
                    <el-menu-item index="/manage/supplierCom">
                        <i class="el-icon-info"></i>供应商品</el-menu-item>
                    <el-menu-item index="/manage/teachers">
                        <i class="el-icon-info"></i>统计</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      //   userLog: ""
    };
  },
  mounted: function() {},
  //   computed: {
  //     path() {
  //       return this.$router.history.current.path;
  //     }
  //   },
  methods: {
    // getSession() {
    //   axios({
    //     method: "get",
    //     url: "/getSession"
    //   }).then(({ data }) => {
    //     if (data) {
    //       this.userLog = data;
    //     } else {
    //       this.$router.push("/login");
    //     }
    //   });
    // },
    // removeSesssion() {
    //   axios({
    //     method: "get",
    //     url: "/removeSession"
    //   }).then(() => {
    //     this.$router.push("/login");
    //   });
    // }
  }
};
</script>

<style>
.el-header {
  height: 200px;
  background-color: #b3c0d1;
  color: #333;
  display: flex;
}
.header > h1 {
  color: white;
  font-size: 24px;
  flex: 1;
}
.exitBtn {
  padding: 0;
  display: inline-block;
  width: 70px;
  height: 20px;
  text-align: center;
}
.tips {
  vertical-align: bottom;
  color: rebeccapurple;
  font-size: 14px;
}
.el-aside {
  height: 590px;
  background-color: cornflowerblue;
  color: #333;
  text-align: left;
}
.menu {
  height: 100%;
  background-color: snow;
}
.el-menu-item {
  font-size: 18px;
  color: slategray;
}
.el-main {
  padding: 0;
  height: 590px;
  background-color: snow;
  color: #333;
}
</style>