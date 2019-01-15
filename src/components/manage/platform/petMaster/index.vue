<template>
    <div>
      <div class="div">
        <AddPetMaster></AddPetMaster>
         <SearchPetMaster></SearchPetMaster>
         <AddUnPetMasters></AddUnPetMasters>   
      </div>
         <ListPetMaster></ListPetMaster>
         <UpdataPetMaster></UpdataPetMaster>
         <PagePetMaster></PagePetMaster>
    </div>
</template>


<script>
import AddPetMaster from "./addPetMaster";
import AddUnPetMasters from "./addUnPetMasters";
import ListPetMaster from "./listPetMaster";
import PagePetMaster from "./pagePetMaster";
import SearchPetMaster from "./searchPetMaster";
import UpdataPetMaster from "./updataPetMaster";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  mounted() {
    this.showPetMasters();
  },
  methods: {
    ...mapActions("petMasterModules", ["showPetMasters"]),
  },
  components: {
    AddPetMaster,
    AddUnPetMasters,
    ListPetMaster,
    PagePetMaster,
    SearchPetMaster,
    UpdataPetMaster
  }
};
</script>

<style scoped>
.div {
  display: flex;
  justify-content: space-between;
}
</style>