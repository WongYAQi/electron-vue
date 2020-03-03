<template>
  <div class='inner-container'>
    <main class='mock-container'>
      <e-section label='Mock设置'>
        <div class='mock-setting'>
          <e-input v-model='form.mockport' placeholder='请输入Mock服务端口'></e-input>
          <e-button @click='openMock'>
            启动
            <i class='iconfont icon-qidong' />
          </e-button>
          <e-button type='danger' @click='clear'>
            清除
          </e-button>
        </div>
      </e-section>
      <e-section label='接口信息'>
        <div class='mock-info'>
          <e-select v-model='form.method'>
            <e-option label='GET' value='GET'></e-option>
            <e-option label='POST' value='POST'></e-option>
          </e-select>
          <e-input v-model='form.url' placeholder='请输入接口地址'></e-input>
          <e-button @click='saveMock'>保存</e-button>
        </div>
        <div class='mock-info'>
          <span>Label: 
            <e-input v-model='tempTag' v-show='visibleTag' />
            <e-button placement='Please add api tag' icon='iconfont icon-plus' />
          </span>
        </div>
        <div class='mock-info'>
          <e-input v-model='form.response' type='textarea' :rows='4' class='textarea'></e-input>
        </div>
      </e-section>
    </main>
    <aside class='mock-aside'>
      <e-tab v-model='activeTab'>
        <e-tab-item label='Tags' name='Tags'></e-tab-item>
        <e-tab-item label='Controllers' name='Controllers'></e-tab-item>
      </e-tab>
      <e-section :label='activeTab'>
        
      </e-section>
    </aside>
  </div>
</template>
<script>
import axios from '@/script/util/axios'
export default {
  data () {
    return {
      activeTab: 'Tags',
      form: {
        mockport: '',
        method: 'GET',
        response: '',
        url: '',
        tags: []
      },
      apiList: [],
      loading: false,
      isRuning: false,
      visibleTag: false,
      tempTag: ''
    }
  },
  created () {
    axios.get('/lowdb/mockport').then(res => {
      this.form.mockport = parseInt(res.data)
    })
    axios.get('/mock/api').then(res => {
      this.apiList.push(...Object.keys(res.data))
    })
  },
  methods: {
    clear () {
      axios.get('/mock/clear').then(res => {
        
      })
    },
    saveMock () {
      let data = {...this.form}
      data.response = JSON.parse(data.response)
      axios.post('/mock/save', data)
    },
    openMock () {
      this.loading = true
      axios.post(`/mock/${this.form.mockport}/start`).then(res => {
      }).finally(() => {
        this.loading = false
      })
    },
    reset () {
      axios.get(`/mock/reset`).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>
<style lang='less' scoped>
.inner-container{
  height: 100%;
  overflow: auto;
  display: flex;
}
.mock-container{
  flex: 1;
  .mock-info{
    width: 100%;
    display: inline-flex;
    margin-bottom: 10px;
    & > .e-input{
      flex-grow: 1;
      margin: 0 10px;
    }
    .textarea{
      margin-bottom: 18px;
    }
  }
  .mock-setting{
    display: inline-flex;
    & .e-input{
      margin-right: 10px;
    }
  }
}
.mock-aside{
  width: 300px;
  flex: 0 1 auto;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
