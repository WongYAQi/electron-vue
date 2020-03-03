<template>
  <button
    class='e-button'
    ref='reference'
    @click.stop='handleClick'
    :disabled='disabled || loading'
    :class='[
      "e-button-" + (type || "default"),
      {
        "is-round": round,
        "is-loading": loading,
        "is-disabled": disabled || loading,
        "is-icon": isIcon
      }
    ]'
  >
    <span v-if='$slots.default && !isIcon'>
      <i class='iconfont icon-loading' v-show='loading'/>
      <slot></slot>
    </span>
      <i v-else-if='isIcon' :class='icon'>
    </i>
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
  4. icon button
 */
import Popper from '../../util/popper'
export default {
  name: 'EButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: Boolean,
    round: Boolean,
    loading: Boolean,
    icon: String,
    placement: String
  },
  data () {
    return {
      isInPop: false
    }
  },
  computed: {
    isIcon () {
      return !!this.icon
    }
  },
  mounted () {
    if (this.placement) {
      let pop = Popper._d(this.placement, this._uid)
      this.$refs.reference.addEventListener('mouseenter', evt => {
        this.isInPop = true
        document.body.appendChild(pop)
        Popper._c(this.$refs.reference, pop, {
          placement: 'bottom'
        })
      })
      pop.addEventListener('mouseenter', event => {
        this.isInPop = true
      })
      pop.addEventListener('mouseleave', event => {
        this.isInPop = false
        setTimeout(() => {
          if (this.isInPop) return
          document.body.removeChild(pop)
        }, 500);
      })
      this.$refs.reference.addEventListener('mouseleave', evt => {
        this.isInPop = false
        setTimeout(() => {
          if (this.isInPop) return
          document.body.removeChild(pop)
        }, 1000)
      })
    }
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
  outline: none;
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
.e-button.is-icon{
  background-color: transparent;
  color: @fg-light-color;
  transition: all .5s ease;
  &:hover{
    color: @act-color;
    box-shadow: none;
    transition: all .5s ease;
  }
}
</style>
