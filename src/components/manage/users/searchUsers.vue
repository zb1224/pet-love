<template>
    <div class="searchContent">
    <el-input placeholder="请输入内容" v-model="userInput.text" class="input-with-select inputsty">
    <el-select v-model="userInput.type" slot="prepend" placeholder="请选择">
      <el-option label="昵称" value="Name"></el-option>
      <el-option label="手机号" value="logTel"></el-option>
      <el-option label="邮箱" value="logEmail"></el-option>
      <el-option label="身份" value="attribute"></el-option>
      <el-option label="全部" value=""></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="showUsers"></el-button>
  </el-input>
</div>
</template>


<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("userModules", ["userInput"]),
    type: {
      get() {
        return this.input.type;
      },
      set(value) {
        this.setUserType(value);
      }
    },
    text: {
      get() {
        return this.input.text;
      },
      set(value) {
        this.setUserText(value);
      }
    }
  },
  methods: {
    ...mapActions("userModules", ["showUsers"])
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