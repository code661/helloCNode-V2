<template>
  <div id="app">
    <Header/>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  components:{
    Header,
  }
}
</script>
