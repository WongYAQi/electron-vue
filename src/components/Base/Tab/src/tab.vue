<script>
/** 使用方式
  <w-tab v-model='activeName'>
    <w-tab-item label='总览' name='all'></w-tab-item>
  </w-tab>
 */
export default {
  props: {
    lazy: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      activeName: this.value,
      panes: []
    }
  },
  mounted () {
    this.calcPaneSlots()
  },
  methods: {
    calcPaneSlots () {
      let dom = this.$slots.default.filter(vnode => vnode.tag && vnode.componentOptions.Ctor.options.name === 'WTabItem')
      let paneSlots = dom.map(({ componentInstance })=> componentInstance)
      this.panes = paneSlots
    },
    handleTabClick (tab) {
      // 触发对应id 的 dom 的is-checked 
      console.log(tab)
      this.activeName = tab.name
      this.$emit('input', tab.name)
      this.$emit('tab-click', tab)
    }
  },
  render () {
    // Q1: 这里为什么要用 _l 来渲染 panes 呢？
    // Q2: 为什么用上面calc方法中，渲染不出来呢？
    // A2: 因为上面的方法中，在第一次render的时候还没有具体的componentInstance 实例，但是使用了this.panes，就会触发响应式变化，所以会再次触发渲染
    let {
      handleTabClick
    } = this
    let dom = this.panes.map(pane => {
      return (
        <div
          class={{
            'w-tab-item': true,
            'is-checked': this.activeName === pane.name
          }}
          on-click={() => handleTabClick(pane)}
        >
          {pane.label}
        </div>
      )
    })
    let headers = (
      <div class='w-tab-header'>
        {dom}
      </div>
    )
    const panes = (
      <div class='w-tab-pane'>
        {this.$slots.default}
      </div>
    )
    // panes += <div>123123</div> // jsx只读，不能编辑
    
    // 这里为什么用default可以有效呢？
    // 因为tab中的default是经过w-tab-item 渲染出来的，所以defaults是w-tab-item的vnode数组
    // 而 headers 确是另外计算的

    // 而方案1，需要全部都包裹再同一个容器中，而不是每一个header和每一个pane都包裹在一个容器中。处于BFC的考虑，肯定无法造成效果

    //tips：是不是在涉及到v-if,v-show的时候，尽量不要使用 jsx 呢？
    return (
      <div class='w-tab-container'>
        {headers}
        {panes}
      </div>
    )
  }
}
</script>

<style lang='less' scoped>
@import '../../../../style/colorbase.less';

.w-tab-item{
  display: inline-block;
  padding: 8px 16px;
  line-height: 24px;
  font-size: 14px;
  transition: all .25s ease;
  border-bottom: transparent;
  color: @fg-light-color;
  cursor: pointer;
  &:hover{
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    transition: all .25s ease;
  }
  &.is-checked{
    border-bottom: 2px solid #fff;
    transition: all .25s ease;
    color: @act-color;
  }
}
.w-tab-pane, .w-tab-header{
  width: 100%;
}
</style>