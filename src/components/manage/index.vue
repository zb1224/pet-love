<template>
    <div>
     <el-row class="grid-content bg-purple-dark linheight">
  <el-col :span="12"><div class="grid-content bg-purple-dark fontsize">爱宠邦管理系统</div></el-col>
<el-col :span="12"><div class="grid-content bg-purple-dark paiban">{{user.phone}}<el-button type="primary" round>注销</el-button></div></el-col>
</el-row>
<el-row class="content">
  <el-col :span="3"><div class="grid-content bg-purple">
      <el-col :span="24">
    <el-menu
    :router="true"
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
       <el-menu-item index="/manage/users">
        <i class="el-icon-location"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/manage/petMaster">
        <i class="el-icon-menu"></i>
        <span slot="title">宠主管理</span>
      </el-menu-item>
      <el-menu-item index="/manage/shop">
        <i class="el-icon-document"></i>
        <span slot="title">门店管理</span>
      </el-menu-item>
      <el-menu-item index="/manage/supplier">
        <i class="el-icon-document"></i>
        <span slot="title">供应商管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
    </div></el-col>
        <el-col :span="21">
        <div class="grid-content bg-purple-light">
        <router-view></router-view>
        </div>
        </el-col>
    </el-row>
 </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      user: { Name: "" }
    };
  },
  mounted() {
  
  },
  methods: {
   
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
a {
  color: white;
  text-decoration: none;
}

html,
body {
  height: 100%;
}
#root {
  height: 100%;
}
#root > div {
  height: 100%;
}
.grid-content {
  height: 100%;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
  height: 80px;
}
.bg-purple {
  background: #d3dce6;
  height: 540px;
}
.bg-purple-light {
  background: #e5e9f2;
  height: 100%;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-menu-vertical-demo {
  height: 540px;
}
.paiban {
  float: right;
}
.linheight {
  line-height: 80px;
  color: white;
}
</style>



