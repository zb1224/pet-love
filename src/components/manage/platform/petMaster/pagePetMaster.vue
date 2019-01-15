<template>
    <div>
        <el-pagination
        :background="true"
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="petMastersPagination.current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="petMastersPagination.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="petMastersPagination.total">
    </el-pagination>
    </div>
</template>



<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("petMasterModules", ["petMastersPagination"])
  },
  methods: {
    ...mapMutations("petMasterModules", ["setPetMasterPage", "setPetMasterRows"]),
    ...mapActions("petMasterModules", ["showPetMasters"]),
    changeSize(i) {
      this.setPetMasterRows(i);
      this.showPetMasters();
    },
    changePage(i) {
      this.setPetMasterPage(i);
      this.showPetMasters();
    }
  }
};
</script>


<style scoped>
</style>

