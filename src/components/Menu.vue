<template>
  <nav class='nav'>
    <a v-for='item in MenuConfig.children' :key='item.id' :title='item.name' @click.prevent='clickMenu'>
      {{item.name}}
    </a>
  </nav>
</template>
<script>
import MenuConfig from '@/script/router/menu.json'
export default {
  data () {
    return {
      MenuConfig: MenuConfig
    }
  },
  methods: {
    clickMenu () {

    }
  }
}
</script>
<style lang="less" scoped>
.nav{
  display: flex;
  & a{
    display: inline-block;
    width: 100%;
  }
}
</style>