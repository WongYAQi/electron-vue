<template>
  <div class='inner-container'>
    <keep-alive>
      <el-tabs v-model='activeName' type='border-card' @tab-click='click' class='tab'>
        <el-tab-pane label='总览' name='all'>
          <coopwire-index v-if='activeName === "all"'></coopwire-index>
        </el-tab-pane>
        <el-tab-pane label='登录系统' name='auth'>
          <my-console v-if='activeName === "auth"'></my-console>
        </el-tab-pane>
        <el-tab-pane label='平台系统' name='platform'></el-tab-pane>
        <el-tab-pane label='企业系统' name='enterprise'></el-tab-pane>
      </el-tabs>
    </keep-alive>
  </div>
</template>
<script>
import MyConsole from '@/components/RealtimeConsole/console'
import CoopwireIndex from '@/components/ProjectCoopwire/index'
export default {
  components: {
    CoopwireIndex, MyConsole
  },
  data () {
    return {
      activeName: 'all',
      componentName: 'CoopwireIndex',
      componentBind: {}
    }
  },
  methods: {
    click (item) {
      if (item === 'all') {
        this.componentName = 'coopwire-index'
      } else if (item === 'auth') {
        this.componentName = 'my-console'
        this.componentBind = {
          key: 'auth',
          target: 'npm run dev:coopwire-auth'
        }
      }
    }
  }
}
</script>
<style lang='less' scoped>
.inner-container{
  height: 100%;
}
.tab{
  height: 100%;
  box-sizing: border-box;
}
</style>