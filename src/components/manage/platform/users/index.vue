<template>
    <div>
      <div class="div">
        <AddUsers></AddUsers>
         <SearchUsers></SearchUsers>
         <AddUnUsers></AddUnUsers>   
      </div>
         <ListUsers></ListUsers>
         <UpdataUsers></UpdataUsers>
         <PageUsers></PageUsers>
    </div>
</template>


<script>
import AddUsers from "./addUsers";
import ListUsers from "./listUsers";
import UpdataUsers from "./updataUsers";
import SearchUsers from "./searchUsers";
import PageUsers from "./pageUsers";
import AddUnUsers from "./addUnUsers";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  mounted() {
    this.showUsers();
  },
  methods: {
    ...mapActions("userModules", ["showUsers"])
  },
  components: {
    AddUsers,
    ListUsers,
    UpdataUsers,
    SearchUsers,
    PageUsers,
    AddUnUsers
  }
};
</script>

<style>
.div {
  display: flex;
  justify-content: space-between;
}
</style>