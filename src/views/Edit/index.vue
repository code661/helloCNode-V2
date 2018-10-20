<template>
  <div>
    <Markdown :loading="loading" @submit="handleSubmit" ref="editor">
      <p slot="title">编辑主题</p>
      <div class="select-tab">
      </div>
      <div class="title">
        <Input v-model="title" placeholder="标题字数 10字以上" class="title-input">        
          <Select v-model="tab" slot="append" style="width:8em" placeholder="选择版块">
              <Option value="dev">客户端测试</Option>
              <Option value="share">分享</Option>
              <Option value="ask">问答</Option>
              <Option value="job">招聘</Option>
          </Select>
        </Input>
      </div>
    </Markdown>
  </div>
</template>

<script>
import Markdown from "@/components/MarkDown";
import { Select, Option, Input } from "iview";
export default {
  name: "EditTopic",
  components: {
    Markdown,
    Select,
    Option,
    Input
  },
  data() {
    return {
      tab: "",
      title: "",
      loading: false
    };
  },
  methods: {
    async handleSubmit(content) {
      let { accesstoken } = this.$store.state;
      let { tab, title } = this.$data;
      console.log(content)
      if (this.title === "") {
        this.$message.warning("标题不能为空");
        return;
      }
      try {
        this.loading = true;
        let result = await this.$api.updateTopic(
          accesstoken,
          title,
          tab,
          content
        );
        if (result.success === true) {
          this.$message.success("编辑主题成功，跳转到该主题");
          this.loading = false;
          this.$router.push(`/topic/${result.topic_id}`);
        }
      } catch (error) {
        this.$message.warning("未登录无法进行该操作");
        this.loading = false;
      }
    },
    async getPost(id) {
      try {
        let result = await this.$api.getPost(id, { mdrender: false });
        this.title = result.data.title;
        this.tab = result.data.tab;
        this.$refs.editor.simplemde.value(result.data.content);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getPost(this.$route.params.id);
  }
};
</script>

<style lang="stylus" scoped>
.title {
  > .title-input {
    margin-bottom: 16px;
  }
}
</style>


