<template>
  <div class='w-tab-container'>
    <slot></slot>
  </div>
</template>

<script>
/**
  关于tab，目前看到两种思路：
  1：顺序排列：div(label+div)，label在同一行，div在下方
  2：并行排列：div(labels) + div(div) ，tab在同一div内，div在同一div内
 */
export default {
  props: {
    lazy: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    console.log(this)
  }
}
</script>

<style lang='less' scoped>
.w-tab-container{
  position: relative;
}
</style>