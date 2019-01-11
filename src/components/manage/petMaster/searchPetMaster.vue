<template>
    <div class="searchContent">
    <el-input placeholder="请输入内容" v-model="petMasterInput.text" class="input-with-select inputsty">
    <el-select v-model="petMasterInput.type" slot="prepend" placeholder="请选择">
      <el-option label="姓名" value="truthName"></el-option>
      <el-option label="昵称" value="masterNickName"></el-option>
      <el-option label="电话" value="masterTel"></el-option>
      <el-option label="区域" value="region"></el-option>
      <el-option label="积分" value="integral"></el-option>
      <el-option label="全部" value=""></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="showPetMasters"></el-button>
  </el-input>
</div>
</template>


<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("petMasterModules", ["petMasterInput"]),
    type: {
      get() {
        return this.input.type;
      },
      set(value) {
        this.setPetMasterType(value);
      }
    },
    text: {
      get() {
        return this.input.text;
      },
      set(value) {
        this.setPetMasterText(value);
      }
    }
  },
  methods: {
    ...mapActions("petMasterModules", ["showPetMasters"])
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