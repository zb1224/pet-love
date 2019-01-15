<template>
    <div>
        <el-card class="box-card">
            <el-form :model="addForm" status-icon ref="addForm" :rules="rules" label-width="100px">
                <el-form-item label="店铺法人" prop="legalPerson">
                    <el-input v-model="addForm.legalPerson" clearable :disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="店铺名字" prop="shopName">
                    <el-input v-model="addForm.shopName" clearable :disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="营业执照编号" prop="LicenseNumber">
                    <el-input v-model="addForm.LicenseNumber" clearable :disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="营业执照图片">
                    <el-upload class="avatar-uploader" action="/index/upload" :show-file-list="false" :on-success="handleAvatarSuccess1" :auto-upload="true">
                        <img v-if="addForm.LicenseiImg" :src="addForm.LicenseiImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="联系电话" prop="Tel">
                    <el-input v-model="addForm.Tel" clearable :disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="所在城市" prop="city">
                    <!-- <el-input v-model="addForm.city" clearable :disabled="false"></el-input> -->
                    <el-cascader expand-trigger="hover" :options="citys" v-model="addForm.city">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="店铺地址" prop="addr">
                    <el-input v-model="addForm.addr" clearable :disabled="false"></el-input>
                </el-form-item>
                <el-form-item label="店铺经纬度" prop="Location">
                    <el-form-item label="经度" prop="Location">
                        <el-input v-model="addForm.Location.longitude" clearable :disabled="false"></el-input>
                    </el-form-item>
                    <el-form-item label="纬度" prop="Location">
                        <el-input v-model="addForm.Location.latitude" clearable :disabled="false"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="店铺图片">
                    <el-upload class="avatar-uploader" action="/index/upload" :show-file-list="false" :on-success="handleAvatarSuccess2" :auto-upload="true">
                        <img v-if="addForm.indexImg" :src="addForm.indexImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="店铺特色" prop="characteristic">
                    <el-input v-model="addForm.characteristic" clearable></el-input>
                </el-form-item>
                <el-form-item label="VIP等级" prop="VIPLeve">
                    <el-select v-model="addForm.VIPLeve" clearable placeholder="请选择VIP等级">
                        <el-option label="VIP1" value="1"></el-option>
                        <el-option label="VIP2" value="2"></el-option>
                        <el-option label="VIP3" value="3"></el-option>
                        <el-option label="VIP4" value="4"></el-option>
                        <el-option label="VIP5" value="5"></el-option>
                        <el-option label="无" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="佣金比例" prop="Commission">
                    <el-input v-model="addForm.Commission" clearable></el-input>
                </el-form-item>
                <!-- <el-form-item label="店员信息" prop="Employee"> -->

                <el-form-item v-for="(clerk, index) in addForm.Employee" :label="'店员' + (index+1)" :key="index" :prop="'Employee.' + index">
                    <el-input v-model="clerk.name" placeholder="请输入姓名"></el-input>
                    <el-select v-model="clerk.job" placeholder="请选择职位">
                        <el-option label="店长" value="店长"></el-option>
                        <el-option label="店员" value="店员"></el-option>
                        <el-option label="后勤人员" value="后勤人员"></el-option>
                        <el-option label="实习生" value="实习生"></el-option>
                    </el-select>
                    <el-input v-model="clerk.tel" placeholder="请输入联系电话"></el-input>
                    <el-button @click.prevent="removeclerk(clerk)">删除</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addclerk">新增店员</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="add">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
                <!-- </el-form-item> -->
            </el-form>
        </el-card>
    </div>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("shopComModule");
export default {
  data() {
    return {
      disabled: false,
      addForm: {
        legalPerson: "",
        shopName: "",
        LicenseNumber: "",
        addr: "",
        city: "",
        Tel: "",
        VIPLeve: "",
        Commission: "",
        Location: {
          longitude: "",
          latitude: ""
        },
        characteristic: "",
        indexImg: "",
        LicenseiImg: "",
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
,
      rules: {
        legalPerson: [{ required: true }],
        shopName: [{ required: true }],
        LicenseNumber: [{ required: true }],
        addr: [{ required: true }],
        city: [{ required: true }],
        Tel: [{ required: true }],
        VIPLeve: [{ required: true }],
        Commission: [{ required: true }],
        Location: [{ required: true }],
        characteristic: [{ required: true }],
        indexImg: [{ required: true }],
        LicenseiImg: [{ required: true }]
      }
    };
  },
  computed:{
...mapState(["usersId"]),
  },
  methods: {
    ...mapActions(["getSession"]),
      // getSession() {
      //       axios({
      //         method: "get",
      //         url: "/index/getSession"
      //       }).then(({ data }) => {
      //         // if (!data.phone) {
      //         //   //   this.history.replace("/login");
      //         //   this.$router.push("/login");
      //         // } else {
      //         //   this.username = data.phone;
      //         // }
      //         // commit("setUsersId", data._id);
      //         console.log("登录的用户信息",data._id)
      //       //   axios({

      //       //   })
      //       });
      //     },
    add() {
      axios({
        method: "post",
        url: "/shop",
        data: {
          ...this.addForm,
          status: "0",
          users:this.usersId
        }
      }).then(() => {
        // this.dialogVisible = false;
        // this.show();
        this.$alert("提交后信息不可修改，是否确认提交？", "提示");
        console.log("成功");
      });
      console.log("哈哈哈哈哈",this.usersId)
    },
    handleAvatarSuccess1(res, file) {
      this.addForm.LicenseiImg = "/upload/" + res;
      console.log(file);
      console.log(res);
    },
    handleAvatarSuccess2(res, file) {
      this.addForm.indexImg = "/upload/" + res;
      console.log(file);
      console.log(res);
    },
    removeclerk(item) {
      var index = this.addForm.Employee.indexOf(item);
      if (index !== -1) {
        this.addForm.Employee.splice(index, 1);
      }
    },
    addclerk() {
      this.addForm.Employee.push({
        name: "",
        job: "",
        tel: ""
      });
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.box-card {
  width: 550px;
  margin: 0 auto;
}
</style>
