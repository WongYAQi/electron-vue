<template>
    <div class='c-container'>
        <div class='btnGroup'>
            <el-button @click='start' type='primary'>启动</el-button>
        </div>
        <div ref='terminal' :id='"terminal" + id' class='content'></div>
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
    this.terminal = new Terminal({
      convertEol: true
    });
    window.terminal = this.terminal

    const fitAddon = new FitAddon();
    this.terminal.loadAddon(new WebLinksAddon());
    // terminal.loadAddon(fitAddon);
    this.terminal.open(document.getElementById("terminal" + this.id));
    // fitAddon.fit();
  },
  methods: {
    start() {
      let ws = new WebSocket(`ws://localhost:3001/coopwire/dev/${this.target}`);
      ws.onmessage = message => {
        this.terminal.clear()
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