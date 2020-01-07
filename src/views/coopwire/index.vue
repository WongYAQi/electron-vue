<template>
  <div class='inner-container'>
    <header>
      <w-tab v-model='activeName'>
        <w-tab-item label='总览' name='all'></w-tab-item>
        <w-tab-item label='Auth' name='auth'></w-tab-item>
        <w-tab-item label='Platform' name='platform'></w-tab-item>
        <w-tab-item label='Enterprise' name='enterprise'></w-tab-item>
      </w-tab>
    </header>
    <main>
      <keep-alive>
        <component v-bind:is='componentName' v-bind='componentBind'></component>
      </keep-alive>
    </main>
  </div>
</template>
<script>
import WTab from '@/components/Base/Tab/src/tab.vue'
import WTabItem from '@/components/Base/Tab/src/tab-item.vue'
import MyConsole from '@/components/RealtimeConsole/console.vue'
import CoopwireIndex from '@/components/ProjectCoopwire/index.vue'
import axios from 'axios'
import EventBus from '@/components/EventBus/EventBus.ts'
const mapComponent = new Map([
  ['all', 'CoopwireIndex'],
  ['auth', 'AuthConsole'],
  ['platform', 'PlatformConsole'],
  ['enterprise', 'EnterpriseConsole']
])
const mapBind = new Map([
  ['all', { key: 'index' } ],
  ['auth', { id: '1', target: 'auth', command: 'dev:coopwire-auth', key: 'con1' }],
  ['platform', { id: '2', target: 'platform', command: 'dev:coopwire-platform', key: 'con2' }],
  ['enterprise', { id: '3', target: 'enterprise', command: 'dev:coopwire-enterprise', key: 'con3' }]
])
export default {
  components: {
    CoopwireIndex,
    'AuthConsole' : MyConsole,
    'PlatformConsole':MyConsole,
    'EnterpriseConsole': MyConsole,
    'w-tab': WTab,
    'w-tab-item': WTabItem
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
      loading:false
    }
  },
  computed: {
    componentName () {
      return mapComponent.get(this.activeName)
    },
    componentBind () {
      return mapBind.get(this.activeName)
    }
  },
  created () {
    this.componentName = 'CoopwireIndex'
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