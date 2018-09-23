<template>
  <div class="cotainer" v-if="post">
    <Card>
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
    <Card>
      <div class="cell" v-for="reply in post.replies">
        <div v-html="reply.content"></div>
        <Button @click="postUps(reply.id, reply.ups)">{{ reply.ups.length }}</Button>
      </div>
    </Card>
    <MarkDown :loading="loading" @submit="handleSubmit"></MarkDown>
    <User :username="post.author.loginname"></User>
  </div>
</template>

<script>
import { Card, Button } from "iview";
import MarkDown from "@/components/MarkDown"
import User from "@/views/User"

export default {
  name: "Topic",
  components: {
    Card,
    Button,
    MarkDown,
    User
  },
  props: ["id"],
  data() {
    return {
      post: null,
      loading: false
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
    async getPost(id, accesstoken) {
      let result = await this.$api.getPost(id, accesstoken);
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
    },
    async postUps(replyId, ups) {
      let { accesstoken, userinfo } = this.$store.state;
      try{
        let result = await this.$api.postUps(accesstoken, replyId);
        if (result.action === "up") {
          ups.push(userinfo.id)
        }else{
          ups.pop()
        }
      }catch(error){
        this.$message.warning("在登录后才能进行该操作")
      }
    },
    async handleSubmit(content){
      let { accesstoken } = this.$store.state;
      let topicId = this.$route.params.id
      try {
        this.loading = true
        let result = await this.$api.postReplies(accesstoken, topicId, content)
        if (result.success === true){
          this.$message.success("提交评论成功")
          this.loading = false
          
          this.getPost(this.$route.params.id);
        }
      }catch(error){
        this.$message.warning("未登录无法进行该操作")
        this.loading = false
      }
    }
  },
  created() {
    let { accesstoken, userinfo, collects } = this.$store.state;
    this.getPost(this.$route.params.id);
    if (accesstoken && userinfo && !collects) {
      this.$store.dispatch("getCollects", userinfo.loginname);
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
