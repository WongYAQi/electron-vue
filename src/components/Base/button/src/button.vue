<template>
  <button
    class='e-button'
    @click.stop='handleClick'
    :disabled='disabled || loading'
    :class='[
      "e-button-" + (type || "default"),
      {
        "is-round": round,
        "is-loading": loading,
        "is-disabled": disabled || loading
      }
    ]'
  >
    <span v-if='$slots.default'>
      <i class='iconfont icon-loading' v-show='loading'/>
      <slot></slot>
    </span>
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
    round: Boolean,
    loading: Boolean
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang='less'>
@import '~@/style/colorbase.less';
@keyframes ebuttonloading{
  from { transform: rotate(0deg); }
  to { transform: rotate(1turn); }
}
.e-button{
  height: 40px;
  padding: 8px 15px;
  border-radius: 4px;
  border-width: 0px;
  box-sizing: border-box;
  color: @act-color;
  cursor: pointer;
  font-size: 14px;
  &.is-loading{
    & .icon-loading{
      animation: ebuttonloading 2s linear infinite;
    }
  }
  &:not(.is-loading):hover{
    box-shadow: inset 0 0 0 2px @fg-color;
    transition: all .2s ease;
  }
  &.is-disabled{
    cursor: not-allowed;
    background-color: @ac-d-color;
  }
  &.e-button-default{
    background-color: @ac-color;
  }
  &.e-button-danger{
    background-color: @er-color;
  }
  & + .e-button{
    margin-left: 10px;
  }
}
</style>
