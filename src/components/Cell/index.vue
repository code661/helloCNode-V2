<template>
  <div class="cell">
    <Avatar :src="data.author.avatar_url"></Avatar>
    <div class="count">
      <span class="reply_count">{{ data.reply_count }}</span> /
      <span class="visit_count">{{ data.visit_count }}</span>
    </div>
    <Put :data=data></Put>
    <div class="title">
      <router-link :to="'/topic/'+ data.id ">
        {{data.title}}
      </router-link>
    </div>
    <Time
      :time="data.last_reply_at"
      :type="data.last_reply_at | formatType"
    >
    </Time>
  </div>

</template>

<script>
import { Avatar, Time } from "iview";
import dayjs from "dayjs";
import Put from "../Put";

export default {
  components: {
    Avatar,
    Time,
    Put
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  filters: {
    formatType(time) {
      let now = dayjs();
      let diff = dayjs().diff(dayjs(time), "month");
      return diff > 0 ? "date" : "relative";
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>


