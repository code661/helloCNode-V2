<template>
  <Card>
    <p slot="title">
      <Icon type="ios-text" />
      登录
    </p>
    <Input @on-enter="login" v-model="accesstoken" placeholder="Enter your accesstoken..." style="width: 300px" />
    <Button @click="login" icon="md-arrow-round-forward"></Button>
  </Card>
</template>

<script>
import { Card, Icon, Input, Button } from "iview";
export default {
  components: {
    Card,
    Icon,
    Input,
    Button
  },
  data() {
    return {
      accesstoken: null
    };
  },
  methods: {
    async login() {
      try{
        let result = await this.$store.dispatch("postAccessToken", this.accesstoken)
        if (result.success && result.userinfo) this.$router.push({name:'root'})
        else this.$message.warning("错误")
      }catch(error){
        this.$message.warning("错误")
      }
    }
  }
};
</script>

