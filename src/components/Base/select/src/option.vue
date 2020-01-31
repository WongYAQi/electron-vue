<template>
  <li
    class='e-option'
    @click.stop='handleChoose'
  >
    {{label}}
  </li>
</template>

<script>
export default {
  name: 'EOption',
  props: {
    label: String,
    value: String
  },
  methods: {
    handleChoose () {
      let { label, value } = this
      this.$parent.handleSelect({ label, value })
    }
  }
}
</script>

<style lang='less'>
@import '~@/style/colorbase.less';
li.e-option{
  padding: 0 10px;
  line-height: 28px;
  cursor: pointer;
  &:hover{
    background-color: @bg-dark-color;
  }
}
</style>
