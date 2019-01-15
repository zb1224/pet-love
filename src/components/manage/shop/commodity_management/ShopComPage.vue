<template>
<div>
    <!-- <a v-if="pagination.curpage>1" @click="change(pagination.curpage-1)">上一页</a>
    <a v-for="i in pagination.maxpage" :key='i' @click="change(i)">{{i}}</a>
    <a v-if="pagination.curpage<pagination.maxpage"  @click="change(parseInt(pagination.curpage)+1)">下一页</a> -->
     <el-pagination
      @size-change="changeSize"
      @current-change="changePage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagination.eachpage"
      :current-page="pagination.current"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
</div>
</template>
<script>
// import {mapState,mapActions} from "vuex"
import { createNamespacedHelpers} from "vuex";
const { mapState, mapActions,mapMutations } = createNamespacedHelpers("shopComModule");
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["shopComs"]),
    ...mapState(["pagination"])
  },
  methods: {
    ...mapActions(["show"]),
    ...mapMutations(["setCurpage","setEachpage"]),
    changePage(page) {
      this.setCurpage(page)
      // this.show({ page, rows: this.pagination.eachpage });
        this.show();
    },
    changeSize(size) {
      this.setEachpage(size)
      this.show();
          // this.show({ page: this.pagination.curpage, rows: size });
    }
    // change(i) {
    //   this.show(i);
    // }
  }
};
</script>