<template>
  <el-menu
    class='menu'
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router='true'
    :default-active="defaultActive"
  >
    <el-menu-item index='/coopwire'>
      <span slot='title'>Coopwire项目仪表盘</span>
    </el-menu-item>
    <el-menu-item index='/mock'>
      <span slot='title'>Mock服务</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '/coopwire'
    }
  }
}
</script>

<style>

</style>
