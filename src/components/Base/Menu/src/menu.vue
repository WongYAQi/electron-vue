<template>
  <ul class="m-ul">
    <li class="m-li"
      v-for="item in menu"
      :key="item.id"
      @click.stop="clickMenu(item)"
    >
      <a :title="item.name"
      :class='["m-a", {"is-active": activeName === item.name}]'
      >
        <img :src='src' />
      </a>
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
  data () {
    return {
      src: require('@/style/image/coopwire.png')
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
  }
  .m-a{
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
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
    img{
      width: 100%;
      height: 100%;
      object-fit: none;
    }
  }
}
</style>