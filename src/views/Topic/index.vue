<template>
  <div class="cotainer">
    <Card v-if="post">
      <div slot="title">
        <h2>{{post.title}}</h2>
        <Button v-if="isCollected" @click="clickCollectBtn('postDeCollect')">取消收藏</Button>
        <Button v-else @click="clickCollectBtn('postCollect')">收藏</Button>
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
      let { collects } = this.$store.state;
      if (collects && collects.find(post => post.id === this.$route.params.id))
        return true;
      return false;
    }
  },
  methods: {
    async getPost(id) {
      let result = await this.$api.getPost(id);
      this.post = result.data;
    },
    async clickCollectBtn(action) {
      let { accesstoken, userinfo } = this.$store.state;
      if (accesstoken && userinfo) {
        let result = await this.$api[action](accesstoken, this.post.id);
        this.$store.dispatch("getCollects", userinfo.loginname);
      } else {
        this.$message.warning("您还未登录，不能进行该操作");
      }
    }
  },
  created() {
    this.getPost(this.$route.params.id);
    let { accesstoken, userinfo, collects } = this.$store.state;
    if (accesstoken && userinfo && !collects) {
      this.$store.dispatch("getCollects", userinfo.loginname);
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>


