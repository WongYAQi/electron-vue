<template>
  <div class='container'>
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
}
.aside{
  width: 100px;
  float: left;
  height: 100vh;
  background-color: #585757;
}
.main{
  margin-left: 100px;
  height: 100vh;
  background-color: #202124;
  padding: 0 10px;
  box-sizing: border-box;
  header{
    height: 80px;
  }
  .app-content{
    height: calc(100vh - 80px);
  }
}
</style>