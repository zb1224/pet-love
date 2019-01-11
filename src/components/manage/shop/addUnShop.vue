<template>
 <div>
     <el-button type="primary" @click="dialogVisible = true" icon="el-icon-circle-plus-outline">待审核（{{unShops.length}}）</el-button>
<el-dialog
  title="待审核用户"
  :visible.sync="dialogVisible"
  width="80%"
  >
   <el-table :data="unShops" style="width: 100%" :fit="true">
    <el-table-column prop="shopName" label="店名"></el-table-column>
    <el-table-column prop="LicenseNumber" label="营业执照号"></el-table-column>
    <el-table-column prop="addr" label="地址"></el-table-column>
    <el-table-column prop="city" label="城市"></el-table-column>
    <el-table-column prop="legalPerson" label="法人"></el-table-column>
    <el-table-column prop="Tel" label="电话"></el-table-column>
    <el-table-column prop="characteristic" label="特色" ></el-table-column>
    <el-table-column prop="VIPLeve" label="VIP等级" ></el-table-column>
    <el-table-column prop="Commission" label="佣金" ></el-table-column>
    <el-table-column prop="status" label="状态" :formatter="statusFormatter"></el-table-column>
    <el-table-column fixed="right" label="操作" width="160">
      <template slot-scope="scope">
        <el-button type="info" size="small" @click="passShop(scope.row)">通 过</el-button>
        <el-button type="info" size="small" @click="unpassShop(scope.row._id)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <span slot="footer" class="dialog-footer">     
    <el-button @click="dialogVisible = false">关 闭</el-button>
  </span>
</el-dialog>
 </div>
</template>


<script>
import { mapActions ,mapState} from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    this.showUnShops();
  },
  computed: {
    ...mapState("shopModules", ["unShops", "unShopsPagination"]),
  },
  methods: {
    ...mapActions("shopModules", ["showShops","showUnShops"]),
    passShop(data) {
      console.log(data)
      axios({
        method: "put",
        url: "/shop/" + data._id,
        data: {
          ...data,
          users:data.users._id,
          status: "1"
        }
      }).then(({ data }) => {
        this.showUnShops();
        this.showShops();
      });
    },
    unpassShop(id) {
      axios({
        method: "delete",
        url: "/shop/" + id
      }).then(({ data }) => {
        this.showUnShops();
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
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>