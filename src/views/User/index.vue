<template>
  <div>test</div>
</template>

<script>
export default {
  props:["username"],
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
  }
}
</script>

