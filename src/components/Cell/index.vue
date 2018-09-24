<template>
  <div class="cell">
    <Avatar :src="data.author.avatar_url"></Avatar>
    <div class="reply" v-if="data.reply_count || data.visit_count">
      <span class="reply_count">{{ data.reply_count }}</span> /
      <span class="visit_count">{{ data.visit_count }}</span>
    </div>
    <Put :data=data v-if="data.tab || datas.good"></Put>
    <div class="title">
      <router-link class="title-a" :to="'/topic/'+ data.id ">
        {{data.title}}
      </router-link>
    </div>
    <Time
      class="time"
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
.cell
  display flex
  align-items center
  padding 10px
  font-size 14px
  border-bottom 1px solid #f0f0f0
  .reply
    width 80px
    text-align center
    font-size 12px
    .reply_count
      color #9e78c0
  .title
    flex 1
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    text-align left
  .title-a
    padding-left 10px
  .time
    text-align left
    font-size 12px

</style>


