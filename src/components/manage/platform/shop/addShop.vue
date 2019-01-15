<template>
 <div>
     <el-button type="primary" @click="dialogVisible = true" icon="el-icon-circle-plus-outline">增加</el-button>
<el-dialog
  title="增加店铺"
  :visible.sync="dialogVisible"
  width="50%">
   <el-form :model="users" status-icon :rules="rules" ref="users" label-width="150px">
            <el-form-item label="店主手机号：" prop="logTel">
                <el-input v-model="users.logTel" @focus="changeShopMaster"></el-input>
                <el-tooltip effect="dark" content="你输入的手机号对应这位店主" placement="right-start" class="item">
                  <el-button>店主名：{{users.Name}}</el-button>
                </el-tooltip>
            </el-form-item>
    </el-form>
   <el-form :model="addShopFrom" status-icon ref="addShopFrom" label-width="150px">
     <el-form-item label="店名：" prop="shopName">
                <el-input v-model="addShopFrom.shopName"></el-input>
            </el-form-item>
            <el-form-item label="营业执照号：" prop="LicenseNumber">
            <el-input v-model="addShopFrom.LicenseNumber"></el-input>
        </el-form-item>
        <el-form-item label="营业执照照片：" prop="LicenseiImg">
           <el-upload
            class="avatar-uploader"
            action="/index/upload"
            :auto-upload="true"
            :show-file-list="false"
            :on-success="imageSuccess1">
      <img v-if="addShopFrom.LicenseiImg" :src="addShopFrom.LicenseiImg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>
        <el-form-item label="地址：" prop="addr">
            <el-input v-model="addShopFrom.addr"></el-input>
        </el-form-item>
        <el-form-item label="坐标：" prop="Location">
            纬度：<el-input v-model="addShopFrom.Location.longitude"></el-input>
            经度：<el-input v-model="addShopFrom.Location.latitude"></el-input>
        </el-form-item>
        <el-form-item label="城市：" prop="city">
             <el-cascader
    expand-trigger="hover"
    :options="citys"
    v-model="addShopFrom.city">
  </el-cascader>
        </el-form-item>
        <el-form-item label="法人：" prop="legalPerson">
            <el-input v-model="addShopFrom.legalPerson"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="Tel">
            <el-input v-model="addShopFrom.Tel"></el-input>
        </el-form-item>
        <el-form-item label="店面图片：" prop="indexImg">
          <el-upload
            class="avatar-uploader"
            action="/index/upload"
            :auto-upload="true"
            :show-file-list="false"
            :on-success="imageSuccess2">
      <img v-if="addShopFrom.indexImg" :src="addShopFrom.indexImg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>
        <el-form-item label="特色：" prop="characteristic">
            <el-input v-model="addShopFrom.characteristic"></el-input>
        </el-form-item>
        <el-form-item label="VIP等级：" prop="VIPLeve">
           <el-select v-model="addShopFrom.VIPLeve" placeholder="请选择">
      <el-option label="VIP1" value="1"></el-option>
      <el-option label="VIP2" value="2"></el-option>
      <el-option label="VIP3" value="3"></el-option>
      <el-option label="VIP4" value="4"></el-option>
      <el-option label="VIP5" value="5"></el-option>
      <el-option label="无" value="0"></el-option>
    </el-select>
        </el-form-item>
        <el-form-item label="佣金：" prop="Commission">
            <el-input v-model="addShopFrom.Commission"></el-input>
        </el-form-item>
  <el-form-item
    v-for="(item, index) in addShopFrom.Employee"
    :label="'店员' + (index+1)+':'"
    :key="index"
    :prop="'Employee' + index "
  >
    <el-input placeholder="请输入店员姓名" v-model="item.name"></el-input>
   <el-select v-model="item.job" placeholder="请选择职位">
      <el-option label="店长" value="店长"></el-option>
      <el-option label="店员" value="店员"></el-option>
      <el-option label="后勤人员" value="后勤人员"></el-option>
      <el-option label="实习生" value="实习生"></el-option>
    </el-select>
    <el-input placeholder="请输入店员电话" v-model="item.tel"></el-input>
    <el-button @click.prevent="removeEmployee(item)">删除</el-button>
  </el-form-item>
  <el-form-item>
   <el-button @click="addEmployee">新增店员</el-button>
    </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('addShopFrom')">重置</el-button>
    <el-button @click="addShop('addShopFrom')">增 加</el-button>      
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
        logTel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^1\d{10}$/, message: "手机号格式不正确" },
          { validator: this.repeatPhone }
        ]
      },
      users: {
        logPwd: "",
        logTel: "",
        logEmail: "",
        Name: "",
        attribute: ""
      },
      dialogVisible: false,
      addShopFrom: {
        shopName: "",
        LicenseNumber: "",
        LicenseiImg: "",
        addr: "",
        Location: {
          longitude: "",
          latitude: ""
        },
        city: [],
        legalPerson: "",
        Tel: "",
        indexImg: "",
        characteristic: "",
        VIPLeve: "",
        Commission: "",
        status: "",
        Employee: [
          {
            name: "",
            job: "",
            tel: ""
          }
        ]
      },
      citys: [
        {
          value: "新疆省",
          label: "新疆省",
          children: [
            {
              value: "乌鲁木齐市",
              label: "乌鲁木齐市"
            },
            {
              value: "奎屯市",
              label: "奎屯市"
            },
            {
              value: "阿克苏市",
              label: "阿克苏市"
            },
            {
              value: "克拉玛依市",
              label: "克拉玛依市"
            }
          ]
        },
        {
          value: "四川省",
          label: "四川省",
          children: [
            {
              value: "成都市",
              label: "成都市"
            },
            {
              value: "德阳市",
              label: "德阳市"
            },
            {
              value: "绵阳市",
              label: "绵阳市"
            }
          ]
        }
      ]
    };
  },
  methods: {
    ...mapActions("shopModules", ["showShops"]),
    imageSuccess1(res, file) {
      this.addShopFrom.LicenseiImg = "/upload/" + res;
    },
    imageSuccess2(res, file) {
      this.addShopFrom.indexImg = "/upload/" + res;
    },
    repeatPhone(rules, value, callback) {
      if (value) {
        axios({
          methods: "get",
          url: "/index",
          params: {
            logTel: value
          }
        }).then(({ data }) => {
          console.log(data);
          if (data.data.attribute == "store" && data.data.status == 1) {
            axios({
              methods: "get",
              url: "/index/shop",
              params: {
                usersId: data.data._id
              }
            }).then(({ data }) => {
              if (data.length > 0) {
                callback("该用户已经有店");
              } else {
                callback();
              }
            });
            this.users = data.data;
          } else {
            callback("查无此店主用户");
          }
        });
      }
    },
    changeShopMaster() {
      console.log(154);
      this.users = {
        logPwd: "",
        logTel: "",
        logEmail: "",
        Name: "",
        attribute: ""
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addEmployee() {
      this.addShopFrom.Employee.push({
        name: "",
        job: "",
        tel: ""
      });
    },
    removeEmployee(item) {
      console.log(item);
      var index = this.addShopFrom.Employee.indexOf(item);
      if (index !== -1) {
        this.addShopFrom.Employee.splice(index, 1);
      }
    },
    addShop(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/shop",
            data: {
              ...this.addShopFrom,
              users: this.users._id,
              status: "1"
            }
          }).then(({ data }) => {
            this.dialogVisible = false;
            this.showShops();
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
.item {
  width: 200px;
}
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