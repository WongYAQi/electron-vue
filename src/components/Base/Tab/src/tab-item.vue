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
  name: 'ETabItem',
  props: {
    label: {
      type: String,
      required: true
    },
    name: String
  },
  computed: {
    isChecked () {
      return this.name === this.$parent.activeName
    }
  }
}
</script>

<style lang='less' scoped>
@import '~@/style/colorbase.less';
</style>