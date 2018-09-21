<template>
  <div>
    test
    <button @click="$router.push('/login')">登录</button>
    <button @click="logout">注销</button>
  </div>
</template>

<script>
export default {
  methods: {
    async login(accesstoke) {
      try {
        this.$store.dispatch("postAccessToken", accesstoke).then(() => {
          let { accesstoken, userinfo, collects } = this.$store.state;
          if (accesstoken && userinfo && !collects) {
            this.$store.dispatch("getCollects", userinfo.loginname);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      this.$store.dispatch("logout");
      this.$message.success("注销成功");
    }
  },
  created() {
    let { accesstoken } = this.$store.state;
    let accesstokenLocal = window.localStorage.getItem("accesstoken");
    if (!accesstoken && accesstokenLocal) this.login(accesstokenLocal);
  }
};
</script>

<style lang="stylus" scoped>
</style>


