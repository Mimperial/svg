<template>
  <div style="height:100%;position:relative">
    <div id="content" style="width: 100%; height: 100%;position:relative;">
      <canvas id="myCanvas" ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "flat-map",
  props: {
    imgUrl: ""
  },
  watch: {
    imgUrl: function() {
      this.$nextTick(function() {
        this.createMap();
      });
    }
  },
  mounted() {
    this.createMap();
  },
  methods: {
    createMap() {
      this.$nextTick(() => {
        var canvas = this.$refs.canvas;
        var context = canvas.getContext("2d");
        var p_arr = [];
        canvas.width = $("#content").width();
        canvas.height = $("#content").height();
        var scaleX;
        var scaleY;
        var routeArr = [
          [100, 100],
          [100, 88],
          [120, 88],
          [120, 80]
        ];
        var img = new Image();
        img.src = this.imgUrl;
        img.onload = function() {
          context.drawImage(img, 0, 0);
          scaleX = $("#content").width() / this.width;
          scaleY = $("#content").height() / this.height;
          drawRoute();
          var newImg = new Image();
          newImg.src = require("../../assets/image/ren_external.svg");
          newImg.onload = function() {
            context.drawImage(
              newImg,
              routeArr[routeArr.length - 1][0] * scaleX - this.width / 2,
              routeArr[routeArr.length - 1][1] * scaleY - this.height,
              20,
              20
            );
          };
        };

        function drawRoute() {
          // 划线
          context.beginPath();
          context.lineWidth = 2;
          context.setLineDash([3, 3]);
          for (let i = 0; i < routeArr.length - 1; i++) {
            context.moveTo(routeArr[i][0] * scaleX, routeArr[i][1] * scaleY);
            context.lineTo(
              routeArr[i + 1][0] * scaleX,
              routeArr[i + 1][1] * scaleY
            );
          }
          context.strokeStyle = "#ff0";
          context.stroke();
        }
      });
    }
  }
};
</script>

<style lang="scss">
canvas {
  position: absolute;
  left: 0;
  top: 0;
  // background: url('../../assets/flat-map-svg/f1.svg') no-repeat;
  // top: 10%;
  // left: 5%;
  // top: 15%;
  // margin-left: -500px;
  // margin-top: -250px;
}
</style>
