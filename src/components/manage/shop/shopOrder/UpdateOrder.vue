<template>
  <div>
    <el-dialog title="修改订单信息" :visible.sync="updateVisible" width="450px">
      <el-form>
        <el-form-item label="购买内容">
          <el-input v-model="order.orderContent"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品列表">
          <ol>
            <li v-for="index in order.orderCommoditys" v-bind:key="index.commodityCondition">
              <div>
                <span>商品名称</span>
                <span>{{ index.commodityName }}</span>
              </div>
              <div>
                <span>商品条件(个数或时间)</span>
                <span>{{ index.commodityCondition }}</span>
              </div>
              <div>
                <span>￥{{ index.commodityPrice }}</span>
              </div>
            </li>
          </ol>
        </el-form-item> -->
        <el-form-item label="购买状态">
          <el-input  v-model="order.orderStatus"></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
            <el-date-picker
            v-model="order.buyTime"
            value-format="yy年M月d日"
              type="date"
             placeholder="选择日期">
         </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("shopOrderModule");

export default {
  data() {
    return {
    };
  },
  computed: {
    // 取出数据渲染，可以开关列表
    ...mapState(["order"]),
    updateVisible: {
      get() {
        return this.$store.state.shopOrderModule.updateVisible;      
      },
      set(updateVisible) {
        this.$store.commit("shopOrderModule/setUpdateVisible", updateVisible);
      }
    }
  }
};
</script>
<style scoped>
</style>
