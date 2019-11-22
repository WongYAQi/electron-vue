<template>
  <div class='inner-container'>
    <el-tabs v-model='activeName' type='border-card' @tab-click='clickTab' class='tab'>
      <el-tab-pane label='总览' name='all'>
        <coopwire-index></coopwire-index>
      </el-tab-pane>
      <el-tab-pane label='登录系统' name='auth'></el-tab-pane>
      <el-tab-pane label='平台系统' name='platform'></el-tab-pane>
      <el-tab-pane label='企业系统' name='enterprise'></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import CoopwireIndex from '@/components/ProjectCoopwire/index'
export default {
  components: {
    CoopwireIndex
  }
}
</script>
<style lang='less' scoped>
.inner-container{
  width: 100%;
  height: 100%;
}
.tab{
  height: 100%;
  box-sizing: border-box;
}
</style>