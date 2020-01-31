<template>
  <button
    class='e-button'
    @click.stop='handleClick'
    :disabled='disabled'
    :class='[
      type ? "e-button-" + type : "",
      {
        "is-round": round
      }
    ]'
  >
    <span v-if='$slots.default'><slot></slot></span>
  </button>
</template>

<script>
/**
对于按钮功能，需要实现的功能有：
  0. 只有主按钮和文本按钮
  1. 默认适应主题颜色，颜色的化，有两种形式，hover时变浅/变深。这里的组件的颜色
  2. 提供loading图标
  3. disabled loading

  进阶功能：
  1. 圆角图标
  2. 按钮组
  3. 按钮颜色分类
 */
export default {
  name: 'EButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: Boolean,
    round: Boolean
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang='less' scoped>
@import '~@/style/colorbase.less';
.e-button{
  height: 40px;
  padding: 8px 15px;
  background-color: @ac-color;
  border-radius: 4px;
  border-width: 0px;
  box-sizing: border-box;
  color: @act-color;
  cursor: pointer;
  font-size: 14px;
}
</style>
