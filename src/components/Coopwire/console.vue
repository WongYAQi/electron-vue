<template>
  <e-section :label='label'>
    <div class='console'>
      {{content}}
      {{tempContent}}
    </div>
  </e-section>
</template>

<script>
import axios from '@/script/util/axios'
export default {
  components: {
  },
  props: {
    label: String,
    platform: String,
    command: String
  },
  data () {
    return {
      content: '',
      tempContent: '',
      isAllTransfered: false
    }
  },
  methods: {
    dev () {
      return new Promise((resolve, reject) => {
        this.content = ''
        this.tempContent = 'loading...'
        let ws = new WebSocket(`ws://localhost:3001/coopwire/dev/${this.platform}`)
        ws.onmessage = (message) => {
          if (this.isAllTransfered && !!message.data.replace(/\s/g, '')) {
            this.content = ''
          }
          if (message.data.indexOf('<s> [webpack.Progress] 100%') > -1) {
            this.isAllTransfered = true
          }
          if (message.data.startsWith('<s>')) {
            this.tempContent = message.data
          } else {
            this.content += message.data + '\n'
          }
          resolve && resolve()
        }
        ws.onopen = (event) => {
          ws.send(this.command)
        }
      })
    },
    close () {
      return axios.post(`/coopwire/dev/${this.platform}/close`).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.console{
  height: 500px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #141414;
  word-break: break-all;
  white-space: pre-line;
  overflow: auto;
}
</style>