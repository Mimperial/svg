<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.changeBackground()
  },
  watch: {
    $route:function () {
      this.changeBackground()
    }
  },
  methods: {
    changeBackground () {
      this.$nextTick(() => {
        if (this.$route.path === '/home/visual_external_screen' || this.$route.path === '/home/visual_inner_screen') {
          $('#app').css('background', '#000')
        } else {
          $('#app').css('background', 'url("/static/img/index_bg.png") -247px -403px no-repeat')
        }
      })
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  background: url('./assets/image/index_bg.png') -247px -403px no-repeat;
  /* background-color:#2B3036 ; */
}
</style>
