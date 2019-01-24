<template>
    <div>
<el-dialog
  title="修改店铺信息 "
  :visible.sync="updataVisible"
  width="50%">
   <el-form :model="shop" ref="shop" :rules="rules" status-icon label-width="150px">
      <el-form-item label="店主手机号：" prop="users.logTel">
                <el-input v-model="logTel" :disabled="bool"></el-input>
                <el-tooltip effect="dark" content="你输入的手机号对应这位店主" placement="right-start" class="item">
                  <el-button>店主名：{{shop.users.Name}}</el-button>
                </el-tooltip>
                <el-button @click="bool = false">店面易主</el-button>
            </el-form-item>
         <el-form-item label="店名：" prop="shopName" label-width="150px" required>
                <el-input v-model="shop.shopName"></el-input>
            </el-form-item>
            <el-form-item label="营业执照号：" prop="LicenseNumber" label-width="150px" required>
            <el-input v-model="shop.LicenseNumber"></el-input>
        </el-form-item>
        <el-form-item label="营业执照照片：" prop="LicenseiImg" label-width="150px" required>
           <el-upload
            class="avatar-uploader"
            action="/index/upload"
            :auto-upload="true"
            :show-file-list="false"
            :on-success="imageSuccess1">
      <img v-if="shop.LicenseiImg" :src="shop.LicenseiImg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>
        <el-form-item label="城市：" prop="city" label-width="150px" required>
             <el-cascader
    expand-trigger="hover"
    :options="citys"
    v-model="shop.city">
  </el-cascader>
        </el-form-item>
        <el-form-item label="地址：" prop="addr" label-width="150px" required>
            <el-input v-model="shop.addr"></el-input>
        </el-form-item>
        <el-form-item label="法人：" prop="legalPerson" label-width="150px" required>
            <el-input v-model="shop.legalPerson"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="Tel" label-width="150px" required>
            <el-input v-model="shop.Tel"></el-input>
        </el-form-item>
        <el-form-item label="店面图片：" prop="indexImg" label-width="150px" required>
          <el-upload
            class="avatar-uploader"
            action="/index/upload"
            :auto-upload="true"
            :show-file-list="false"
            :on-success="imageSuccess2">
      <img v-if="shop.indexImg" :src="shop.indexImg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>
        <el-form-item label="特色：" prop="characteristic" label-width="150px" required>
            <el-input v-model="shop.characteristic"></el-input>
        </el-form-item>
        <el-form-item label="VIP等级：" prop="VIPLeve" label-width="150px" required>
           <el-select v-model="shop.VIPLeve" placeholder="请选择">
      <el-option label="1级" value="1"></el-option>
      <el-option label="2级" value="2"></el-option>
      <el-option label="3级" value="3"></el-option>
      <el-option label="4级" value="4"></el-option>
      <el-option label="5级" value="5"></el-option>
      <el-option label="无" value="0"></el-option>
    </el-select>
        </el-form-item>
        <el-form-item label="佣金：" prop="Commission" label-width="150px" required>
            <el-input v-model="shop.Commission"></el-input>
        </el-form-item>
        <el-form-item
    v-for="(item, index) in shop.Employee"
    :label="'店员' + (index+1)"
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
    <el-button type="primary" @click="upDataShop('shop')">修 改</el-button>
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
      rules: {
        users: {
          logTel: [
            { message: "请输入手机号", required: true },
            { pattern: /^1\d{10}$/, message: "手机号格式不正确" },
            { validator: this.havePhone }
          ]
        }
      },
      bool: true,
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
  computed: {
    ...mapState("shopModules", ["shop", "updataVisible"]),
    updataVisible: {
      get() {
        return this.$store.state.shopModules.updataVisible;
      },
      set(updataVisible) {
        this.$store.commit("shopModules/setVisible", updataVisible);
      }
    },
    logTel: {
      get() {
        return this.$store.state.shopModules.shop.users.logTel;
      },
      set(value) {
        this.$store.commit("shopModules/setLogTel", value);
      }
    }
  },
  methods: {
    ...mapActions("shopModules", ["showShops","showUnShops"]),
    havePhone(rules, value, callback) {
      if (value) {
        axios({
          methods: "get",
          url: "/index",
          params: {
            logTel: value
          }
        }).then(({ data }) => {
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
            this.$store.commit("shopModules/setShopUsers", data.data);
          } else {
            callback("查无此店主用户");
          }
        });
      }
    },
    imageSuccess1(res, file) {
      this.shop.LicenseiImg = "/upload/" + res;
    },
    imageSuccess2(res, file) {
      this.shop.indexImg = "/upload/" + res;
    },
    addEmployee() {
      this.shop.Employee.push({
        name: "",
        job: "",
        tel: ""
      });
    },
    removeEmployee(item) {
      console.log(item);
      var index = this.shop.Employee.indexOf(item);
      if (index !== -1) {
        this.shop.Employee.splice(index, 1);
      }
    },
    upDataShop(formName) {
      console.log(this.shop.city);
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            method: "put",
            url: "/shop/" + this.shop._id,
            data: {
              ...this.shop,
              status: this.bool == true ? "1" : "0",
              users: this.shop.users._id
            }
          }).then(({ data }) => {
            this.updataVisible = false;
            this.showShops();
            this.showUnShops();
            this.bool = true;
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
</style>