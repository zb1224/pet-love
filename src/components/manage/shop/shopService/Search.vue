<template>
    <div>
         <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
      <el-select v-model="type" class="select" slot="prepend" placeholder="请选择">
        <el-option label="全部" value=""></el-option>
        <el-option label="名称" value="serviceName"></el-option>
        <el-option label="品类" value="serviceType"></el-option>
        <el-option label="排期" value="serviceTime"></el-option>
        <el-option label="适用规格" value="appropriateSpec"></el-option>
        <el-option label="服务规格" value="serviceSpec"></el-option>
        <el-option label="耗时" value="time"></el-option>
        <el-option label="服务员等级" value="serviceLeve"></el-option>
        <el-option label="价格" value="price"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    </div>
</template>
 <script>
 export default {
     props:["show"],
     data(){
         return{
             value:"",
             type:""
         }    
     },
     methods:{
         search:function(){
             
             let {type,value}=this
             console.log("111",type,value)
              this.show(1,5,type,value)
         }
     }
 }
 </script>
 
<style>
 select{
     vertical-align: middle;
 }
</style>