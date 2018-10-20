<template>
  <div id="app" class="layout">
    <Layout>
      <slot name="header">
        <Header></Header>
      </slot>
      <Content :style="{padding: '0 50px', marginTop: '20px', minHeight: 'calc(100vh - 153px)'}">
        <div class="main">
          <router-view></router-view>
        </div>
      </Content>
      <Footer class="layout-footer-center">自豪地采用 Vue.js 🎉</Footer>
    </Layout>
  </div>
</template>

<script>
import { Layout, Footer, Card, Content } from "iview";
import Header from "@/components/Header";

export default {
  components: { Layout, Footer, Card, Content, Header }
};
</script>

<style lang="stylus" scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;

  .main {
    min-width: 800px;
  }

  .layout-footer-center {
    text-align: center;
  }
}
</style>



