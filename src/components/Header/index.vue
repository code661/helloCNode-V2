<template slot="header">
  <div class="header">
      <Header>
          <Menu mode="horizontal" theme="dark" @on-select="select">
              <div class="layout-logo">
                <img src="@/assets/cnodejs_light.svg" alt="cnode">
              </div>
              <div class="layout-nav">
                  <MenuItem name="home" to="/">
                    首页
                  </MenuItem>
                  <MenuItem name="login" v-if="!this.$store.state.userinfo" to="/login">
                    登录
                  </MenuItem>
                  <Submenu name="submenu" v-if="this.$store.state.userinfo">
                    <template slot="title">
                      <Icon size="18" type="md-contact" />
                    </template>
                    <MenuItem name="center" :to="`/user/${this.$store.state.userinfo.loginname}`">个人中心</MenuItem>
                    <MenuItem name="message" to="/my/message">
                      <Badge :count="unreadCount" dot>
                        未读消息
                      </Badge>
                    </MenuItem>
                    <MenuItem name="logout">注销</MenuItem>
                  </Submenu>
              </div>
          </Menu>
      </Header>
  </div>
</template>

<script>
import { Menu, MenuItem, Header, Icon, Submenu, Avatar, Badge } from "iview";

export default {
  components: { Menu, MenuItem, Header, Icon, Submenu, Avatar, Badge },
  data() {
    return {
      unreadCount: 0
    };
  },
  methods: {
    async login(accesstoken) {
      try {
        this.$store.dispatch("postAccessToken", accesstoken).then(() => {
          let { accesstoken, userinfo, collects } = this.$store.state;
          if (accesstoken && userinfo && !collects) {
            this.$store.dispatch("getCollects", userinfo.loginname);
          }
          this.getUnreadCount(accesstoken);
        });
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      this.$store.dispatch("logout");
      this.$message.success("注销成功");
    },
    select(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
      }
    },
    async getUnreadCount(accesstoken) {
      try {
        let result = await this.$api.getUnreadCount(accesstoken);
        this.unreadCount = result.data;
      } catch (error) {
        console.log(error);
      }
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
.layout-logo {
  float: left;
  position: relative;
  top: 10px;
  left: 20px;
  width: 130px;
}

.layout-nav {
  float: right;
}
</style>


