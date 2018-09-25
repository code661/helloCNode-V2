<template>
  <div class="user" v-if="userInfo">
    <Card>
      <p slot="title">
        个人信息
      </p>
      <div class="info">
        <Avatar :src="userInfo.avatar_url" shape="square" size="large" />
        <span>{{userInfo.loginname}}</span> 
        <p> 
          <Icon size="30" type="logo-github" />
          <a :href="`https://github.com/${userInfo.githubUsername}`">@{{userInfo.githubUsername}}</a>
        </p>
        <p>{{userInfo.score}} 积分</p>
        <span>注册时间 </span>
        <Time type="datetime" :type="userInfo.create_at | formatTime" :time="userInfo.create_at" />        
      </div>
    </Card>
    <Card>
      <p slot="title">
        最近创建的话题
      </p>
      <Cell v-for="(data,index) in limitRecentTopics" :data="data" :key="index"></Cell>
    </Card>
    <Card>
      <p slot="title">
        最近参与的话题
      </p>
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
</style>

