<template>
    <div>
        <el-pagination
      @size-change="changeSize"
      @current-change="changePage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagination.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>

    </div>
</template>

 <script>

export default {
     props:["pagination","show"],
      computed: {
   
  },
  methods: {
    //当前页改变触发
    changePage(page,rows) {   
      this.show( page, rows=this.pagination.eachpage);
    },
    //每页条数改变触发
    changeSize(page,rows,size) { 
      this.show( page= this.pagination.curpage, rows= size );
      // console.log("5555",page,rows,size)
    }
    
  }
}
</script>

<style>

</style>
