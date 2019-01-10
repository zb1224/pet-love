<template>
    <div>
        <el-card class="box-card">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="供应商编号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="供应商名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="供应商地址">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="供货商电话">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="供应商网址">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="供应商执照" prop="path">
                    <el-upload class="avatar-uploader" action="/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="path" :src="path" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注信息">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">完善供应商信息！</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: ""
      }
    };
  }
};
</script>

<style>
.box-card {
  width: 520px;
  margin: 10px auto;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: black;
  border: 1px solid lightslategray;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>


