<template>
  <div class="hello">
    <LivePlayer :videoUrl="videoUrl" fluent autoplay live stretch></LivePlayer>
  </div>
</template>

<script>
import LivePlayer from '@liveqing/liveplayer'
export default {
  name: 'HelloWorld',
  data () {
    return {
      videoUrl: 'rtmp://192.168.10.153:1935/hls/46'
    }
  },
  components: {
    LivePlayer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
