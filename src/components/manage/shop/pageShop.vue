<template>
    <div>
        <el-pagination
        :background="true"
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="shopsPagination.current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="shopsPagination.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="shopsPagination.total">
    </el-pagination>
    </div>
</template>



<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("shopModules", ["shopsPagination"])
  },
  methods: {
    ...mapMutations("shopModules", ["setShopPage", "setShopRows"]),
    ...mapActions("shopModules", ["showShops"]),
    changeSize(i) {
      this.setShopRows(i);
      this.showShops();
    },
    changePage(i) {
      this.setShopPage(i);
      this.showShops();
    }
  }
};
</script>


<style>
</style>

