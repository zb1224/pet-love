<template>
    <div>
        <el-dialog title="增加商品" :visible.sync="dialogVisible" width="450px">
            <el-form status-icon ref="addForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="产品名称" prop="comName">
                    <el-input v-model="addForm.comName"></el-input>
                </el-form-item>
                <el-form-item label=产品种类 prop="comKind">
                    <el-input v-model="addForm.comKind" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=产品成分 prop="comComponent">
                    <el-input v-model="addForm.comComponent" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=适用规格 prop="comSpecifications">
                    <el-input v-model="addForm.comSpecifications" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=专属规格 prop="exclusiveSpecifications">
                    <el-input v-model="addForm.exclusiveSpecifications" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=包装规格 prop="packingSpecifications">
                    <el-input v-model="addForm.packingSpecifications" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=产品口味 prop="Flavor">
                    <el-input v-model="addForm.Flavor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=产品特殊功用 prop="specialFunctions">
                    <el-input v-model="addForm.specialFunctions" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=产品产地 prop="place">
                    <el-input v-model="addForm.place" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=出厂日期 prop="dateProduction">
                    <el-input v-model="addForm.dateProduction" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=保质期 prop="qualityDate">
                    <el-input v-model="addForm.qualityDate" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=供应商编号 prop="supplyNumber">
                    <el-input v-model="addForm.supplyNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=产品特色 prop="characteristicText">
                    <el-input v-model="addForm.characteristicText" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label=批发价格 prop="price">
                    <el-input v-model="addForm.price" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 上传单张图片 -->
                <el-form-item label=产品首页图 prop="productBigImg">
                    <el-upload class="avatar-uploader" action="/supplierCom/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :auto-upload="true">
                        <img v-if="addForm.productBigImg" :src="addForm.productBigImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <!-- 上传多张图片 -->
                <el-form-item label=产品详情图 prop="productSmallImg">
                    <el-upload action="/supplierCom/upload" list-type="picture-card" :on-success="handleAvatarMultipleSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="addForm.productSmallImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCommodity">增 加</el-button>
            </span>
        </el-dialog>
        <el-button icon="el-icon-plus" @click="dialogVisible = true" class="add-btn">增加商品</el-button>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios";

const { mapActions, mapState } = createNamespacedHelpers("supplierComModule");
export default {
  data() {
    return {
      addForm: {
        comName: "",
        comKind: "",
        comComponent: "",
        comSpecifications: "",
        exclusiveSpecifications: "",
        packingSpecifications: "",
        Flavor: "",
        specialFunctions: "",
        place: "",
        dateProduction: "",
        qualityDate: "",
        supplyNumber: "",
        characteristicText: "",
        price: "",
        productBigImg: "",
        productSmallImg: []
      },
      dialogVisible: false
    };
  },
  computed: {
    ...mapState(["usersId"]),
    ...mapState(["supplierId"])
  },
  methods: {
    ...mapActions(["show"]),
    addCommodity() {
      axios({
        method: "post",
        url: "/supplierCom",
        data: {
          ...this.addForm,
          supplierId: this.supplierId,
          productSmallImg: JSON.stringify(this.addForm.productSmallImg)
        }
      }).then(() => {
        this.show();
        this.dialogVisible = false;
      });
    },
    // 上传单张图片
    handleAvatarSuccess(res, file) {
      this.addForm.productBigImg = "/upload/" + res;
      console.log(file);
      console.log(res);
    },
    // 上传多张图片
    handleAvatarMultipleSuccess(res, file) {
      this.addForm.productSmallImg = [
        ...this.addForm.productSmallImg,
        { name: file.name, url: "/upload/" + res }
      ];
      console.log(res, file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
</style>


