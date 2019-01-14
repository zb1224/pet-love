<template>
    <div>
<el-dialog
  title="修改宠主信息 "
  :visible.sync="updataVisible"
  width="50%">
   <el-form :model="petMaster" ref="petMaster" status-icon label-width="100px">
         <el-form-item label="电话：" prop="masterTel">
                <el-input v-model="petMaster.masterTel"></el-input>
            </el-form-item>
            <el-form-item label="昵称：" prop="masterNickName">
            <el-input v-model="petMaster.masterNickName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="truthName">
             <el-input v-model="petMaster.truthName"></el-input>
        </el-form-item>
        <el-form-item label="会员卡：" prop="VIPCard">
            <el-input v-model="petMaster.VIPCard"></el-input>
        </el-form-item>
        <el-form-item label="头像：" prop="masterPhoto">
      <el-upload
            class="avatar-uploader"
            action="/index/upload"
            :auto-upload="true"
            :show-file-list="false"
            :on-success="imageSuccess">
      <img v-if="petMaster.masterPhoto" :src="petMaster.masterPhoto" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>
        <el-form-item label="地址：" prop="masterAddr">
               <el-input v-model="petMaster.masterAddr"></el-input>
        </el-form-item>
        <el-form-item label="区域：" prop="region">
            <el-input v-model="petMaster.region"></el-input>
        </el-form-item>
        <el-form-item label="积分：" prop="integral">
            <el-input v-model="petMaster.integral"></el-input>
        </el-form-item>
        <el-form-item
        class="pets"
    v-for="(item, index) in petMaster.pets"
    :label="'宠物' + (index+1)+':'"
    :key="index"
    :prop="'pets' + index "
  >
    <el-input placeholder="请输入宠物名字" v-model="item.name"></el-input>
    <el-date-picker
      v-model="item.petBirthday"
      type="date"
      placeholder="选择出生日期">
    </el-date-picker>
    <el-cascader
    placeholder="请宠物选择种类"
    expand-trigger="hover"
    :options="petOption"
    v-model="item.category">
  </el-cascader>
    <el-select v-model="item.petColor" placeholder="请选择宠物颜色">
      <el-option label="白" value="白"></el-option>
      <el-option label="黑" value="黑"></el-option>
      <el-option label="灰" value="灰"></el-option>
      <el-option label="棕黄" value="棕黄"></el-option>
      <el-option label="棕色" value="棕色"></el-option>
      <el-option label="花色" value="花色"></el-option>
      <el-option label="其他" value="其他"></el-option>
    </el-select>
    <el-select v-model="item.character" placeholder="请选择宠物性格">
      <el-option label="温顺" value="温顺"></el-option>
      <el-option label="狂野" value="狂野"></el-option>
      <el-option label="暴躁" value="暴躁"></el-option>
      <el-option label="攻击型" value="攻击型"></el-option>
      <el-option label="其他" value="其他"></el-option>
    </el-select>
    <el-button @click.prevent="removePet(item)">删除</el-button>
  </el-form-item>
  <el-form-item>
   <el-button @click="addPet">新增宠物</el-button>
    </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="upDataPetMaster('petMaster')">修 改</el-button>
    <el-button @click="updataVisible = false">取 消</el-button>
  </span>
</el-dialog>
    </div>
</template>


<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
     petOption: [
        {
          value: "狗",
          label: "狗",
          children: [
            {
              value: "金毛",
              label: "金毛"
            },
            {
              value: "比熊",
              label: "比熊"
            },
            {
              value: "拉布拉多",
              label: "拉布拉多"
            },
            {
              value: "萨摩耶",
              label: "萨摩耶"
            },
            {
              value: "贵宾",
              label: "贵宾"
            },
            {
              value: "阿拉斯加",
              label: "阿拉斯加"
            },
            {
              value: "吉娃娃",
              label: "吉娃娃"
            },
            {
              value: "其他",
              label: "其他"
            }
          ]
        },
        {
          value: "猫",
          label: "猫",
          children: [
            {
              value: "波斯猫",
              label: "波斯猫"
            },
            {
              value: "布偶猫",
              label: "布偶猫"
            },
            {
              value: "折耳猫",
              label: "折耳猫"
            },
            {
              value: "狸花猫",
              label: "狸花猫"
            },
            {
              value: "斯芬克斯猫",
              label: "斯芬克斯猫"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState("petMasterModules", ["petMaster", "updataVisible"]),
    updataVisible: {
      get() {
        return this.$store.state.petMasterModules.updataVisible;
      },
      set(updataVisible) {
        this.$store.commit("petMasterModules/setVisible", updataVisible);
      }
    }
  },
  methods: {
    ...mapActions("petMasterModules", ["showPetMasters"]),
    imageSuccess(res, file) {
      this.petMaster.masterPhoto = "/upload/" + res;
    },
    addPet() {
      this.petMaster.pets.push({
        name: "",
        category: [],
        petColor: "",
        petBirthday: "",
        character: ""
      });
    },
    removePet(item) {
        console.log(this.petMaster)
      var index = this.petMaster.pets.indexOf(item);
      if (index !== -1) {
        this.petMaster.pets.splice(index, 1);
      }
    },
    upDataPetMaster(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: "put",
            url: "/petMaster/" + this.petMaster._id,
            data: {
              status: 1,
              ...this.petMaster
            }
          }).then(({ data }) => {
            this.updataVisible = false;
            this.showPetMasters();
          });
        } else {
          alert("输入不能为空");
          return false;
        }
      });
    },
    addPet() {
      this.petMaster.pets.push({
        name: "",
        category: [],
        petColor: "",
        petBirthday: "",
        character: ""
      });
    },
    removePet(item) {
      console.log(item);
      var index = this.petMaster.pets.indexOf(item);
      if (index !== -1) {
        this.petMaster.pets.splice(index, 1);
      }
    }
  }
};
</script>

<style>
</style>