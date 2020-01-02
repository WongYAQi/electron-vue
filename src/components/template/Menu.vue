<template>
  <e-menu :menu='MenuConfig.children'>
  </e-menu>
</template>
<script>
import MenuConfig from '@/script/router/menu.json'
import EMenu from '@/components/Base/Menu/src/menu.vue'
export default {
  components: {
    EMenu
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