<template>
    <div class='c-container'>
        <div class='btnGroup'>
            <el-button @click='start' type='primary'>启动</el-button>
        </div>
        <div ref='terminal' id='terminal' class='content'></div>
    </div>
</template>
<script>
import { Terminal } from "xterm";
import { WebLinksAddon } from "xterm-addon-web-links";
import { FitAddon } from "xterm-addon-fit";
import EventBus from "@/components/EventBus/EventBus";
let terminal
export default {
  props: {
    target: String,
    command: String,
    id: String
  },
  data() {
    return {
      logs: [],
      terminal: {},
      index: 0
    };
  },
  created() {},
  mounted() {
    terminal = new Terminal({
      convertEol: true
    });
    window.terminal = terminal

    const fitAddon = new FitAddon();
    terminal.loadAddon(new WebLinksAddon());
    // terminal.loadAddon(fitAddon);
    terminal.open(document.getElementById("terminal"));
    // fitAddon.fit();
  },
  methods: {
    start() {
      let ws = new WebSocket(`ws://localhost:3001/coopwire/dev`);
      ws.onmessage = message => {
        let index = Math.ceil(Math.random() * 100000000)
        this.index++
        let start = terminal.addMarker(this.index)
        let reg = new RegExp(/^\<s\>/g)
        let flag = reg.test(message.data)
        index = Math.ceil(Math.random() * 100000000)
        this.index++
        terminal.write(message.data);
        let second = terminal.addMarker(this.index)
        if (flag) {
          if (start && second) {
            setTimeout(() => {
              console.log(start, second)
              terminal.selectLines(0 , 12)
              terminal.clearSelection()
            }, 100)
          }
        }
      };
      ws.onopen = event => {
        ws.send(this.command);
      }
    }
  }
}
</script>
<style lang='less' scoped>
.c-container {
  height: 450px;
}
.btnGroup {
  margin-bottom: 18px;
}
</style>