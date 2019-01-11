<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">增加</el-button>
    <el-dialog title="增加服务" :visible.sync="dialogVisible" width="60%">
      <el-form status-icon ref="addservices" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="serviceName">
          <el-input v-model="addservices.serviceName" ></el-input>
        </el-form-item>
        <el-form-item label="品类" prop="serviceType">
          <el-input v-model="addservices.serviceType" ></el-input>
        </el-form-item>
         <el-form-item label="适用规格" prop="appropriateSpec">
          <el-input v-model="addservices.appropriateSpec" ></el-input>
        </el-form-item>
        <el-form-item label="服务规格" prop="serviceSpec">
          <el-input v-model="addservices.serviceSpec" ></el-input>
        </el-form-item>
         <el-form-item label="服务等级" prop="serviceLeve">
          <el-input v-model="addservices.serviceLeve" ></el-input>
        </el-form-item>
        <el-form-item label="排期" style="display:flex">
          <div class="block">
          <!-- <span class="demonstration">默认</span> -->
          <el-date-picker
            v-model="date"
            value-format="yy年M月d日"
            type="date"
             placeholder="选择日期">
         </el-date-picker>
  </div>
         <el-time-select 
          size="small" 
          align="left"      
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{  
          start: '08:30',
          step: '00:15',
          end: '18:30'
          }">
       </el-time-select>
       <el-time-select
        size="small"
        align="left"
        placeholder="结束时间"
        v-model="endTime"
       :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30',
        minTime: startTime
        }">
  </el-time-select>
  </el-form-item>
   <el-form-item label="耗时" prop="time">
          <el-input v-model="addservices.time" ></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addservices.price" ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addservice"  >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["show"],
  data() {
    return {
      startTime: '',
      endTime: '',
      date:"",
      dialogVisible: false,
      addservices: {
        serviceName: "",
        serviceType: "",
        appropriateSpec: "",
        serviceSpec: "",
        time: "",
        serviceLeve: "",
        price: "",
      }
    };
  },
  methods: {
   
    addservice() {
      axios({
        method: "post",
        url: "/shop",
        data: {
          serviceName: this.addservices.serviceName,
          serviceType: this.addservices.serviceType,
          serviceTime:this.date+"-"+this.startTime+"-"+this.endTime,
          appropriateSpec: this.addservices.appropriateSpec,
          serviceSpec: this.addservices.serviceSpec,
          time: this.addservices.time,
          serviceLeve: this.addservices.serviceLeve,
          price: this.addservices.price,
          shopId:"5c32f25a3f79bff8f77b2f69"        
        }
      }).then(({ data }) => {
        if (data.status == 1) {
          this.show();
          this.dialogVisible = false;
        }
      });
    }
  },
  components: {
    
  }
};
</script>

<style>
</style>
