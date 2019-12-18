<template>
  <div class='container'>
    <app-menu class='app-menu'></app-menu>
    <div class='app-content'>
      <router-view />
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import AppMenu from '@/components/Menu/Menu.vue'
export default Vue.extend({
  components: {
    AppMenu
  }
})
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