<template>
  <div class='inner-container'>
    <p class='title'>Mock服务</p>
    <el-form label-width='80px' class='form' :inline='true'>
      <el-form-item label='Mock地址'>
        <el-input v-model='form.mockport'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button :type='isRuning ? "danger" : "primary"' :loading='loading' @click='open'>{{isRuning ? "关闭" : "启动"}}</el-button>
          <el-button type='primary' @click='reset'>重置</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <main class='main'>
      <ul>
        <li v-for='item in apiList' :key='item'>{{item}}</li>
      </ul>
    </main>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        mockport: ''
      },
      apiList: [],
      loading: false,
      isRuning: false
    }
  },
  created () {
    axios.get('lowdb/mockport').then(res => {
      this.form.mockport = parseInt(res.data)
    })
    axios.get('mock/api').then(res => {
      this.apiList.push(...Object.keys(res.data))
    })
  },
  methods: {
    open () {
      // TODO: 将mock地址上传，作为端口启动express服务
      this.loading = true
      axios.post(`/mock/${this.form.mockport}/start`).then(res => {

      }).finally(() => {
        this.loading = false
      })
    },
    reset () {
      axios.get(`/mock/reset`).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>
<style lang='less' scoped>
.inner-container{
  height: 100%;
  overflow: auto;
}
.title{
  margin: 0 auto;
}
</style>
