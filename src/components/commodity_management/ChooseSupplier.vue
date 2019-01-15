<template>
    <!-- <div>
        <el-dialog title="选择供应商" :visible.sync="dialogVisible" width="450px">
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-button icon="el-icon-plus" @click="dialogVisible = true" class="add-btn">选择供应商</el-button>
    </div> -->
    <div>
        <el-dialog title="选择供应商商品" :visible.sync="dialogVisible"  width="1000px" height="auto">
        <el-table :data="suppliers" border style="width: 100%;height:auto" :fit="true">
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
            <!-- <el-table-column prop="shopComNum" label="数量" width="100">
            </el-table-column> -->
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button class="el-icon-edit" size="mini" @click="findById(scope.row._id,findSupplierComById)">选择</el-button>
                    <!-- <el-button size="mini" type="success">上架</el-button> -->
                    <!-- <el-button class="el-icon-delete" size="mini" type="danger" @click="delCom(scope.row._id)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        </el-dialog>
         <el-button icon="el-icon-plus" @click="dialogVisible = true" class="add-btn">选择供应商商品</el-button>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios";

const { mapState, mapMutations, mapActions } = createNamespacedHelpers("shopComModule");
export default {
     computed: {
    ...mapState(["suppliers"])
  },
  data() {
    return {
      dialogVisible: false,
      findSupplierComById:"findSupplierComById"
    };
  },
  methods: {
    // ...mapMutations(["setUpdateVisible"]),
    ...mapActions(["setSupplier"]),
    ...mapActions(["show"]),
    ...mapActions(["showSupplier"]),
      findById(id,type) {
          console.log("1111111111111",type)
          console.log("5555", id)
      this.setSupplier({id,type});
    //   this.setUpdateVisible(true);
    },
  }
};
</script>

<style>
</style>


