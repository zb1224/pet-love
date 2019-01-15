<template>
    <div>
        <submitShop></submitShop>
    </div>
</template>
<script>
// import axios from "axios";
import submitShop from "./submitShop";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("shopComModule");
export default {
  components: {
    submitShop
  },
  created: function() {
    this.getSession();
  },
  methods: {
    ...mapActions(["getSession"]),
  }
};
</script>
<style>
.box {
  display: flex;
}
</style>