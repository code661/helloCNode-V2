<template>
  <div class=editor>
    <Card>
      <div slot="title"></div>
      <a href="javascript:;" slot="extra" @click.prevent="previewVisible = !previewVisible">
            Change
        </a>
      <textarea v-model="input"></textarea>
      <div class="preview" v-html="compiledMarkdown" v-show="previewVisible"></div>
      <Button type="primary" :loading="loading" @click="handleSubmit">提交</Button>
    </Card>
  </div>
</template>

<script>
import { Button, Card } from "iview";
import marked from "marked";

export default {
  data() {
    return {
      input: "",
      previewVisible: true
    };
  },
  props:["loading"],
  components: {
    Button,
    Card
  },
  computed: {
    compiledMarkdown() {
      return marked(this.input);
    }
  },
  methods: {
    handleSubmit() {
      if(!this.input){
        this.$message.warning("评论不能为空")
        return
      }
      this.$emit("submit", this.input);
      this.input = ""
    }
  }
};
</script>

