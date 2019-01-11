<template>
    <div class="searchContent">
    <el-input placeholder="请输入内容" v-model="supplierInput.text" class="input-with-select inputsty">
    <el-select v-model="supplierInput.type" slot="prepend" placeholder="请选择">
      <el-option label="供应商名称" value="supName"></el-option>
      <el-option label="供应商地址" value="supAddr"></el-option>
      <el-option label="供应商电话" value="supTel"></el-option>
      <el-option label="供应商网站" value="supInternet"></el-option>
      <el-option label="全部" value=""></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="showSuppliers"></el-button>
  </el-input>
</div>
</template>


<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("supplierModules", ["supplierInput"]),
    type: {
      get() {
        return this.input.type;
      },
      set(value) {
        this.setSupplierType(value);
      }
    },
    text: {
      get() {
        return this.input.text;
      },
      set(value) {
        this.setSupplierText(value);
      }
    }
  },
  methods: {
    ...mapActions("supplierModules", ["showSuppliers"])
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