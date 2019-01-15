<template>
    <div>
      <div class="div">
        <AddShop></AddShop>
         <SearchShop></SearchShop>
         <AddUnShop></AddUnShop>   
      </div>
         <ListShop></ListShop>
         <UpdataShop></UpdataShop>
         <PageShop></PageShop>
    </div>
</template>


<script>
import AddShop from "./addShop";
import AddUnShop from "./addUnShop";
import ListShop from "./listShop";
import PageShop from "./pageShop";
import SearchShop from "./searchShop";
import UpdataShop from "./updataShop";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  mounted() {
    this.showShops();
    console.log("showShops")
  },
  methods: {
    ...mapActions("shopModules", ["showShops"]),
    imageSuccess(res, file) {
      this.imageUrl = "/upload/" + res;
    }
  },
  components: {
    AddShop,
    AddUnShop,
    ListShop,
    PageShop,
    SearchShop,
    UpdataShop
  }
};
</script>

<style>
.div {
  display: flex;
  justify-content: space-between;
}
</style>