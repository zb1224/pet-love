<template>
    <div>
        <el-table :data="supplierComs" border style="width: 1200px">
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
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="showById(scope.row._id)">修改</el-button>
                    <el-button size="mini" type="danger" @click="delCom(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios";

const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "supplierComModule"
);
export default {
  computed: {
    ...mapState(["supplierComs"])
  },
  methods: {
    ...mapMutations(["setUpdateVisible"]),
    ...mapActions(["setCommodity", "show"]),
    showById(id) {
      this.setCommodity(id);
      this.setUpdateVisible(true);
    },
    delCom(id) {
      axios({
        url: "/supplierCom/" + id,
        method: "delete"
      }).then(() => {
        this.show();
      });
    }
  }
};
</script>

<style scoped>
</style>

