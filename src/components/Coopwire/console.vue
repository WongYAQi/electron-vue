<template>
  <e-section :label='label'>
    <div class='console'>
      {{content}}
      {{tempContent}}
    </div>
  </e-section>
</template>

<script>
export default {
  components: {
    'e-section': () => import('@/components/Base/section')
  },
  props: {
    label: String,
    platform: String,
    command: String
  },
  data () {
    return {
      content: '',
      tempContent: ''
    }
  },
  methods: {
    dev () {
      return new Promise((resolve, reject) => {
        this.content = ''
        this.tempContent = 'loading...'
        let ws = new WebSocket(`ws://localhost:3001/coopwire/dev/${this.platform}`)
        ws.onmessage = (message) => {
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