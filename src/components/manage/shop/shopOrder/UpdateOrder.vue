<template>
  <div>
    <el-dialog title="修改订单信息" :visible.sync="updateVisible" width="450px">
      <el-form>
        <el-form-item label="购买内容">
         
          <el-select v-model="order.orderContent" placeholder="请选择">
    <el-option label="购买商品" value="购买商品"></el-option>
    <el-option label="购买服务" value="购买服务"></el-option>
  </el-select>
        </el-form-item>
       
     
        <el-form-item label="购买状态">
        
          <el-select v-model="order.orderStatus" placeholder="请选择">
    <el-option label="已支付" value="已支付"></el-option>
    <el-option label="未支付" value="未支付"></el-option>
  </el-select>
        </el-form-item>
      
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fnc">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState,mapActions } = createNamespacedHelpers("shopOrderModule");
import axios from "axios"
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
  },
  methods:{
     ...mapActions(["show"]),
   fnc(){
     this.updateVisible = false;
     let id =this.order._id;
     console.log(this.order)
      axios({
                method: "put",
                url: "/orders/"+id,
                data: {
                  ...this.order,
                  
                }
            }).then(({data}) => {
                // console.log(data);
                this.show();
            });
   }

  }
};
</script>
<style scoped>
</style>
