<template>
  <div class=editor>
    <Card>
      <div slot="title">
        <slot name="title">
          <p>回复主题</p>
        </slot>
      </div>
      <slot></slot>
      <textarea id="markdown-editor"></textarea>
      <Button type="primary" :loading="loading" @click="handleSubmit">提交</Button>
    </Card>
  </div>
</template>

<script>
import { Button, Card, Input } from "iview";
import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";

export default {
  data() {
    return {
      input: ""
    };
  },
  props: ["loading"],
  components: {
    Button,
    Card,
    Input
  },
  computed: {},
  mounted() {
    this.initMarkdownEditor();
  },
  methods: {
    handleSubmit() {
      var val = this.simplemde.value();
      if (!val) {
        this.$message.warning("内容不能为空");
        return;
      }
      this.$emit("submit", val);
    },
    initMarkdownEditor() {
      this.simplemde = new SimpleMDE({
        element: document.getElementById("markdown-editor"),
        spellChecker: false, // 启用拼写检查，会有背景色
      });
    }
  }
};
</script>
