<template>
    <div>
        <!-- <select v-model="input.type">
        <option value="">全部</option>
        <option value="name">姓名</option>
        <option value="age">年龄</option>
        <option value="gender">性别</option>
        </select>
        <input type="text" v-model="input.text"/>
        <button type="button" @click="show()">搜索</button> -->
        <el-input placeholder="请输入搜索内容" v-model="input.text" class="input-with-select">
            <el-select v-model="input.type" slot="prepend" placeholder="请选择" class="select">
                <el-option label="全部" value=""></el-option>
                <el-option label="产品名称" value="comName"></el-option>
                <el-option label="产品种类" value="comKind"></el-option>
                <el-option label="产品成分" value="comComponent"></el-option>
                <el-option label="适用规格" value="comSpecifications"></el-option>
                <el-option label="专属规格" value="exclusiveSpecifications"></el-option>
                <el-option label="包装规格" value="packingSpecifications"></el-option>
                <el-option label="产品口味" value="Flavor"></el-option>
                <el-option label="产品特殊功用" value="specialFunctions"></el-option>
                <el-option label="产品产地" value="place"></el-option>
                <el-option label="出厂日期" value="dateProduction"></el-option>
                <el-option label="保质期" value="qualityDate"></el-option>
                <el-option label="供应商编号" value="supplyNumber"></el-option>
                <el-option label="产品特色" value="characteristicText"></el-option>
                <el-option label="批发价格" value="price"></el-option>
                 <el-option label="产品数量" value="shopComNum"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="show()"></el-button>
        </el-input>
    </div>
</template>
<script>
// import { mapState, mapActions } from "vuex";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("shopComModule");
export default {
  data() {
    return {
      // inputElement: "",
      // selectElement: ""
    };
  },
  computed: {
    ...mapState(["input"]),
    type: {
      get() {
        return this.input.type;
      },
      set(value) {
        this.setType(value);
      }
    },
    text: {
      get() {
        return this.input.text;
      },
      set(value) {
        this.setText(value);
      }
    }
  },
  methods: {
    ...mapActions(["show"])
  }
};
</script>
<style>
.select {
  width: 150px;
}
</style>