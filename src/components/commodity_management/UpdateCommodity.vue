<template>
  <div>
    <el-dialog title="修改商品" :visible.sync="updateVisible" width="450px">
      <el-form status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品名称" prop="comName">
          <el-input v-model="shopCom.comName"></el-input>
        </el-form-item>
        <el-form-item label=产品种类 prop="comKind">
          <!-- <el-input v-model="shopCom.comKind" autocomplete="off"></el-input> -->
          <el-select v-model="shopCom.comKind" clearable placeholder="请选择产品种类">
            <el-option label="狗粮" value="狗粮"></el-option>
            <el-option label="猫粮" value="猫粮"></el-option>
            <el-option label="鱼食" value="鱼食"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=产品成分 prop="comComponent">
          <el-input v-model="shopCom.comComponent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label=适用规格 prop="comSpecifications">
          <!-- <el-input v-model="shopCom.comSpecifications" autocomplete="off"></el-input> -->
          <el-select v-model="shopCom.comSpecifications" clearable placeholder="请选择产品适用规格">
            <el-option label="超小型宠物" value="超小型宠物"></el-option>
            <el-option label="小型宠物" value="小型宠物"></el-option>
            <el-option label="中型宠物" value="中型宠物"></el-option>
            <el-option label="大型宠物" value="大型宠物"></el-option>
            <el-option label="超大型宠物" value="超大型宠物"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=专属规格 prop="exclusiveSpecifications">
          <!-- <el-input v-model="shopCom.exclusiveSpecifications" autocomplete="off"></el-input> -->
          <el-select v-model="shopCom.exclusiveSpecifications" clearable placeholder="请选择产品专属规格">
            <el-option label="哈士奇" value="哈士奇"></el-option>
            <el-option label="贵宾犬" value="贵宾犬"></el-option>
            <el-option label="萨摩耶" value="萨摩耶"></el-option>
            <el-option label="秋田犬" value="秋田犬"></el-option>
            <el-option label="加菲猫" value="加菲猫"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=包装规格 prop="packingSpecifications">
          <el-input v-model="shopCom.packingSpecifications" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label=产品口味 prop="Flavor">
          <!-- <el-input v-model="shopCom.Flavor" autocomplete="off"></el-input> -->
          <el-select v-model="shopCom.Flavor" clearable placeholder="请选择产品口味">
            <el-option label="鸡肉味" value="鸡肉味"></el-option>
            <el-option label="牛肉味" value="牛肉味"></el-option>
            <el-option label="鱼肉味" value="鱼肉味"></el-option>
            <el-option label="羊肉味" value="羊肉味"></el-option>
            <el-option label="烧烤味" value="烧烤味"></el-option>
            <el-option label="红烧味" value="红烧味"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=产品特殊功用 prop="specialFunctions">
          <el-input v-model="shopCom.specialFunctions" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label=产品产地 prop="place">
          <!-- <el-input v-model="shopCom.place" autocomplete="off"></el-input> -->
          <el-cascader expand-trigger="hover" :options="places" v-model="shopCom.place">
          </el-cascader>
        </el-form-item>
        <el-form-item label=出厂日期 prop="dateProduction">
          <!-- <el-input v-model="shopCom.dateProduction" autocomplete="off"></el-input> -->
          <el-date-picker v-model="shopCom.dateProduction" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label=保质期 prop="qualityDate">
          <!-- <el-input v-model="shopCom.qualityDate" autocomplete="off"></el-input> -->
          <el-select v-model="shopCom.qualityDate" clearable placeholder="请选择产品保质期">
            <el-option label="15天" value="15天"></el-option>
            <el-option label="1个月" value="1个月"></el-option>
            <el-option label="2个月" value="2个月"></el-option>
            <el-option label="3个月" value="3个月"></el-option>
            <el-option label="4个月" value="4个月"></el-option>
            <el-option label="5个月" value="5个月"></el-option>
            <el-option label="6个月" value="6个月"></el-option>
            <el-option label="7个月" value="7个月"></el-option>
            <el-option label="8个月" value="8个月"></el-option>
            <el-option label="9个月" value="9个月"></el-option>
            <el-option label="10个月" value="10个月"></el-option>
            <el-option label="11个月" value="11个月"></el-option>
            <el-option label="12个月" value="12个月"></el-option>
            <el-option label="18个月" value="18个月"></el-option>
            <el-option label="24个月" value="24个月"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=供应商编号 prop="supplyNumber">
          <el-input v-model="shopCom.supplyNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label=产品特色 prop="characteristicText">
          <el-input v-model="shopCom.characteristicText" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label=批发价格 prop="price">
          <el-input v-model="shopCom.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label=产品数量 prop="shopComNum">
          <!-- <el-input v-model="shopCom.shopComNum"></el-input> -->
          <el-input-number v-model="shopCom.shopComNum" :min="1"></el-input-number>
        </el-form-item>
        <!-- 上传单张图片 -->
        <el-form-item label=产品首页图 prop="productBigImg">
          <el-upload class="avatar-uploader" action="/shopCom/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :auto-upload="true">
            <img v-if="shopCom.productBigImg" :src="shopCom.productBigImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 上传多张图片 -->
        <el-form-item label=产品详情图 prop="productSmallImg">
          <el-upload action="/shopCom/upload" list-type="picture-card" :on-success="handleAvatarMultipleSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="shopCom.productSmallImg">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- :on-preview="handlePictureCardPreview" -->
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

const { mapActions, mapState } = createNamespacedHelpers("shopComModule");
export default {
  data() {
    return {
      places: [
        {
          value: "中国",
          label: "中国",
          children: [
            {
              value: "新疆维吾尔自治区",
              label: "新疆维吾尔自治区",
              children: [
                {
                  value: "阿克苏",
                  label: "阿克苏"
                },
                {
                  value: "阿拉尔",
                  label: "阿拉尔"
                },
                {
                  value: "乌鲁木齐",
                  label: "乌鲁木齐"
                }
              ]
            },
            {
              value: "四川省",
              label: "四川省",
              children: [
                {
                  value: "成都",
                  label: "成都"
                },
                {
                  value: "南充",
                  label: "南充"
                },
                {
                  value: "德阳",
                  label: "德阳"
                }
              ]
            }
          ]
        },
        {
          value: "美国",
          label: "美国",
          children: [
            {
              value: "林肯",
              label: "林肯"
            },
            {
              value: "波士顿",
              label: "波士顿"
            },
            {
              value: "纽约",
              label: "纽约"
            }
          ]
        },
        {
          value: "韩国",
          label: "韩国",
          children: [
            {
              value: "汉城",
              label: "汉城"
            },
            {
              value: "釜山",
              label: "釜山"
            },
            {
              value: "济州道",
              label: "济州道"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState(["shopCom"]),
    updateVisible: {
      get() {
        return this.$store.state.shopComModule.updateVisible;
      },
      set(updateVisible) {
        this.$store.commit("shopComModule/setUpdateVisible", updateVisible);
      }
    },
    comName: {
      get() {
        return this.shopCom.comName;
      },
      set(value) {
        this.setComName(value);
      }
    },
    comKind: {
      get() {
        return this.shopCom.comKind;
      },
      set(value) {
        this.setComKind(value);
      }
    },
    comComponent: {
      get() {
        return this.shopCom.comComponent;
      },
      set(value) {
        this.setComComponent(value);
      }
    },
    comSpecifications: {
      get() {
        return this.shopCom.comSpecifications;
      },
      set(value) {
        this.setComSpecifications(value);
      }
    },
    exclusiveSpecifications: {
      get() {
        return this.shopCom.exclusiveSpecifications;
      },
      set(value) {
        this.setExclusiveSpecifications(value);
      }
    },
    packingSpecifications: {
      get() {
        return this.shopCom.packingSpecifications;
      },
      set(value) {
        this.setPackingSpecifications(value);
      }
    },
    Flavor: {
      get() {
        return this.shopCom.Flavor;
      },
      set(value) {
        this.setFlavor(value);
      }
    },
    specialFunctions: {
      get() {
        return this.shopCom.specialFunctions;
      },
      set(value) {
        this.setSpecialFunctions(value);
      }
    },
    place: {
      get() {
        return this.shopCom.place;
      },
      set(value) {
        this.setPlace(value);
      }
    },
    dateProduction: {
      get() {
        return this.shopCom.dateProduction;
      },
      set(value) {
        this.setDateProduction(value);
      }
    },
    qualityDate: {
      get() {
        return this.shopCom.qualityDate;
      },
      set(value) {
        this.setQualityDate(value);
      }
    },
    supplyNumber: {
      get() {
        return this.shopCom.supplyNumber;
      },
      set(value) {
        this.setSupplyNumber(value);
      }
    },
    characteristicText: {
      get() {
        return this.shopCom.characteristicText;
      },
      set(value) {
        this.setCharacteristicText(value);
      }
    },
    price: {
      get() {
        return this.shopCom.price;
      },
      set(value) {
        this.setPrice(value);
      }
    },
    shopComNum: {
      get() {
        return this.shopCom.shopComNum;
      },
      set(value) {
        this.setShopComNum(value);
      }
    },
    productBigImg: {
      get() {
        return this.shopCom.productBigImg;
      },
      set(value) {
        this.setProductBigImg(value);
      }
    },
    productSmallImg: {
      get() {
        return this.shopCom.productSmallImg||[];
      },
      set(value) {
        // this.setProductSmallImg({...this.shopCom,productSmallImg:value});
        this.setProductSmallImg(value);
      }
    },
    // images: {
    //   get() {
    //     console.log("images", this.storeGood.images);
    //     return this.storeGood.images || [];
    //   },
    //   set(value) {
    //     console.log("images", value);
    //     this.setStoreGood({ ...this.storeGood, images: value });
    //   }
    // }
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
        shopComNum,
        productBigImg,
        productSmallImg
      } = this.shopCom;
      axios({
        method: "put",
        url: "/shopCom/" + this.shopCom._id,
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
          shopComNum,
          productBigImg,
          productSmallImg:JSON.stringify(this.shopCom.productSmallImg)
        }
      }).then(() => {
        this.show();
        this.updateVisible = false;
      });
    },
    // 单张图片
    handleAvatarSuccess(res) {
      console.log(res);
      // this.$store.commit("shopComModule/setProductBigImg", "/upload/" + res);
      this.shopCom.productBigImg = "/upload/" + res;
    },
    // 多张图片
    handleAvatarMultipleSuccess(res, file) {
      // this.$store.commit("shopComModule/setStuPath", "/upload/" + res);
      this.shopCom.productSmallImg = [
        ...this.shopCom.productSmallImg,
        { name: file.name, url: "/upload/" + res }
      ];
      console.log(res, file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let arr = this.shopCom.productSmallImg;
      for (let i in arr) {
        if (arr[i].uid == file.uid) {
          arr.splice(i, 1);
          break;
        }
      }
      this.shopCom.productSmallImg = arr;
    },
    handlePreview(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
        console.log(file);
    }
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
  }
};
</script>

<style>
</style>


