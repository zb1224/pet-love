<template>
    <div>
        <el-pagination
        :background="true"
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="suppliersPagination.current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="suppliersPagination.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="suppliersPagination.total">
    </el-pagination>
    </div>
</template>



<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("supplierModules", ["suppliersPagination"])
  },
  methods: {
    ...mapMutations("supplierModules", ["setSupplierPage", "setSupplierRows"]),
    ...mapActions("supplierModules", ["showSuppliers"]),
    changeSize(i) {
      this.setSupplierRows(i);
      this.showSuppliers();
    },
    changePage(i) {
      this.setSupplierPage(i);
      this.showSuppliers();
    }
  }
};
</script>


<style>
</style>

