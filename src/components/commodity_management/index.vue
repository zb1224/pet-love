<template>
    <div>
      <div class="box">
        <AddCommodity></AddCommodity>
         <ChooseSupplier></ChooseSupplier>
        <ShopComSearch></ShopComSearch>
      </div>
        <CommodityList></CommodityList>
        <UpdateCommodity></UpdateCommodity>
        <ShopComPage></ShopComPage>
        <!-- <UpdateSupplierCom></UpdateSupplierCom> -->
        
    </div>
</template>

<script>
import AddCommodity from "./AddCommodity";
import CommodityList from "./CommodityList";
import UpdateCommodity from './UpdateCommodity';
import ShopComPage from './ShopComPage';
import ShopComSearch from './ShopComSearch';
import ChooseSupplier from './ChooseSupplier';
import UpdateSupplierCom from './UpdateSupplierCom';
import { createNamespacedHelpers } from "vuex";

const { mapActions } = createNamespacedHelpers("shopComModule");
export default {
  components: {
    AddCommodity,
    CommodityList,
    UpdateCommodity,
    ShopComPage,
    ShopComSearch,
    ChooseSupplier,
    UpdateSupplierCom
  },
  mounted() {
    this.getSession()        
    this.showSupplier();
  },
  methods: {
    ...mapActions(["show"]),
    ...mapActions(["showSupplier"]),
      ...mapActions(["getSession"])
  }
};
</script>

<style>
.box{
  display: flex;
}
</style>


