<template>
  <Card>
    <div slot="title">
      <Tab
        @change-tab="routeTo"
        :tab="this.$route.query.tab || 'all'"
        :page="currentPage"
      />
      <Button type="success">发布主题</Button>
    </div>
    <Cell
      v-for="data in datas" 
      :data="data" 
      :key="data.id"
    />
    <Page
      class-name="page"
      @on-change="routeTo"
      :total="1000"
      show-elevator
      size="small"
      :current="currentPage"
    />
  </Card>
</template>

<script>
import { Card, Page, Button } from "iview";
import Cell from "@/components/Cell";
import Tab from "@/components/Tab"

export default {
  name: "PostList",
  components: {
    Card,
    Page,
    Cell,
    Tab,
    Button
  },
  data() {
    return {
      datas: null,
      currentPage: 1
    };
  },
  methods: {
    routeTo(page = 1, tab = this.$route.query.tab || "all") {
      this.$router.push({ path: "/", query: { tab, page } });
    },
    async getTopics(page = 1, tab = "all") {
      try {
        let result = await this.$api.getTopics({
          tab,
          page,
          limit: 20
        });
        this.datas = result.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    $route() {
      let { page, tab } = this.$route.query;
      this.currentPage = parseInt(page);
      if (page && tab) this.getTopics(page, tab);
    }
  },
  created() {
    let { page, tab } = this.$route.query;
    this.currentPage = parseInt(page) || 1;
    if (page && tab) {
      this.getTopics(page, tab);
    } else this.getTopics(this.currentPage);
  }
};
</script>

<style lang="stylus" scoped>
</style>


