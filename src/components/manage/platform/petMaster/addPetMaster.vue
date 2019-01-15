<template>
 <div>
     <el-button type="primary" @click="dialogVisible = true" icon="el-icon-circle-plus-outline">增加</el-button>
<el-dialog
  title="增加宠主"
  :visible.sync="dialogVisible"
  width="50%">
   <el-form :model="addPetMasterFrom" status-icon :rules="rules" ref="addPetMasterFrom" label-width="150px">
            <el-form-item label="电话：" prop="masterTel">
                <el-input v-model="addPetMasterFrom.masterTel"></el-input>
            </el-form-item>
            <el-form-item label="昵称：" prop="masterNickName">
            <el-input v-model="addPetMasterFrom.masterNickName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="truthName">
             <el-input v-model="addPetMasterFrom.truthName"></el-input>
        </el-form-item>
        <el-form-item label="会员卡：" prop="VIPCard">
            <el-input v-model="addPetMasterFrom.addr"></el-input>
        </el-form-item>
        <el-form-item label="头像：" prop="masterPhoto">
      <el-upload
            class="avatar-uploader"
            action="/index/upload"
            :auto-upload="true"
            :show-file-list="false"
            :on-success="imageSuccess">
      <img v-if="addPetMasterFrom.masterPhoto" :src="addPetMasterFrom.masterPhoto" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>
        <el-form-item label="地址：" prop="masterAddr">
               <el-input v-model="addPetMasterFrom.masterAddr"></el-input>
        </el-form-item>
        <el-form-item label="区域：" prop="region">
            <el-input v-model="addPetMasterFrom.region"></el-input>
        </el-form-item>
        <el-form-item label="积分：" prop="integral">
            <el-input v-model="addPetMasterFrom.integral"></el-input>
        </el-form-item>
        <el-form-item
        class="pets"
    v-for="(item, index) in addPetMasterFrom.pets"
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
    <el-button @click="resetForm('addPetMasterFrom')">重置</el-button>
    <el-button @click="addPetMaster('addPetMasterFrom')">增 加</el-button>      
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
</el-dialog>
 </div>
</template>


<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      rules: {
        logTel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        logPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        logEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        Name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        attribute: [{ required: true, message: "请选择身份", trigger: "blur" }]
      },
      indexImg: "",
      dialogVisible: false,
      addPetMasterFrom: {
        masterTel: "",
        masterNickName: "",
        truthName: "",
        VIPCard: [],
        masterPhoto: "",
        masterAddr: "",
        region: "",
        integral: "",
        pets: [
          {
            name: "",
            category: [],
            petColor: "",
            petBirthday: "",
            character: ""
          }
        ]
      },
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
  methods: {
    ...mapActions("petMasterModules", ["showPetMasters"]),
    imageSuccess(res, file) {
      this.addPetMasterFrom.masterPhoto = "/upload/" + res;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addPet() {
      this.addPetMasterFrom.pets.push({
        name: "",
        category: [],
        petColor: "",
        petBirthday: "",
        character: ""
      });
    },
    removePet(item) {
      console.log(item);
      var index = this.addPetMasterFrom.pets.indexOf(item);
      if (index !== -1) {
        this.addPetMasterFrom.pets.splice(index, 1);
      }
    },
    addPetMaster(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/petMaster",
            data: {
              ...this.addPetMasterFrom,
              status: "1"
            }
          }).then(({ data }) => {
            this.dialogVisible = false;
            this.showPetMasters();
          });
        } else {
          alert("输入不能为空");
          return false;
        }
      });
    }
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