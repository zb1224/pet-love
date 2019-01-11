<template>
    <div>
      <div class="div">
        <AddSupplier></AddSupplier>
         <SearchSupplier></SearchSupplier>
         <AddUnSupplier></AddUnSupplier>   
      </div>
         <ListSupplier></ListSupplier>
         <UpdataSupplier></UpdataSupplier>
         <PageSupplier></PageSupplier>
    </div>
</template>


<script>
import AddSupplier from "./addSupplier";
import ListSupplier from "./listSupplier";
import UpdataSupplier from "./updataSupplier";
import SearchSupplier from "./searchSupplier";
import PageSupplier from "./pageSupplier";
import AddUnSupplier from "./addUnSupplier";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  mounted() {
    this.showSuppliers();
  },
  methods: {
    ...mapActions("supplierModules", ["showSuppliers"])
  },
  components: {
    AddSupplier,
    ListSupplier,
    UpdataSupplier,
    SearchSupplier,
    PageSupplier,
    AddUnSupplier
  }
};
</script>

<style>
.div {
  display: flex;
  justify-content: space-between;
}
</style>