<template>
  <ul class="m-ul">
    <li class="m-li"
      v-for="item in menu"
      :key="item.id"
      :class='{"is-active": activeName === item.name}'
      @click.stop="clickMenu(item)"
    >
      <a :title="item.name">{{item.name}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array
    }
  },
  computed: {
    activeName () {
      return this.$route.name
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push({ name: item.name })
    }
  }
};
</script>

<style lang='less' scoped>
li{
list-style: none;
}
.m-ul{
overflow: auto;
.m-li{
    width: 60px;
    height: 60px;
    margin: 10px auto;
    border-radius: 50%;
    background-color: #333333;
    transition-property: border-radius ,background-color; 
    transition-duration: .5s;
    cursor: pointer;
    &:hover{
      background-color: #666666;
    }
    &.is-active{
      border-radius: 10%;
      background-color: #ff5555;
      transition-property: border-radius ,background-color; 
      transition-duration: .5s;
    }
  }
}
</style>