<template>
  <ul class="m-ul">
    <slot></slot>
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
      activeName: ''
    }
  },
  created () {
    this.activeName = this.$slots.default[0].componentOptions.propsData.name
    this.$router.push({ name: this.activeName })
  }
};
</script>

<style lang='less' scoped>
li{
list-style: none;
}
.m-ul{
  overflow: auto;
}
</style>