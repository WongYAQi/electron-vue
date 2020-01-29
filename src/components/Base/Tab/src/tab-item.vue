<template>
  <div :class='["tab", {"is-checked": isChecked}]'
    v-show='isChecked'
    :id='`tab-item-${name}`'
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'WTabItem',
  props: {
    label: {
      type: String,
      required: true
    },
    // 这里用name作为唯一标记值
    name: String
    // activeName: String // 这里不应该传入，因为这个tab-item是在外面作为slots传入的
    // TODO: 这里要运用vnode.$parent 的特性，来获得父组件的特性
  },
  computed: {
    isChecked () {
      return this.name === this.$parent.activeName
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../../../style/colorbase.less';

</style>