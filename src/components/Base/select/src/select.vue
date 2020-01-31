<template>
  <div
    ref='reference'
    class='e-select'
    @click.stop.prevent='toggleMenu'
  >
    <e-input
      v-model='selectLabel'
      :placeholder='placeholder'
      readonly
    >
      <i slot='suffix' class='iconfont icon-arrowdown e-input__icon' />
    </e-input>
    <div ref='menu' class='e-select-menu' :class='{
      "is-active": isShow
    }'
      :style='{
        "minWidth": inputWidth + "px"
      }'
    >
      <ul>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
import { CreatePopper, createPopper } from '@popperjs/core'
export default {
  name: 'ESelect',
  props: {
    value: {
      required: true
    },
    placeholder: String
  },
  data () {
    return {
      selectLabel: '',
      isShow: false,
      inputWidth: 0,
      options: []
    }
  },
  watch: {
    'value' (val) {
      this.setSelected(val)
    },
    '$slots.default':{
      handler: function (val) {
        this.setOptions()
        this.setSelected(this.value)
      },
      immediate: true
    }
  },
  created () {
  },
  mounted () {
    this.inputWidth = this.$refs.reference.getBoundingClientRect().width
  },
  methods: {
    setOptions () {
      this.options = this.$slots.default.filter(vnode => {
        return vnode.tag && vnode.componentOptions.Ctor.options.name === 'EOption'
      }).map(vnode => {
        return vnode.componentOptions.propsData
      })
    },
    setSelected (val) {
      console.log(JSON.parse(JSON.stringify(this.options)))
      console.log(val)
      let ops = this.options.filter(props =>  props.value === val)
      console.log(ops)
      if (ops.length) {
        this.selectLabel = ops[0].label
      }
    },
    computedValue (val) {
      let ops = this.$slots.default.filter(vnode => {
        return vnode.tag && vnode.componentOptions.Ctor.options.name === 'EOption'
      }).map(vnode => {
        return vnode.componentOptions.propsData
      }).filter(props => {
        props.value === this.value
      })
      if (ops.length) {
        this.selectLabel = ops[0].label
      }
    },
    closeMenu () {
      this.isShow = false
      document.removeEventListener('click', this.closeMenu)
    },
    toggleMenu (evt) {
      this.isShow = true
      document.body.appendChild(this.$refs.menu)
      createPopper(this.$refs.reference, this.$refs.menu, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10]
            }
          }
        ]
      })
      document.addEventListener('click', this.closeMenu)
    },
    handleSelect (item) {
      this.selectLabel = item.label
      this.$emit('input', item.value)
      this.$emit('select', item)
      this.isShow = false
    }
  }
}
</script>

<style lang='less'>
@import '~@/style/colorbase.less';
.e-select{
  width: 200px;
}
.e-select-menu{
  display: none;
  background-color: #fff;
  color: #333333;
  border-radius: 4px;
  &.is-active{
    display: block;
  }
}
</style>
