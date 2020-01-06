<script>
/**
  关于tab，目前看到两种思路：
  1：顺序排列：div(label+div)，label在同一行，div在下方
  2：并行排列：div(labels) + div(div) ，tab在同一div内，div在同一div内
 */
export default {
  props: {
    lazy: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    console.log(this.$slots)
  },
  render () {
    let dom = this.$slots.default.map(item => {
      // 在这个地方得到panes标题相关的数组对象，然后再单独渲染tab header
    })
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
        {panes}
      </div>
    )
  }
}
</script>

<style lang='less' scoped>
.w-tab-container{
  // position: relative;
  display: flex;
}
</style>