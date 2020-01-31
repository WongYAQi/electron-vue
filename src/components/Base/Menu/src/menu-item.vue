<template>
  <li class="m-li" @click.stop="clickMenu">
    <a :title="name"
    :class='["m-a", { "is-active": isActived }]'
    >
      <slot></slot>
    </a>
  </li>
</template>

<script>
export default {
  name: 'EMenuItem',
  props: {
    name: String
  },
  computed: {
    isActived () {
      return this.name === this.$parent.activeName
    }
  },
  methods: {
    clickMenu() {
      this.$router.push({ name: this.name })
      this.$parent.activeName = this.name
    }
  }
}
</script>

<style lang='less' scoped>
  .m-li{
    width: 52px;
    height: 52px;
    margin: 10px auto;
  }
  .m-a{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
    transition-property: border-radius ,background-color; 
    transition-duration: .5s;
    cursor: pointer;
    &:hover{
      background-color: #666666;
    }
    &.is-active{
      border-radius: 10%;
      transition-property: border-radius ,background-color; 
      transition-duration: .5s;
    }
    & > *{
      width: 50%;
      height: 50%;
      font-size: 26px;
    }
  }
</style>