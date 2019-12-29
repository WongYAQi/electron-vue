<template>
  <div class='container'>
    <aside class='aside'>
      <app-menu></app-menu>
    </aside>
    <main>
      <header>
      </header>
      <main class='app-content'>
        <router-view />
      </main>
    </main>
  </div>
</template>
<script>
import AppMenu from '@/components/Menu.vue'
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
.aside{
  width: 100px;
  height: 100vh;
  background-color: #585757;
}
</style>