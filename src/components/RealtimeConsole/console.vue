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
    const terminal = (this.terminal = new Terminal({
      convertEol: true
    }));
    window.terminal = terminal

    const fitAddon = new FitAddon();
    terminal.loadAddon(new WebLinksAddon());
    terminal.loadAddon(fitAddon);
    terminal.open(document.getElementById("terminal"));
    fitAddon.fit();
  },
  methods: {
    start() {
      let ws = new WebSocket(`ws://localhost:3001/coopwire/dev`);
      ws.onmessage = message => {
        console.log(message);
        if (message.data.startsWith('<s>')) {
          // <s>开头，要删除此行数据

        }
        this.index++
        this.terminal.addMarker(this.index)
        this.terminal.write(message.data);
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