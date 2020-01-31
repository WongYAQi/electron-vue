<template>
  <div class='coopwire-container'>
    <main>
      <e-tab v-model='activeName'>
        <e-tab-item label='总览' name='all'>
          <e-section label='项目地址'>
            <ul class='path'>
              <li>
                <label>盘符</label>
                <e-select v-model='disk' placeholder='选择盘符' @select='handleSelectDisk'>
                  <e-option label='C:\' value='C:'></e-option>
                  <e-option label='D:\' value='D:'></e-option>
                </e-select>
              </li>
              <li>
                <label>地址</label>
                <e-input v-model='path' placeholder='输入地址'>
                </e-input>
              </li>
              <li>
                <label>&nbsp;</label>
                <e-button @click='handleChangeRoot'>修改项目地址</e-button>
              </li>
            </ul>
            <div class='directory'>
              <ul>
                <li v-for='item in cDirectories' :key='item.name' @click='handleChangeDirectory(item)'>
                  <i class='iconfont' :class='item.type === "file" ? "icon-file" : "icon-folder"' />
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </e-section>
          <e-section label='项目状态'>
            <e-button @click='handleClick'>
              开启
              <i class='iconfont icon-qidong' />
            </e-button>
          </e-section>
        </e-tab-item>
        <e-tab-item label='Auth' name='auth'>
          <coop-console label='Auth' platform='auth' command='dev:coopwire-auth' ref='Auth'></coop-console>
        </e-tab-item>
        <e-tab-item label='Platform' name='platform'>
          <coop-console label='Platform' platform='platform' command='dev:coopwire-platform' ref='Platform'></coop-console>
        </e-tab-item>
        <e-tab-item label='Enterprise' name='enterprise'>
          <coop-console label='Enterprise' platform='enterprise' command='dev:coopwire-enterprise' ref='Enterprise'></coop-console>
        </e-tab-item>
      </e-tab>
   </main>
  </div>
</template>

<script>
import axios from '@/script/util/axios'
import EventBus from '@/components/EventBus/EventBus.ts'
export default {
  components: {
    'coop-console': () => import('@/components/Coopwire/console')
  },
  data ()  {
    return {
      activeName: 'all',
      loading:false,
      path: '',
      disk: '',
      directories: []
    }
  },
  computed: {
    cDirectories () {
      return [
        { name: '..', type: 'directory' },
        ...this.directories
      ]
    },
    currentPath () {
      return this.path ? (this.disk + this.path.replace(/\\/g, '\\\\')) : (this.disk + '\\\\')
    }
  },
  created () {
    this.getDefaultData()
  },
  methods: {
    getDefaultData () {
      axios.get('/lowdb/address').then(res => {
        let di = res.data.indexOf('\\')
        this.disk = res.data.substring(0, di)
        this.path = res.data.substring(di).replace(/\\\\/g, '\\')
      }).then(() => {
        this.getDirectories()
      })
    },
    getDirectories () {
      axios.post('/path/show', { path: this.currentPath }).then(res => {
        this.directories = res.data
      })
    },
    handleClick: async function () {
      await this.$refs.Auth.dev()
      await this.$refs.Platform.dev()
      await this.$refs.Enterprise.dev()
    },
    handleChangeRoot () {
      axios.post('/coopwire/lowdb/update', {
        'address': this.currentPath
      }).then(res => {
        console.log(res)
      })
    },
    handleChangeDirectory (item) {
      if (item.name === '..') {
        let t = this.path.lastIndexOf('\\')
        this.path = this.path.substring(0, t)
      } else {
        this.path += '\\' + item.name
      }
      this.getDirectories()
    },
    handleSelectDisk (val) {
      this.path = ''
      this.getDirectories()
    }
  }
}
</script>
<style lang='less' scoped>
@import '~@/style/colorbase.less';
.coopwire-container{
  height: 100%;
  main{
    width: 100%;
    height: 100%;
  }
}
.tab{
  box-sizing: border-box;
  /deep/ .el-tabs__content{
    display: none;
  }
}
.console{
  height: 500px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #141414;
  word-break: break-all;
  white-space: pre-line;
  overflow: auto;
}
ul.path, ul.path li {
  list-style: none;
}
.path{
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  li{
    display: inline-flex;
    flex-direction: column;
    padding-right: 10px;
    &:nth-of-type(2){
      flex-grow: 1;
    }
    & label{
      padding: 4px;
      color: @fg-light-color;
    }
  }
}
.directory{
  width: 100%;
  height: 300px;
  background-color: @bg-dark-color;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: auto;
  li{
    line-height: 28px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    &:hover{
      background-color: @bg-light-color;
    }
  }
}
</style>
