<template>
  <div>
    <div
      id="crowdedHeatMap"
      style="width: 800px; height: 939px;background:lightBlue"
    ></div>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {};
  },
  mounted() {
    this.getCrowdedHeatMap();
  },
  methods: {
    getCrowdedHeatMap() {
      var myChart = this.$echarts.init(document.getElementById('crowdedHeatMap'));
      var axisnums = 100;
      var axisdata = [];
      var x = [5, 50, 43, 43, 44, 100];
      var y = [49, 50, 93, 76, 21,50];
      var weight = [10, 120, 90, 100, 60, 10];
      for (var i = 0; i < axisnums; i++) {
        axisdata.push(i);
      }
      function makeHeatData() {
        var heatData = [];
        for (var i = 0; i < 2000; i++) {
          heatData.push([x[i], y[i], weight[i]]);
        }
        return heatData;
      }
      var data = makeHeatData();
      var option = {
        backgroundColor: "#070d0f",
        tooltip: {
          show: true
        },
        geo: [
          {
            map: "world",
            zoom: 0,
            roam: true,
            show: false,
            id: "geo1",
            itemStyle: {
              areaColor: "#070d0f"
            },
            height: "100%"
          }
        ],
        grid: {
          show: true,
          height: "60%",
          width: "80%",
          top: "20%",
          left: "center",
          borderColor: "#070d0f"
        },
        calculable: true,
        animation: false,
        xAxis: {
          type: "value",
          max: axisnums,
          data: axisdata,
          splitLine: {
            show: true,
            lineStyle:{
                 color: ['#070d0f'],
                 width: 1,
                type: 'solid'
            }
        }
        },
        yAxis: {
          type: "value",
          max: axisnums,
          data: axisdata,
          splitLine: {
            show: true,
            lineStyle:{
                 color: ['#070d0f'],
                 width: 1,
                type: 'solid'
            }
        }
        },
        series: [
          {
            id: "test",
            name: "密度",
            type: "heatmap",
            coordinateSystem: "cartesian2d",
            data: data,
            gridIndex: 0,
            gradientColors: ["blue", "cyan", "lime", "yellow", "red"],
            blurSize: 10,
            pointSize: 10,
            itemStyle: {
              show: true,
              color: "#070d0f"
            }
          }
        ]
      };

      myChart.setOption(option);

      function convertToPx(dataitem) {
        var newxy = myChart.convertToPixel({ seriesId: "test" }, dataitem);
        return newxy;
      }

      function convertToGeo(dataitem) {
        var pointobj = myChart.convertFromPixel(
          { geoId: "geo1" },
          convertToPx(dataitem)
        );
        var point = [pointobj[0], pointobj[1]];
        return point;
      }
      function convertData(data, x, y) {
        var convertedData = [];
        x = Math.ceil(x);
        y = Math.ceil(y);
        for (var i = 0; i < data.length; i++) {
          if (data[i][0] >= x && data[i][0] <= y) {
            var geoCoord = convertToGeo([data[i][0], data[i][1]]);
            geoCoord.push(data[i][2]); //
            convertedData.push(geoCoord);
          }
        }
        return convertedData;
      }
      var cusdata = convertData(data, 0, data.length);
      setTimeout(function() {
        myChart.setOption({
          series: [
            {
              name: "testheatmap",
              type: "heatmap",
              id: "testheatmap",
              coordinateSystem: "geo",
              seriesIndex: 1,
              geoIndex: 0,
              data: cusdata,
              blurSize: 30,
              pointSize: 20
            }
          ],
          visualMap: {
            show: true,
            top: "top",
            min: 0,
            max: 130,
            seriesIndex: 1,
            calculable: true,
            inRange: {
              color: ["blue", "blue", "green", "yellow", "red"]
            }
          }
        });
      }, 500);
      myChart.on("dataZoom", function(params) {
        var cusdata = convertData(
          data,
          (axisnums * params.start) / 100,
          (axisnums * params.end) / 100
        );
        myChart.setOption({
          series: [
            {
              name: "testheatmap",
              type: "heatmap",
              id: "testheatmap",
              coordinateSystem: "geo",
              seriesIndex: 1,
              geoIndex: 0,
              data: cusdata,
              blurSize: 13,
              pointSize: 8
            }
          ]
        });
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
