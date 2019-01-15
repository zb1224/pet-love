<template>
<div>
   <OrderList></OrderList>
   <InquireOrder></InquireOrder>
   <UpdateOrder></UpdateOrder>
</div>
 
   
</template>
<script>
import OrderList from "./OrderList";
import InquireOrder from "./InquireOrder";
import UpdateOrder from "./UpdateOrder";

import { createNamespacedHelpers } from "vuex";

const { mapActions } = createNamespacedHelpers("shopOrderModule");

export default {
  // 进入直接查询将数据传到仓库中
  created() {
    this.show();
  },
  methods: {
    ...mapActions(["show"])
  },
  components: {
    OrderList,
    InquireOrder,
    UpdateOrder,
  }
};
</script>
<style scoped>
</style>
