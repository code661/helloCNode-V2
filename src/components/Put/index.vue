<template>
  <Tag :color="formatType(data).color">{{formatType(data).label}}</Tag>
</template>

<script>
import { Tag } from "iview";
export default {
  components: {
    Tag
  },
  props: ['data'],
  methods: {
    formatType(data) {
      if (data.top) {
        return {
          color: "gold",
          label: "置顶"
        };
      } else if (data.good) {
        return {
          color: "red",
          label: "精华"
        };
      } else if (data.tab === "share") {
        return {
          color: "magenta",
          label: "分享"
        };
      } else if (data.tab === "ask") {
        return {
          color: "green",
          label: "问答"
        };
      } else if (data.tab === "job") {
        return {
          color: "cyan",
          label: "招聘"
        };
      } else if (data.tab === "dev") {
        return {
          color: "geekblue",
          label: "测试"
        };
      } else {
        return {
          label: "其他"
        };
      }
    }
  }
};
</script>

