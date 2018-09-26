<template>
  <div class="user" v-if="userInfo">
    <Card title="个人信息" class="card">
      <div class="info">
        <div class="info-item">
          <Avatar :src="userInfo.avatar_url" shape="square" size="large" />
          <span class="main-info">{{userInfo.loginname}}</span> 
        </div>
        <div class="info-item"> 
          <Icon size="30" type="logo-github" />
          <a :href="`https://github.com/${userInfo.githubUsername}`">@{{userInfo.githubUsername}}</a>
        </div>
        <div class="info-item">{{userInfo.score}} 积分</div>
        <div class="info-item">
          <span>注册时间 </span>
          <Time type="datetime" :type="userInfo.create_at | formatTime" :time="userInfo.create_at" />
        </div>

      </div>
    </Card>
    <Card title="最近创建的话题" class="card">
      <Cell v-for="(data,index) in limitRecentTopics" :data="data" :key="index"></Cell>
    </Card>
    <Card title="最近参与的话题" class="card">
      <Cell v-for="(data,index) in limitRecentReplies" :data="data" :key="index"></Cell>
    </Card>
  </div>
</template>

<script>
import {Card,Avatar,Time,Icon} from "iview"
import Cell from "@/components/Cell"
import formatTime from "@/utils/formatTime"

export default {
  props:["username"],
  components:{
    Card,
    Cell,
    Avatar,
    Time,
    Icon
  },
  data(){
    return {
      userInfo: null
    }
  },
  methods:{
    async getUser(){
      try{
        let result = await this.$api.getUser(this.username)
        this.userInfo = result.data
      }catch(error){
        console.log(error)
      }
    }
  },
  computed:{
    limitRecentReplies(){
      if(this.userInfo.recent_replies.length > 6){
        return this.userInfo.recent_replies.slice(0,5)
      }
      return this.userInfo.recent_replies
    },
    limitRecentTopics(){
      if(this.userInfo.recent_topics.length > 6){
        return this.userInfo.recent_topics.slice(0,5)
      }
      return this.userInfo.recent_topics
    }
  },
  created(){
    this.getUser()
  },
  filters:{
    formatTime
  }
}
</script>

<style lang="stylus" scoped>

.user
  flex-grow 1
  overflow hidden
  min-width 300px
  .card
    margin-bottom 10px
    .info-item
      margin-bottom 10px
      .main-info
        font-weight 800
        margin-left 10px
</style>

