<template>
  <div class='entry-app container'>
    <aside class='aside'>
      <app-menu></app-menu>
    </aside>
    <main class='main'>
      <header>
        <app-header></app-header>
      </header>
      <main class='app-content'>
        <router-view />
      </main>
    </main>
  </div>
</template>
<script>
import AppMenu from '@/components/template/Menu.vue'
import AppHeader from '@/components/template/Header.vue'
export default {
  components: {
    AppMenu, AppHeader
  }
}
</script>
<style lang='less' scoped>
.container{
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 14px;
}
.aside{
  padding: 0 8px;
  height: 100vh;
}
.main{
  height: 100vh;
  padding: 0 10px;
  box-sizing: border-box;
  flex: 1;
  header{
    height: 80px;
  }
  .app-content{
    height: calc(100vh - 80px);
  }
}
</style>