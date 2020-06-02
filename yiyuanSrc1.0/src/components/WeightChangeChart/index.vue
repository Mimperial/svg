<template>
  <div class="weightChange">
    <div id="weightChange"></div>
  </div>
</template>

<script>
export default {
  name: "weightChange",
  created() {
    this.drawWeightChangeChart();
  },
  methods: {
    drawWeightChangeChart() {
      this.$nextTick(() => {
        let weightChangeChart = this.$echarts.init(
          document.getElementById("weightChange")
        );
        var seven_day_date = new Date();
        var seven_day_data = [];
        for (var i = 0; i < 7; i++) {
          var month = seven_day_date.getMonth() + 1;
          var day = seven_day_date.getDate();
          seven_day_date = new Date(
            seven_day_date.getTime() - 1000 * 60 * 60 * 24
          );
          seven_day_data.push(addZero(month) + "." + addZero(day));
        }
        seven_day_data.reverse();
        // 补零
        function addZero(data) {
          if (data < 10) {
            data = "0" + data;
          }
          return data;
        }
        var XData = seven_day_data;
        var YData = [50, 23, 65, 36, 85, 43, 60];
        weightChangeChart.setOption({
          // backgroundColor: "#374454",
          color: ["#69f1ff"],
          grid: {
            left: 30,
            top: 30,
            right: 10,
            bottom: 20
          },
          /* 鼠标悬浮时显示数据 */
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          xAxis: {
            type: "category",
            data: XData,
            //设置轴线的属性
            axisLine: {
              lineStyle: {
                color: "#3d5269"
              }
            },
            //调整x轴的lable
            axisLabel: {
              textStyle: {
                fontSize: 14, // 让字体变小
                color: "#50A2C1"
              }
            },
            axisTick: {
              show: true,
              alignWithLabel: true
            }
          },
          yAxis: {
            name: "体重/kg",
            nameTextStyle: {
              color: "#50A2C1",
              fontSize: 14
            },
            type: "value",
            // 控制网格线是否显示
            splitLine: {
              show: true,
              //  改变轴线颜色
              lineStyle: {
                // 使用深浅的间隔色
                color: ["#3d5269"]
              }
            },
            //设置轴线的属性
            axisLine: {
              show: false,
              lineStyle: {
                color: "#3d5269"
              }
            },
            //调整x轴的lable
            axisLabel: {
              textStyle: {
                fontSize: 14, // 让字体变小
                color: "#50A2C1"
              }
            }
          },
          /* 数据配置，若有多条折线则在数组中追加{name: , data: } */
          series: [
            {
              data: YData,
              type: "line",
              symbol: "circle",
              // 设置折点大小
              symbolSize: 10,
              // 设置为光滑曲线
              smooth: false,
              itemStyle: {
                //折线拐点标志的样式
                color: "#04CDF4"
              },
              areaStyle: {
                normal: {
                  type: "default",
                  color: new this.$echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#04CDF4" // 区域颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(0,0,0,0)' // 区域颜色
                      }
                    ],
                    false
                  )
                }
              }
            }
          ]
        });
      });
    }
  }
};
</script>

<style lang="scss">
.weightChange {
  width: 100%;
  height: 100%;
  #weightChange {
    width: 100%;
    height: 100%;
  }
}
</style>