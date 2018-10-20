<template>
  <div class="cotainer" v-if="post">
    <div class="topic">
      <Card  class="article">
        <div slot="title" class="article-header">
          <div class="left">
            <Put :data="post" v-if="post.tab || post.good"></Put>
            {{post.title}}
            <div class="article-info">
              <span>发布于</span>
              <Time
                :time="post.create_at"
                :type="post.create_at | formatTime"
              ></Time>
              <Divider type="vertical" />
              <span>作者 {{post.author.loginname}}</span>
              <Divider type="vertical" />
              <span>{{post.visit_count}} 次浏览</span>              
            </div>
          </div>
          <div class="right">
            <Button v-if="isCollected" @click="clickCollectBtn('postDeCollect')">取消收藏</Button>
            <Button v-else @click="clickCollectBtn('postCollect')">收藏</Button>
            <Button 
              type="text"
              icon="md-hammer"
              v-if="post.author.loginname === this.$store.state.userinfo.loginname"
              @click="$router.push(`/edit/${post.id}`)"
            >编辑</Button>
          </div>
        </div>
        <div
          id="content"
          v-html="post.content"
          class="article-content"
        >
        </div>
      </Card>
      <Card class="reply">
        <p slot="title">
          <Icon type="ios-chatbubbles" />
          {{post.replies.length}} 条回复
        </p>

        <div class="cell" v-for="(reply,index) in post.replies">
          <Avatar :src="reply.author.avatar_url" class="avatar" />
          <div class="detail">
            <div class="info">
              <div class="left">
                <span class="info-item loginname"> {{reply.author.loginname}}</span>
                <span class="info-item index">{{index+1}}楼</span>
                
                <Time
                  class="info-item time"
                  :time="reply.create_at"
                  :type="reply.create_at | formatTime"
                >
                </Time>
                <Tag v-if="reply.author.loginname === post.author.loginname" color="success">作者</Tag>           
              </div>
              <div class="right">
                <Button @click="postUps(reply, reply.ups)">{{ reply.ups.length }}</Button>   
              </div>
            </div>
            <div v-html="reply.content" id="content" class="content"></div>
            <Divider :dashed="true"></Divider>    
          </div>

        </div>
      </Card>          
      <MarkDown :loading="loading" @submit="handleSubmit"></MarkDown>
    </div>
    <User :username="post.author.loginname"></User>
  </div>
</template>

<script>
import { Card, Button, Time, Divider, Icon, Avatar, Tag } from "iview";
import MarkDown from "@/components/MarkDown";
import User from "@/views/User";
import formatTime from "@/utils/formatTime";
import Put from "@/components/Put";
import Vue from "vue";
import hljs from "highlight.js";

export default {
  name: "Topic",
  components: {
    Card,
    Button,
    MarkDown,
    User,
    Time,
    Put,
    Divider,
    Icon,
    Avatar,
    Tag
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
    async getPost(id) {
      try {
        let result = await this.$api.getPost(id);
        this.post = result.data;
        document.title = result.data.title;
      } catch (error) {
        console.log(error);
      }
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
    async postUps(reply, ups) {
      let { accesstoken, userinfo } = this.$store.state;
      if(userinfo.loginname === reply.author.loginname){
        this.$message.warning("不能给自己点赞噢")
        return
      }
      try {
        let result = await this.$api.postUps(accesstoken, reply.id);
        if (result.action === "up") {
          ups.push(userinfo.id);
        } else {
          ups.pop();
        }
      } catch (error) {

        this.$message.warning("在登录后才能进行该操作");
      }
    },
    async handleSubmit(content) {
      let { accesstoken } = this.$store.state;
      let topicId = this.$route.params.id;
      try {
        this.loading = true;
        let result = await this.$api.postReplies(accesstoken, topicId, content);
        if (result.success === true) {
          this.$message.success("提交评论成功");
          this.loading = false;

          this.getPost(this.$route.params.id);
        }
      } catch (error) {
        this.$message.warning("未登录无法进行该操作");
        this.loading = false;
      }
    }
  },
  created() {
    let { accesstoken, userinfo, collects } = this.$store.state;
    this.getPost(this.$route.params.id).then(() => {
      this.$nextTick(() => {
        var code = document.querySelectorAll("#content code");
        for (var i = 0; i < code.length; i++) {
          hljs.highlightBlock(code[i]);
        }
      });
    });
    if (accesstoken && userinfo && !collects) {
      this.$store.dispatch("getCollects", userinfo.loginname);
    }
  },
  watch: {
    $route() {
      this.getPost(this.$route.params.id);
    }
  },
  filters: {
    formatTime
  }
};
</script>

<style lang="stylus">
.cotainer
  display: flex;
  justify-content: space-between;

  .topic
    flex-grow: 0;
    min-width: calc(100% - 300px);
    margin-right: 15px;

    .article-header
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left
        color #17233d
        font-size: 22px;
        font-weight: 500;
        margin-right: 10px;

        .article-info
          font-size: 12px;
          margin-top: 8px;
  .reply
    margin-top 10px
    margin-bottom 10px
    .cell
      display -webkit-box
      justify-content space-between
      align-items flex-start
      .detail
        margin-left 8px
        flex-grow 1
        .info
          display flex
          justify-content space-between
          .info-item
            margin-right 8px
          .loginname
            color #17233d
            font-weight 800
            font-size 15px
          .index
          .time
            font-size 12px
            color #808695

</style>

<style>
@import "../../assets/markdown-github.css";
@import "../../../node_modules/highlight.js/styles/atom-one-light.css";
</style>

