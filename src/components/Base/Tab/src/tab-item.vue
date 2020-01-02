<template>
  <div class='w-tab-item'>
    <input type='radio' :id='label'/>
    <label :for='label' @click='handleTabClick'>{{label}}</label>
    <div :class='["tab", { "is-checked": isChecked }]' v-if='isChecked'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab-item',
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isChecked: false
    }
  },
  // 如何决定当前tab是否显示，根据外部父级的 activeName 与当前内容是否相同来决定
  mounted () {
    console.log(this.$parent)
  },
  methods: {
    handleTabClick () {
      this.isChecked = true
    }
  }
}
</script>

<style lang='less' scoped>
.w-tab-item > input{
  display: none;
}
.w-tab-item{
  label{
    position: absolute;
  }
  .tab{
    display: block;
  }
}
</style>