<template>
  <div>
    <AddCommodity></AddCommodity>
    <CommodityList></CommodityList>
    <UpdateCommodity></UpdateCommodity>
  </div>
</template>

<script>
import AddCommodity from "./AddCommodity";
import CommodityList from "./CommodityList";
import UpdateCommodity from "./UpdateCommodity";
import { createNamespacedHelpers } from "vuex";

const { mapActions } = createNamespacedHelpers("supplierComModule");
export default {
  components: {
    AddCommodity,
    CommodityList,
    UpdateCommodity
  },
  created() {
    this.getSession();
  },
  methods: {
    ...mapActions(["show", "getSession"])
  }
};
</script>

<style scoped>
</style>


