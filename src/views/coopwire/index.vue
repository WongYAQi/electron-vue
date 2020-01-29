<template>
  <div class='coopwire-container'>
    <main>
      <e-tab v-model='activeName'>
        <e-tab-item label='总览' name='all'>
          <e-section label='总览'>
            <button @click='handleClick'>开启</button>
          </e-section>
        </e-tab-item>
        <e-tab-item label='Auth' name='auth'>
          <coop-console label='Auth' platform='auth' command='dev:coopwire-auth' ref='Auth'></coop-console>
        </e-tab-item>
        <e-tab-item label='Platform' name='platform'>
          <coop-console label='Platform' platform='platform' command='dev:coopwire-platform' ref='Platform'></coop-console>
        </e-tab-item>
        <e-tab-item label='Enterprise' name='enterprise'>
          <coop-console label='Enterprise' platform='enterprise' command='dev:coopwire-enterprise' ref='Enterprise'></coop-console>
        </e-tab-item>
      </e-tab>
   </main>
  </div>
</template>

<script>
import axios from 'axios'
import EventBus from '@/components/EventBus/EventBus.ts'
export default {
  components: {
    'e-tab': () => import('@/components/Base/Tab/src/tab'),
    'e-tab-item': () => import('@/components/Base/Tab/src/tab-item'),
    'e-section': () => import('@/components/Base/section'),
    'coop-console': () => import('@/components/Coopwire/console')
  },
  data ()  {
    return {
      activeName: 'all',
      loading:false
    }
  },
  methods: {
    handleClick: async function () {
      await this.$refs.Auth.dev()
      await this.$refs.Platform.dev()
      await this.$refs.Enterprise.dev()
    }
  }
}
</script>
<style lang='less' scoped>
.coopwire-container{
  height: 100%;
  main{
    width: 100%;
    height: 100%;
    .section-container{
      min-height: 500px;
    }
  }
}
.tab{
  box-sizing: border-box;
  /deep/ .el-tabs__content{
    display: none;
  }
}
.console{
  height: 500px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #141414;
  word-break: break-all;
  white-space: pre-line;
  overflow: auto;
}
</style>
