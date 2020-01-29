<template>
  <fieldset class='section-container'>
    <legend>
      <span>{{label}}</span>
    </legend>
    <div class='section-content'>
      <slot></slot>
    </div>
  </fieldset>
</template>

<script>
export default {
  props: {
    label: String
  }
}
</script>

<style lang='less' scoped>
@import '../../style/colorbase.less';

.section-container{
  border-color: transparent;
  border-width: 0;
  border-radius: 4px;
  background-color: @bg-dark-color;
  legend{
    padding: 0 16px;
  }
  .section-content{
    padding: 0 16px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}
</style>
