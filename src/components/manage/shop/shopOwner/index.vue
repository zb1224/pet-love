<template>
    <div>
        <addShopInfo></addShopInfo>
    </div>
</template>
<script>
// import axios from "axios";
import addShopInfo from "./addShopInfo";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers(
  "shopOwnerMoudles"
);
export default {
  components: {
    addShopInfo
  },
  mounted: function() {
    this.setSingleShop("5c358d568c45b31e8c89f90a")
  },
  methods: {
    ...mapActions(["setSingleShop"]),
  }
};
</script>
<style>
.box {
  display: flex;
}
</style>