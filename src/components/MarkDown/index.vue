<template>
  <div class=editor>
    <Card>
      <div slot="title">
        <slot name="title">
          <p>回复主题</p>
        </slot>
      </div>
      <a href="javascript:;" slot="extra" @click.prevent="previewVisible = !previewVisible">
          <Button shape="circle" icon="ios-search"></Button>
      </a>
      <Input v-model="input" type="textarea" :rows="4" placeholder="Enter something..." />
      <div class="preview" v-html="compiledMarkdown" v-show="previewVisible"></div>
      <Button type="primary" :loading="loading" @click="handleSubmit">提交</Button>
    </Card>
  </div>
</template>

<script>
import { Button, Card, Input } from "iview";
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
    Card,
    Input
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

