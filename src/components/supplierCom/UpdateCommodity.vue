<template>
    <div>
        <el-dialog title="增加商品" :visible.sync="updateVisible" width="450px">
            <el-form status-icon ref="updateForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="产品名称" prop="comName">
                    <el-input v-model="supplierCom.comName"></el-input>
                </el-form-item>
                <el-form-item label=产品种类 prop="comKind">
                    <el-input v-model="supplierCom.comKind" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=产品成分 prop="comComponent">
                    <el-input v-model="supplierCom.comComponent" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=适用规格 prop="comSpecifications">
                    <el-input v-model="supplierCom.comSpecifications" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=专属规格 prop="exclusiveSpecifications">
                    <el-input v-model="supplierCom.exclusiveSpecifications" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=包装规格 prop="packingSpecifications">
                    <el-input v-model="supplierCom.packingSpecifications" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=产品口味 prop="Flavor">
                    <el-input v-model="supplierCom.Flavor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=产品特殊功用 prop="specialFunctions">
                    <el-input v-model="supplierCom.specialFunctions" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=产品产地 prop="place">
                    <el-input v-model="supplierCom.place" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=出厂日期 prop="dateProduction">
                    <el-input v-model="supplierCom.dateProduction" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=保质期 prop="qualityDate">
                    <el-input v-model="supplierCom.qualityDate" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=供应商编号 prop="supplyNumber">
                    <el-input v-model="supplierCom.supplyNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=产品特色 prop="characteristicText">
                    <el-input v-model="supplierCom.characteristicText" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=批发价格 prop="price">
                    <el-input v-model="supplierCom.price" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 上传单张图片 -->
                <el-form-item label=产品首页图 prop="productBigImg">
                    <el-upload class="avatar-uploader" action="supplierCom/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :auto-upload="true">
                        <img v-if="supplierCom.productBigImg" :src="supplierCom.productBigImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <!-- 上传多张图片 -->
                <!-- <el-form-item label=产品详情图 prop="productSmallImg">
                   <el-upload action="supplierCom/upload" 
                    list-type="picture-card" 
                    :on-success="handleAvatarMultipleSuccess" 
                    :on-preview="handlePictureCardPreview" 
                    :on-remove="handleRemove" 
                    :file-list="supplierCom.productSmallImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取消</el-button>
                <el-button type="primary" @click="update">修改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios";

const { mapActions, mapState } = createNamespacedHelpers("supplierComModule");
export default {
  data() {
    return {
      productBigImg: "",
      productSmallImg: []
    };
  },
  computed: {
    ...mapState(["supplierCom"]),
    updateVisible: {
      get() {
        return this.$store.state.supplierComModule.updateVisible;
      },
      set(updateVisible) {
        this.$store.commit("supplierComModule/setUpdateVisible", updateVisible);
      }
    }
  },
  methods: {
    ...mapActions(["show"]),
    update() {
      let {
        comName,
        comKind,
        comComponent,
        comSpecifications,
        exclusiveSpecifications,
        packingSpecifications,
        Flavor,
        specialFunctions,
        place,
        dateProduction,
        qualityDate,
        supplyNumber,
        characteristicText,
        price,
        productBigImg
      } = this.supplierCom;
      axios({
        method: "put",
        url: "/supplierCom/" + this.supplierCom._id,
        data: {
          comName,
          comKind,
          comComponent,
          comSpecifications,
          exclusiveSpecifications,
          packingSpecifications,
          Flavor,
          specialFunctions,
          place,
          dateProduction,
          qualityDate,
          supplyNumber,
          characteristicText,
          price,
          productBigImg
        }
      }).then(() => {
        this.show();
        this.updateVisible = false;
      });
    },
    handleAvatarSuccess(res) {
      console.log(res);
      this.$store.commit(
        "supplierComModule/setProductBigImg",
        "/upload/" + res
      );
    }
  }
};
</script>

<style>
</style>


