<template>
  <div>
    <el-dialog title="订单信息" :visible.sync="inquireVisible" width="450px">
      <el-form>
        <el-form-item label="购买内容">
          <el-input disabled v-model="order.orderContent"></el-input>
        </el-form-item>
        <el-form-item label="商品列表">
          <ol>
            <li v-for="index in order.orderCommoditys" v-bind:key="index">
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
        </el-form-item>
        <el-form-item label="购买状态">
          <el-input disabled v-model="order.orderStatus"></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-input disabled v-model="order.buyTime"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="inquireVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("shopOrderModule");

export default {
  data() {
    return {};
  },
  computed: {
    // 取出数据渲染，可以开关列表
    ...mapState(["order"]),
    inquireVisible: {
      get() {
        return this.$store.state.shopOrderModule.inquireVisible;
      },
      set(inquireVisible) {
        this.$store.commit("shopOrderModule/setInquireVisible", inquireVisible);
      }
    }
  }
};
</script>
<style scoped>
</style>
