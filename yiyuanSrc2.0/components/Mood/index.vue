<template>
  <div class="mood">
    <div class="moodBall" :id="ids"></div>
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: "mood",
  props: {
    ballColorOne: '',
    ballColorTwo: '',
    data: {
      default: [0.3]
    },
    ids: '',
    text: ''
  },
  created() {
    this.drawMood();
  },
  methods: {
    drawMood() {
      this.$nextTick(() => {
        let moodBallEcharts = this.$echarts.init(
          document.getElementById(this.ids)
        );
        moodBallEcharts.setOption({
          // backgroundColor: "#fff",
          series: [
            {
              type: "liquidFill",
              radius: "98%",
              center: ["50%", "50%"],
              data: this.data,
              backgroundStyle: {
                borderWidth: 1,
                borderColor: this.ballColorOne,
                color: "rgba(33,67,77,0.2)"
              },
              color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 1,
                  color: "rgba(73, 126, 255, 0.36)"
                },
                {
                  offset: 0,
                  color: "rgba(135, 241, 244, 0.7)"
                }
              ]),
              itemStyle: {
                shadowBlur: 0,
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 1,
                    color: this.ballColorOne
                  },
                  {
                    offset: 0,
                    color: this.ballColorTwo
                  }
                ]),
                opacity: 1
              },
              outline: {
                show: false
              },
              label: {
                fontSize: 18,
                color: '#fff',
                fontWeight: 400,
                formatter: function(v) {
                  return (v.data * 100).toFixed(0) + "%";
                },
                align: "center"
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
.mood {
    width: 80px;
    height: 110px;
    .moodBall {
        width: 80px;
        height: 80px;
        margin-bottom: 10px;
    }
    .text {
        text-align: center;
        color: #fff;
    }
}

</style>