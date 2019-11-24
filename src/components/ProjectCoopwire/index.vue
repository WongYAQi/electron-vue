<template>
  <div class='inner-container'>
    <el-card class='group'>
      <div slot='header'>
        <span>启动</span>
      </div>
      <el-form label-width='100px' class='form'>
        <el-form-item label='系统地址'>
          <el-input v-model='form.address'></el-input>
        </el-form-item>
        <el-form-item label='代理地址'>
          <el-input v-model='form.proxyAddress'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click='changeAddress' type='primary'>变更地址</el-button>
          <el-button @click='restartSystem' type='danger'>一键重启</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        proxyAddress: ''
      }
    }
  },
  methods: {
    restartSystem () {

    },
    changeAddress () {
      
    }
  }
}
</script>

<style lang='less' scoped>
  .inner-container{
    border: 1px solid rgb(221, 223, 222);
  }
  .form{
    width: 50%;
  }
</style>
