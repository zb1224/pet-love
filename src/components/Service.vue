<template>
  <div>
    <Addservice :show="show"></Addservice>
    <search  :show="show"  />
    <el-table :data="serviceData" style="width: 100%">
      <el-table-column prop="serviceName" label="名称" width="100"></el-table-column>
      <el-table-column prop="serviceType" label="服务类型" width="100"></el-table-column>
      <el-table-column prop="serviceTime" label="服务排期" width="100"></el-table-column>
      <el-table-column prop="appropriateSpec" label="适用规格" width="100"></el-table-column>
      <el-table-column prop="serviceSpec" label="服务规格" width="100"></el-table-column>
      <el-table-column prop="serviceLeve" label="服务员等级" width="100"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column prop="time" label="耗时" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="updatebtn(scope.$index, scope.row)">修改</el-button>
           <el-button size="mini" type="danger" @click="deletebtn(scope.$index, scope.row)">删除</el-button>
        </template>
       
      </el-table-column>
    </el-table>
    <!-- 修改的对话框 -->
    <el-dialog title="修改服务" :visible.sync="dialogVisible" width="60%">
      <el-form status-icon ref="serviceData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="serviceName">
          <el-input v-model="serviceData[index].serviceName"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" prop="serviceType">
          <el-input v-model="serviceData[index].serviceType"></el-input>
        </el-form-item>
        <el-form-item label="适用规格" prop="appropriateSpec">
          <el-input v-model="serviceData[index].appropriateSpec"></el-input>
        </el-form-item>
        <el-form-item label="服务规格" prop="serviceSpec">
          <el-input v-model="serviceData[index].serviceSpec"></el-input>
        </el-form-item>
        <el-form-item label="服务等级" prop="serviceLeve">
          <el-input v-model="serviceData[index].serviceLeve"></el-input>
        </el-form-item>
        <el-form-item label="排期" style="display:flex">
           <div class="block">
        <el-date-picker
        v-model="date"
         value-format="yy年M月d日"
        type="date"
         placeholder="选择日期">
        </el-date-picker>
  </div>
          <el-time-select
            id="aaa"
            size="small"
            align="left"
            placeholder="起始时间"
            v-model="startTime"
            :picker-options="{  
          start: '08:30',
          step: '00:15',
          end: '18:30'
          }"
          ></el-time-select>
          <el-time-select
            id="aaa"
            size="small"
            align="left"
            placeholder="结束时间"
            v-model="endTime"
            :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30',
        minTime: startTime
        }"
          ></el-time-select>
         
        </el-form-item>
        <el-form-item label="耗时" prop="time">
          <el-input v-model="serviceData[index].time"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="serviceData[index].price"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateservice">确 定</el-button>
      </span>
    </el-dialog>
    <Page :pagination="pagination" :show="show" ></Page>
  </div>
</template>

<script>
import axios from "axios";
import Addservice from "./Addservice";
import Page from "./Page";
import Search from "./Search"

export default {
  created() {
    this.show();
  },
  methods: {
    
      //修改服务
    updatebtn: function(index, row) {
      this.index = index;
      this.id = row._id;
      this.dialogVisible = true;
    },
    //删除服务
    deletebtn(index,row){
        let id=row._id;
          axios({
        method: "delete",
        url: "/shop/"+id,
      }).then(({ data }) => {
        if(data.status==1){
            this.show();
        }
      });  
    },
    show: function(page=1,rows=5,type,value) {
      axios({
        method: "get",
        url: "/shop",
        params: {
          page,
          rows,
          type,
          value
        }
      }).then(({ data }) => {
        this.serviceData = data.rows;
        console.log("666",this.serviceData)
        this.pagination=data;
        
      });
    },
    updateservice: function() {
      axios({
        method: "put",
        url: "/shop/" + this.id,
        data: {
          serviceName: this.serviceData[this.index].serviceName,
          serviceType: this.serviceData[this.index].serviceType,
          serviceTime: this.serviceData[this.index].serviceTime,
          appropriateSpec: this.serviceData[this.index].appropriateSpec,
          serviceSpec: this.serviceData[this.index].serviceSpec,
          time: this.serviceData[this.index].time,
          serviceLeve: this.serviceData[this.index].serviceLeve,
          price: this.serviceData[this.index].price
        }
      }).then(({ data }) => {
        if (data.status == 1) {
          this.dialogVisible = false;
        }
      });
    }
  },

  computed: {
    date:{
       set(newValue) {
        this.serviceData[this.index].serviceTime =newValue + "-" +this.serviceData[this.index].serviceTime.split("-")[1]+"-"+this.serviceData[this.index].serviceTime.split("-")[2];         
      },
      get() {
        if (this.serviceData[this.index].serviceTime !== undefined) {
          return this.serviceData[this.index].serviceTime.split("-")[0];
        }
      }
    },
    startTime: {
      set(newValue) {
        this.serviceData[this.index].serviceTime =this.serviceData[this.index].serviceTime.split("-")[0]+"-"+newValue + "-" +this.serviceData[this.index].serviceTime.split("-")[2];         
      },
      get() {
        if (this.serviceData[this.index].serviceTime !== undefined) {
          return this.serviceData[this.index].serviceTime.split("-")[1];
        }
      }
    },
    endTime: {
      set(newValue) {
        this.serviceData[this.index].serviceTime =this.serviceData[this.index].serviceTime.split("-")[0]+"-"+ this.serviceData[this.index].serviceTime.split("-")[1] + "-" +newValue;       
      },
      get() {
        if (this.serviceData[this.index].serviceTime !== undefined) {
          return this.serviceData[this.index].serviceTime.split("-")[2];
        }
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      serviceData: [{}],
      index: 0,
      id: "",
      pagination:{}
    };
  },
  components: {
    Addservice,Page,Search
  }
};
</script>

<style>
</style>
