<template>
    <div class='c-container'>
        <div class='btnGroup'>
            <el-button @click='start' type='primary'>启动</el-button>
        </div>
        <div ref='terminal' id='terminal' class='content'></div>
    </div>
</template>
<script>
import { Terminal } from 'xterm'
import { WebLinksAddon } from 'xterm-addon-web-links';
import { FitAddon } from 'xterm-addon-fit'
import EventBus from '@/components/EventBus/EventBus'
export default {
    props: {
        target: String,
        id: String
    },
    data () {
        return {
            logs: [],
            terminal: {}
        }
    },
    created () {
    },
    mounted () {
        const terminal = this.terminal = new Terminal()
        const fitAddon = new FitAddon()
        terminal.loadAddon(new WebLinksAddon())
        terminal.loadAddon(fitAddon)
        terminal.open(document.getElementById('terminal'))
        fitAddon.fit()
        terminal.write('Hello')
    },
    methods: {
        start () {
            let ws = new WebSocket('ws://localhost:3000/test')
            ws.onmessage = message => {
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
}
.btnGroup{
    margin-bottom: 18px;
}
</style>