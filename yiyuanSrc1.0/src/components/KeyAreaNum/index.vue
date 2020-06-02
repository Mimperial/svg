<template>
  <div class="keyAreaNums">
    <div id="keyAreaNum"></div>
  </div>
</template>

<script>
export default {
  name: "keyAreaNum",
  data() {
    return {
      websock: null
    };
  },
  created() {
    // this.initWebSocket();
    this.drawKeyNum();
  },
  beforeRouteLeave() {
    // this.websock.close();
  },
  methods: {
    initWebSocket() {
      // 初始化websocket
      const wsuri = "ws://192.168.10.153:8881/data/module=emotion";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      this.websocketsend();
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
    drawKeyNum() {
      this.$nextTick(() => {
        let keyAreaNumChart = this.$echarts.init(
          document.getElementById("keyAreaNum")
        );
        keyAreaNumChart.setOption({
          grid: {
            left: "6%",
            right: "2%"
          },
          xAxis: {
            data: [
              "活动区",
              "餐饮区",
              "CAP实验室",
              "GMP实验室",
              "MGS实验室",
              "会议室1",
              "培养室",
              "会议室2",
              "会议室3",
              "会议室4",
              "培养室",
              "会议室2"
            ],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#50A2C1",
                width: 1,
                shadowBlur: "solid"
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 30,
              fontSize: 13
            },
            axisTick: {
              show: true,
              alignWithLabel: true
            }
          },
          yAxis: {
            name: "数量/人",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#50A2C1",
                width: 1,
                shadowBlur: "solid"
              }
            },
            axisLabel: {
              fontSize: 14
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#3d5269"
              }
            },
            nameTextStyle: {
              color: "#50A2C1",
              fontSize: 15
            },
            axisTick: {
              show: false
            }
          },
          series: [
            {
              z: 2,
              type: "bar",
              barWidth: 30,
              label: {
                show: true,
                position: "top",
                color: "#fff",
                fontSize: 14
              },
              data: [220, 182, 191, 234, 290, 330, 310, 220, 40, 320, 123, 343],
              itemStyle: {
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    x2: 1,
                    y: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 1,
                        color: "#27f7fa"
                      },
                      {
                        offset: 0.5,
                        color: "#27f7fa"
                      },
                      {
                        offset: 0.5,
                        color: "#23c3e2dd"
                      },
                      {
                        offset: 1,
                        color: "#23c3e2dd"
                      }
                    ]
                  }
                }
              }
            },
            {
              z: 1,
              name: "底部",
              type: "pictorialBar",
              data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              symbol: "diamond",
              symbolOffset: [0, "50%"],
              symbolSize: [30, 10],
              itemStyle: {
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    x2: 1,
                    y: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 1,
                        color: "#27f7fa"
                      },
                      {
                        offset: 1,
                        color: "#27f7fa"
                      },
                      {
                        offset: 1,
                        color: "#27f7fa"
                      },
                      {
                        offset: 1,
                        color: "#27f7fa"
                      }
                    ]
                  }
                }
              }
            },
            {
              z: 3,
              name: "上部1",
              type: "pictorialBar",
              symbolPosition: "end",
              data: [220, 182, 191, 234, 290, 330, 310, 220, 40, 320, 123, 343],
              symbol: "diamond",
              symbolOffset: [0, "-50%"],
              symbolSize: [30 - 4, (10 * (30 - 4)) / 30],
              itemStyle: {
                normal: {
                  borderColor: "#2BFAFF",
                  borderWidth: 2,
                  color: "#2BFAFF"
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
.keyAreaNums {
  width: 100%;
  height: 100%;
  #keyAreaNum {
    height: 100%;
  }
}
</style>