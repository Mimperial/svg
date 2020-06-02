<template>
  <div class="heat-map">
    <div :id='ids' class="heat-map-can"></div>
  </div>
</template>

<script>

import h337 from 'heatmap.js'
export default {
  name: "HeatMap",
  props: {
    ids: '',
  },
  mounted() {
    this.testHeatMap()
  },
  methods: {
      testHeatMap() {
      // minimal heatmap instance configuration
      var heatmapInstance = h337.create({
        // only container is required, the rest will be defaults
        container: document.getElementById(this.ids)
      });
      // now generate some random data
      var points = []; //这里最后就是F1Data的数据，也是
      var max = 0;
      var width = 410;
      var height = 210;
      var len = 300;

      while (len--) {
        var val = Math.floor(Math.random() * 10);
        // now also with custom radius
        var radius = Math.floor(Math.random() * 7);

        max = Math.max(max, val);
        var point = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height),
          value: val,
          // radius configuration on point basis
          radius: radius
        };
        points.push(point);
      }
      // heatmap data format
      var data = {
        max: max,
        data: points
      };
      // if you have a set of datapoints always use setData instead of addData
      // for data initialization
      heatmapInstance.setData(data);
    },
  }
    
};
</script>

<style lang="scss">
.heat-map {
  width: 100%;
  height: 100%;
  .heat-map-can {
    width: 100%;
    height: 100%;
  }
}
</style>