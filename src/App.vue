<template>
  <div class='container'>
    <app-menu class='app-menu'></app-menu>
    <router-view class='app-content'/>
  </div>
</template>
<script>
import AppMenu from '@/components/Menu/Menu.vue'
export default {
  components: {
    AppMenu
  }
}
</script>
<style lang='less' scoped>
.container{
  width: 100%;
  height: 100%;
}
.app-menu{
  width: 200px;
  float: left;
  height: 100%;
}
.app-content{
  width: calc(100% - 200px);
  margin-left: 200px;
}
</style>