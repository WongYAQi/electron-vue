<template>
  <e-menu>
    <e-menu-item title='首页' name='coopwire'>
      <i class='iconfont icon-home-fill'/>
    </e-menu-item>
    <e-menu-item title='Mock服务' name='mock'>
      <i class='iconfont icon-jiekou'/>
    </e-menu-item>
  </e-menu>
</template>
<script>
import MenuConfig from '@/script/router/menu.json'

export default {
  components: {
  },
  data () {
    return {
      MenuConfig: MenuConfig
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
</style>