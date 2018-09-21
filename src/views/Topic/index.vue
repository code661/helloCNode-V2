<template>
  <div class="cotainer">
    <Card v-if="post">
      <div slot="title">
        <h2>{{post.title}}</h2>
        <Button v-if="isCollected" @click="deCollect">取消收藏</Button>
        <Button v-else @click="collect">收藏</Button>
      </div>
      <div 
        v-html="post.content"
        class="content"
      >
      </div>
    </Card>
  </div>
</template>

<script>
import { Card, Button } from "iview";

export default {
  name: "Topic",
  components: {
    Card,
    Button
  },
  props: ["id"],
  data() {
    return {
      post: null
    };
  },
  computed: {
    isCollected() {
      let {collects} = this.$store.state;
      if ( collects && collects.find(post => post.id === this.$route.params.id)) return true;
      return false;
    },
  },
  methods: {
    async getPost(id) {
      let result = await this.$api.getPost(id);
      this.post = result.data;
    },
    async collect() {
      let { accesstoken, userinfo } = this.$store.state;
      if (accesstoken && userinfo) {
        try {
          let result = await this.$api.postCollect(accesstoken, this.post.id);
          this.$store.dispatch("getCollects", userinfo.loginname);
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$message.warning("您还未登录，不能该操作");
      }
    },
    async deCollect() {}
  },
  created() {
    this.getPost(this.$route.params.id);
  }
};
</script>

<style lang="stylus" scoped>
</style>


