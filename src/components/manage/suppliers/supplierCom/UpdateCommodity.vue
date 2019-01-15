<template>
  <div>
    <el-dialog title="增加商品" :visible.sync="updateVisible" width="450px">
      <el-form :model="updateForm" status-icon ref="updateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="品牌:" prop="comName">
          <el-input type="text" v-model="comName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="產品種類:" prop="comKind">
          <el-input type="text" v-model="comKind" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品成分:" prop="comComponent">
          <el-input type="text" v-model="comComponent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用规格:" prop="comSpecifications">
          <el-input type="text" v-model="comSpecifications" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专属规格:" prop="exclusiveSpecifications">
          <el-input type="text" v-model="exclusiveSpecifications" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装规格:" prop="packingSpecifications">
          <el-input type="text" v-model="packingSpecifications" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="產品口味:" prop="Flavor">
          <el-input type="text" v-model="Flavor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品特殊功用:" prop="specialFunctions">
          <el-input type="text" v-model="specialFunctions" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品产地:" prop="place">
          <el-input type="text" v-model="place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出厂日期:" prop="dateProduction">
          <el-input type="text" v-model="dateProduction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="保质期:" prop="qualityDate">
          <el-input type="text" v-model="qualityDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商编号" prop="supplyNumber">
          <el-input type="text" v-model="supplyNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品描述:" prop="characteristicText">
          <el-input type="text" v-model="characteristicText" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="批发价格:" prop="price">
          <el-input type="text" v-model="price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label=产品首页图 prop="productBigImg">
          <el-upload class="avatar-uploader" 
          action="/supplierCom/upload" 
          :show-file-list="false" 
          :on-success="handleAvatarSuccess" 
          :auto-upload="true">
            <img v-if="supplierCom.productBigImg" 
            :src="supplierCom.productBigImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品详情图:" prop="productSmallImg">
          <el-upload 
          action="/supplierCom/upload" 
          list-type="picture-card" 
          :on-success="handleAvatarMultipleSuccess" 
          :on-preview="handlePictureCardPreview" 
          :on-remove="handleRemove" 
          :file-list="supplierCom.productSmallImg">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
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
      updateForm: {
        productBigImg: "",
        productSmallImg: []
      },
      allImgs: []
    };
  },
  computed: {
    ...mapState(["updateVisible", "supplierCom"]),
    updateVisible: {
      get() {
        return this.$store.state.supplierComModule.updateVisible;
      },
      set(updateVisible) {
        this.$store.commit("supplierComModule/setUpdateVisible", updateVisible);
      }
    },
    comName: {
      get() {
        // return this.$store.state.supplierModules.suppliergood.name;
        return this.supplierCom.comName;
      },
      set(comName) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          comName
        });
      }
    },
    comKind: {
      get() {
        return this.supplierCom.comKind;
      },
      set(comKind) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          comKind
        });
      }
    },
    comComponent: {
      get() {
        return this.supplierCom.comComponent;
      },
      set(comComponent) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          comComponent
        });
      }
    },
    comSpecifications: {
      get() {
        return this.supplierCom.comSpecifications;
      },
      set(comSpecifications) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          comSpecifications
        });
      }
    },
    exclusiveSpecifications: {
      get() {
        return this.supplierCom.exclusiveSpecifications;
      },
      set(exclusiveSpecifications) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          exclusiveSpecifications
        });
      }
    },
    packingSpecifications: {
      get() {
        return this.supplierCom.packingSpecifications;
      },
      set(packingSpecifications) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          packingSpecifications
        });
      }
    },
    Flavor: {
      get() {
        return this.supplierCom.Flavor;
      },
      set(Flavor) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          Flavor
        });
      }
    },
    specialFunctions: {
      get() {
        return this.supplierCom.specialFunctions;
      },
      set(specialFunctions) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          specialFunctions
        });
      }
    },
    place: {
      get() {
        return this.supplierCom.place;
      },
      set(place) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          place
        });
      }
    },
    dateProduction: {
      get() {
        return this.supplierCom.dateProduction;
      },
      set(dateProduction) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          dateProduction
        });
      }
    },
    qualityDate: {
      get() {
        return this.supplierCom.qualityDate;
      },
      set(qualityDate) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          qualityDate
        });
      }
    },
    supplyNumber: {
      get() {
        return this.supplierCom.supplyNumber;
      },
      set(supplyNumber) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          supplyNumber
        });
      }
    },
    characteristicText: {
      get() {
        return this.supplierCom.characteristicText;
      },
      set(characteristicText) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          characteristicText
        });
      }
    },
    price: {
      get() {
        return this.supplierCom.price;
      },
      set(price) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          price
        });
      }
    },
    productBigImg: {
      get() {
        return this.supplierCom.productBigImg;
      },
      set(productBigImg) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.productBigImg,
          productBigImg:productBigImg
        });
      }
    },
    productSmallImg: {
      get() {
        return this.supplierCom.productSmallImg;
      },
      set(productSmallImg) {
        this.$store.commit("supplierComModule/setSupplierCom", {
          ...this.supplierCom,
          productSmallImg: productSmallImg
        });
      }
    }
  },
  methods: {
    ...mapActions(["show"]),
    update() {
       let productSmallImg = JSON.stringify([
        ...this.updateForm.productSmallImg,
        ...this.productSmallImg
      ]);
      axios({
        method: "put",
        url: "/supplierCom/" + this.supplierCom._id,
        data: {...this.supplierCom,productSmallImg}
      }).then(() => {
        this.show();
        this.updateVisible = false;
        this.updateForm.productSmallImg = [];
      });
    },
    // // 修改上传单张图片
    handleAvatarSuccess(res) {
      console.log(res);
      this.$store.commit(
        "supplierComModule/setProductBigImg",
        "/upload/" + res
      );
    },
    // 修改上传多张图片
    handleAvatarMultipleSuccess(res, file) {
      console.log("111111111111", res);
      this.updateForm.productSmallImg = [
        ...this.updateForm.productSmallImg,
        { name: file.name, url: "/upload/" + res }
      ];
      console.log(res, file);
      console.log(" 数据", this.updateForm.productSmallImg);
    },
    handleRemove(file, fileList) {
      console.log("file", file);
      console.log(" 数据", this.updateForm.productSmallImg);
      let allImg = [...this.updateForm.productSmallImg, ...this.supplierCom.productSmallImg];
      for (let i in allImg) {
        if (allImg[i].uid == file.uid) {
          console.log("ID", allImg[i].uid);
          console.log(i, 11111);
          allImg.splice(i, 1);
        }
      }
      this.productSmallImg = allImg;
    },
    handlePreview(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.upDialogVisible = true;
    }
  }
};
</script>

<style>
</style>


