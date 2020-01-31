<template>
  <div
    class='e-input'
  >
    <input
      class='e-input__inner'
      :value='value'
      :placeholder='placeholder'
      :readonly='readonly'
      :disabled='disabled'
      @input='handleInput'
      @compositionstart='handleCompositionStart'
      @compositionupdate='handleCompositionUpdate'
      @compositionend='handleCompositionEnd'
    >
    <span v-if='$slots.suffix' class='e-input-suffix'>
      <span class='e-input-suffix__inner'>
        <slot name='suffix'></slot>
        <i v-if='suffixIcon' class='e-input__icon' :class='suffixIcon' />
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'EInput',
  props: {
    value: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    suffixIcon: String
  },
  data () {
    return {
      isComposing: false
    }
  },
  methods: {
    handleInput (evt) {
      if (evt.isComposing) return
      console.log(evt)
      this.$emit('input', evt.target.value)
    },
    handleCompositionStart (val) {
      if (this.isComposing) return
      this.isComposing = true
    },
    handleCompositionUpdate (val) {

    },
    handleCompositionEnd (val) {
      if (!this.isComposing) return
      this.handleInput()
    }
  }
}
</script>

<style lang='less'>
@import '~@/style/colorbase.less';
.e-input{
  position: relative;
  height: 40px;
  color: @fg-light-color;
}
.e-input__inner{
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  background-color: @bg-dark-color;
  border-width: 1px;
  border-color: transparent;
  border-radius: 4px;
  color: inherit;
  font-size: 14px;
  line-height: 1;
  outline: none;
  cursor: pointer;
  &:hover, &:focus{
    border: 1px solid @fg-color;
  }
}
.e-input-suffix{
  position: absolute;
  height: 100%;
  top: 0;
  right: 5px;
}
.e-input__icon{
  color: inherit;
  font-size: 14px;
  line-height: 40px;
}
</style>
