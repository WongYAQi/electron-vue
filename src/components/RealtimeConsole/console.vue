<template>
    <div class='c-container'>
        <el-button @click='start'>测试</el-button>
        <div ref='terminal' id='terminal' class='content'></div>
    </div>
</template>
<script>
import { Terminal } from 'xterm'
import { WebLinksAddon } from 'xterm-addon-web-links';
import { FitAddon } from 'xterm-addon-fit'
export default {
    props: {
        target: String
    },
    data () {
        return {
            logs: [],
            terminal: {}
        }
    },
    mounted () {
        const terminal = this.terminal = new Terminal()
        const fitAddon = new FitAddon()
        terminal.loadAddon(new WebLinksAddon())
        terminal.loadAddon(fitAddon)
        terminal.open(this.$refs.terminal)
        fitAddon.fit()
        terminal.write('Hello')
    },
    methods: {
        start () {
            let ws = new WebSocket('ws://localhost:3000/test')
            ws.onmessage = message => {
                console.log('in auth', message)
                this.terminal.write('\n' + message.data + '\n')
            }
            ws.onopen = event => {
                ws.send(this.target)
            }
        }
    }
}
</script>
<style lang='less' scoped>
.c-container{
    height: 450px;
    border: 1px solid black;
    background-color: rgba(0,0,0,0.1)
}
.content{

}
</style>