<template>
    <div>
        <el-pagination
        :background="true"
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="usersPagination.curpage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="usersPagination.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="usersPagination.total">
    </el-pagination>
    </div>

</template>



<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("userModules", ["usersPagination"])
  },
  methods: {
    ...mapMutations("userModules", ["setUserPage", "setUserRows"]),
    ...mapActions("userModules", ["showUsers"]),
    changeSize(i) {
      this.setUserRows(i);
      this.showUsers();
    },
    changePage(i) {
      this.setUserPage(i);
      this.showUsers();
    }
  }
};
</script>


<style>
</style>

