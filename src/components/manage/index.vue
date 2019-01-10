<template>
  <router-view></router-view>
</template>

<script>
import axios from "axios";

export default {
  created() {
    axios({
      method: "get",
      url: "/index/getSession"
    }).then(({ data }) => {
      //   console.log(data);
      if (!data) {
        this.$router.push("/login");
      } else if (data.attribute == "Administrators") {
        // console.log(1);
      } else if (data.attribute == "store") {
        // console.log(2);
      } else if (data.attribute == "supplier") {
        this.$router.push("/manage/supplier");
      }
    });
  }
};
</script>
<style scoped>
</style>

