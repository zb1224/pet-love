<template>

  <el-table :data="petMasters" style="width: 100%" :fit="true" :border="true" :stripe="true"  @row-dblclick="dataShopRow">
  <el-table-column prop="truthName" label="姓名"></el-table-column>
  <el-table-column prop="masterNickName" label="昵称"></el-table-column>
   <el-table-column prop="masterTel" label="电话"></el-table-column>
   <el-table-column prop="masterAddr" label="地址"></el-table-column>
    <el-table-column prop="region" label="区域"></el-table-column>
    <el-table-column prop="integral" label="积分"></el-table-column>
    <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="info" size="mini" @click="updataPetMaster(scope.row._id)">修 改</el-button>
        <el-button type="info" size="mini" @click="blackPetMaster(scope.row)">拉 黑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>



<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      Visible: false,
      petInfo: {}
    };
  },
  computed: {
    ...mapState("petMasterModules", ["petMasters", "updataVisible"])
  },
  methods: {
    ...mapActions("petMasterModules", ["updataPetMasterInfo"]),
    ...mapActions("petMasterModules", ["showPetMasters", "showUnPetMasters"]),
    ...mapMutations("petMasterModules", ["setVisible"]),
    updataPetMaster(id) {
      this.updataPetMasterInfo(id);
      this.setVisible(true);
    },
    blackPetMaster(data) {
      axios({
        method: "put",
        url: "/petMaster/" + data._id,
        data: {
          ...data,
          status: "0"
        }
      }).then(({ data }) => {
        this.showPetMasters();
        this.showUnPetMasters();
      });
    },
    statusFormatter(row, column) {
      let status = row.status;
      if (status == 0) {
        return "未通过";
      } else {
        return "已通过";
      }
    },
    dataShopRow(row, event, column) {
      axios({
        method: "get",
        url: "/petMaster/" + row._id
      }).then(({ data }) => {
        console.log(data);
        this.petMasterInfo = data.pet;
        this.Visible = true;
      });
    }
  },
  components: {}
};
</script>

<style>
</style>