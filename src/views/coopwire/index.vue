<template>
  <div class='inner-container' v-loading='loading'>
    <el-tabs v-model='activeName' type='border-card' @tab-click='click' class='tab'>
      <el-tab-pane label='总览' name='all'></el-tab-pane>
      <el-tab-pane label='登录系统' name='auth'></el-tab-pane>
      <el-tab-pane label='平台系统' name='platform'></el-tab-pane>
      <el-tab-pane label='企业系统' name='enterprise'></el-tab-pane>
    </el-tabs>
    <keep-alive>
      <component v-bind:is='componentName' v-bind='componentBind'></component>
    </keep-alive>
  </div>
</template>
<script>
import MyConsole from '@/components/RealtimeConsole/console.vue'
import CoopwireIndex from '@/components/ProjectCoopwire/index.vue'
import axios from 'axios'
import EventBus from '@/components/EventBus/EventBus.ts'
export default {
  components: {
    'CoopwireIndex': CoopwireIndex,
    'AuthConsole' : MyConsole,
    'PlatformConsole':MyConsole,
    'EnterpriseConsole': MyConsole
  },
  data ()  {
    return {
      activeName: 'all',
      headers: [
        { label: '序章', value: '1' },
        { label: '登录系统', value: '2' },
        { label: '平台系统', value: '3' },
        { label: '企业系统', value: '4' }
      ],
      componentName:'',
      componentBind:{},
      loading:false
    }
  },
  created () {
    this.componentName = 'CoopwireIndex'
    this.loading = true
    axios.get('/coopwire').then((res) => {
      EventBus.$emit('defaultCoopwire')
      return res
    }).finally(() => {
      this.loading = false
    })
  },
  methods: {
    click (item, event) {
      if (item.name === 'all') {
        this.componentName = 'CoopwireIndex'
      } else if (item.name === 'auth') {
        this.componentName = 'AuthConsole'
        this.componentBind = {
          id: '1',
          target: 'auth',
          command: 'dev:coopwire-auth',
          key: 'con1'
        }
        EventBus.$emit('showConsole', '1')
      } else if (item.name === 'platform') {
        this.componentName = 'PlatformConsole'
        this.componentBind = {
          id: '2',
          target: 'platform',
          command: 'dev:coopwire-platform',
          key: 'con2'
        }
        EventBus.$emit('showConsole', '2')
      } else if (item.name === 'enterprise') {
        this.componentName = 'EnterpriseConsole'
        this.componentBind = {
          id: '3',
          target: 'enterprise',
          command: 'dev:coopwire-enterprise',
          key: 'con3'
        }
        EventBus.$emit('showConsole', '3')
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
  box-sizing: border-box;
  /deep/ .el-tabs__content{
    display: none;
  }
}
</style>