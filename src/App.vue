<template>
  <div id="app" class="layout">
    <Layout>
      <slot name="header">
        <Header></Header>
      </slot>
      <Content :style="{padding: '0 50px', marginTop: '20px'}">
        <div class="main" style="min-height: 200px;">
          <router-view></router-view>
        </div>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
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

*
  margin 0
  padding 0
  box-sizing border-box

img
  width 100%
  display block

ul, ol
  list-style none
  line-height 1

a
  color inherit
  text-decoration none

.layout
  background #f5f7f9
  position: relative
  overflow: hidden

.layout-footer-center
  text-align: center

</style>



