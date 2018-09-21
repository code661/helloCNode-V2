<template>
  <Card>
    <p slot="title">
      <Icon type="ios-text" />
      登录
    </p>
    <Input :autofocus="true" @on-enter="login" v-model="accesstoken" placeholder="Enter your accesstoken..." style="width: 300px" />
    <Button @click="login" icon="md-arrow-round-forward"></Button>
  </Card>
</template>

<script>
import { Card, Icon, Input, Button } from "iview";
export default {
  name:"Login",
  components: {
    Card,
    Icon,
    Input,
    Button
  },
  data() {
    return {
      accesstoken: "44eb5a69-b322-42f2-adc4-8b1e33d4a21d"
    };
  },
  methods: {
    async login() {
      try {
        let result = await this.$store.dispatch(
          "postAccessToken",
          this.accesstoken
        );
        if (result.success && result.userinfo)
          this.$router.go(-1);
        else this.$message.warning("错误");
      } catch (error) {
        this.$message.warning("错误");
      }
    }
  }
};
</script>

