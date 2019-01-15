<template>
    <div>
        <el-table :data="shopComs" border style="width: 100%" :fit="true">
            <el-table-column prop="comName" label="产品名称" width="100">
            </el-table-column>
            <el-table-column prop="comKind" label="产品种类" width="100">
            </el-table-column>
            <el-table-column prop="comComponent" label="产品成分" width="100">
            </el-table-column>
            <el-table-column prop="comSpecifications" label="适用规格" width="100">
            </el-table-column>
            <el-table-column prop="exclusiveSpecifications" label="专属规格" width="100">
            </el-table-column>
            <el-table-column prop="packingSpecifications" label="包装规格" width="100">
            </el-table-column>
            <el-table-column prop="Flavor" label="产品口味" width="100">
            </el-table-column>
            <el-table-column prop="specialFunctions" label="产品特殊功用" width="150">
            </el-table-column>
            <el-table-column prop="place" label="产品产地" width="100">
            </el-table-column>
            <el-table-column prop="dateProduction" label="出厂日期" width="100">
            </el-table-column>
            <el-table-column prop="qualityDate" label="保质期" width="100">
            </el-table-column>
            <el-table-column prop="supplyNumber" label="供应商编号" width="100">
            </el-table-column>
            <el-table-column prop="characteristicText" label="产品说明" width="100">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="100">
            </el-table-column>
             <el-table-column prop="shopComNum" label="数量" width="100">
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button class="el-icon-edit" size="mini" @click="showById(scope.row._id)">修改</el-button>
                    <!-- <el-button size="mini" type="success">上架</el-button> -->
                    <el-button class="el-icon-delete" size="mini" type="danger" @click="delCom(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios";

const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "shopComModule"
);
export default {
  computed: {
    ...mapState(["shopComs"])
  },
  methods: {
    ...mapMutations(["setUpdateVisible"]),
      ...mapActions(["setShopCom"]),
    ...mapActions(["show"]),
    showById(id) {
      this.setShopCom(id);
      this.setUpdateVisible(true);
    },
    delCom(id) {
      axios({
        url: "/shopCom/" + id,
        method: "delete"
      }).then(() => {
        this.show();
      });
    }
  }
};
</script>

<style>
</style>

