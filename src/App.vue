<template>
  <div id="app">
    <div class="main">
      <router-view></router-view>
      <Button :size="buttonSize" type="primary">Primary</Button>
    </div>
  </div>
</template>
<style lang="stylus">
</style>


<script>
export default {
  components:{
    Button
  }
}
</script>
