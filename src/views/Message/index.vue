<template>
  <div class="message-box">
    <Card class="card">
      <div slot="title" class="card-title">
        <p>
          <Icon type="md-mail"></Icon>
          未读消息
        </p>
        <Button type="text" icon="md-done-all" @click="clickMarkAll">全部标记为已读</Button>
      </div>
      <template v-if="messages && messages.hasnot_read_messages.length">
        <div class="reply-item" v-for="msg in messages.hasnot_read_messages">
          <Avatar size="large" :src="msg.author.avatar_url" class="user"></Avatar>
          <div>
            <h4>@{{msg.author.loginname}}</h4>
            <p>在话题
              <router-link :to="'/topic/'+ msg.topic.id ">
                《{{msg.topic.title}}》
              </router-link>
            中{{msg.type === 'at' ? '提到':'回复'}}了你</p>
          </div>
        </div>
      </template>
      <template v-else>
        没有新的消息
      </template>
    </Card>
    <Card>
      <p slot="title">
        <Icon type="md-archive" />
        过往消息
      </p>
      <template v-if="messages">
        <div class="reply-item" v-for="msg in messages.has_read_messages">
          <Avatar size="large" :src="msg.author.avatar_url" class="user"></Avatar>
          <div>
            <h4>@{{msg.author.loginname}}</h4>
            <p>在话题
              <router-link :to="'/topic/'+ msg.topic.id ">
                《{{msg.topic.title}}》
              </router-link>
            中{{msg.type === 'at' ? '提到':'回复'}}了你</p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { Card, Avatar, Time, Icon, Button } from "iview";
import formatTime from "@/utils/formatTime";

export default {
  name: "Message",
  components: {
    Card,
    Avatar,
    Time,
    Icon,
    Button
  },
  data() {
    return {
      messages: null
    };
  },
  methods: {
    async getMessages(accesstoken) {
      try {
        let result = await this.$api.getMessages(accesstoken);
        this.messages = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async clickMarkAll() {
      if (this.messages) {
        try {
          let { accesstoken } = this.$store.state;
          let result = await this.$api.postMarkAllMsg(accesstoken);
          this.messages.hasnot_read_messages = [];
          this.$message("全部标记为已读");
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
  mounted() {
    let { accesstoken, userinfo } = this.$store.state;
    if (accesstoken && userinfo) {
      this.getMessages(accesstoken);
    }
  }
};
</script>

<style lang="stylus" scoped>
.reply-item {
  display: flex;
  margin-bottom: 16px;

  .user {
    flex-shrink: 0;
    margin-right: 8px;
  }
}

.card {
  margin-bottom: 20px;

  .card-title {
    display: flex;
    align-items: center;
  }
}
</style>

