<template>
    <div class="searchContent">
    <el-input placeholder="请输入内容" v-model="shopInput.text" class="input-with-select inputsty">
    <el-select v-model="shopInput.type" slot="prepend" placeholder="请选择">
      <el-option label="店名" value="shopName"></el-option>
      <el-option label="营业执照号" value="LicenseNumber"></el-option>
      <el-option label="城市" value="city"></el-option>
      <el-option label="电话" value="Tel"></el-option>
      <el-option label="特色" value="characteristic"></el-option>
      <el-option label="VIP等级" value="VIPLeve"></el-option>
      <el-option label="全部" value=""></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="showShops"></el-button>
  </el-input>
</div>
</template>


<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("shopModules", ["shopInput"]),
    type: {
      get() {
        return this.input.type;
      },
      set(value) {
        this.setShopType(value);
      }
    },
    text: {
      get() {
        return this.input.text;
      },
      set(value) {
        this.setShopText(value);
      }
    }
  },
  methods: {
    ...mapActions("shopModules", ["showShops"])
  },
  components: {}
};
</script>

<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.inputsty {
  width: 500px;
}
.searchContent{
    width: 600px;
}
</style>