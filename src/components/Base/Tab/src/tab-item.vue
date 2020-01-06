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
  name: 'tab-item',
  props: {
    label: {
      type: String,
      required: true
    },
    name: String
  },
  data () {
    return {
      isChecked: false
    }
  },
  methods: {
    handleTabClick () {
      this.isChecked = true
    }
  }
}
</script>

<style lang='less' scoped>
</style>