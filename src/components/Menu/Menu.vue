<template>
  <el-menu
    class='menu'
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="defaultActive"
  >
    <el-menu-item index='1'>
      <span slot='title'>Coopwire项目仪表盘</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '1'
    }
  }
}
</script>

<style>

</style>
