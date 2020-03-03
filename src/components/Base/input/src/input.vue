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
      v-if='type === undefined'
      @input='handleInput'
      @blur='handleBlur'
      @compositionstart='handleCompositionStart'
      @compositionupdate='handleCompositionUpdate'
      @compositionend='handleCompositionEnd'
    >
    <textarea v-else-if='type === "textarea"'
      ref='Textarea'
      class='e-textarea__inner'
      :value='value'
      :placeholder='placeholder'
      :rows='rows'
      :readonly='readonly'
      :disabled='disabled'
      @input='handleInput'
      @compositionstart='handleCompositionStart'
      @compositionupdate='handleCompositionUpdate'
      @compositionend='handleCompositionEnd'
    >
    </textarea>
    <span v-if='$slots.suffix' class='e-input-suffix'>
      <span class='e-input-suffix__inner'>
        <slot name='suffix'></slot>
        <i v-if='suffixIcon' class='e-input__icon' :class='suffixIcon' />
      </span>
    </span>
  </div>
</template>

<script>
/**
  1. 对于textarea的处理：tab操作的处理
 */
import { trick_textarea_dom } from '@/script/util/trick'
export default {
  name: 'EInput',
  props: {
    value: [String, Number],
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    suffixIcon: String,
    type: String,
    rows: Number
  },
  data () {
    return {
      isComposing: false
    }
  },
  mounted () {
    if (this.type === 'textarea') {
      trick_textarea_dom(this.$refs.Textarea)
    }
  },
  methods: {
    handleBlur () {
      this.$emit('change', this.value)
    },
    handleInput (evt) {
      if (evt.isComposing) return
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
  color: @fg-light-color;
}
.e-input__inner{
  width: 100%;
  height: 40px;
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
  cursor: text;
  &:hover, &:focus{
    border: 1px solid @fg-color;
  }
}
.e-textarea__inner{
  width: 100%;
  resize: vertical;
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
  cursor: text;
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
