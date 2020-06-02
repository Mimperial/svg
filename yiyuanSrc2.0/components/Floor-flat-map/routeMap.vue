<template>
  <div style="width: 100%; height: 100%;text-align: center;">
    <canvas
      :id="'canvasMap'+ id"
      width="300"
      :style="'height:100%;background-image: url(' + src + ');background-repeat:no-repeat;'"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    src: "",
    id: "",
    isSwiper: {
      default: false,
      type: Boolean
    }
  },
  created() {
    this.drawMap();
  },
  methods: {
    drawMap() {
      var started;
      this.$nextTick(() => {
        function writeMessage(canvas, message) {
          context.clearRect(0, 0, 100, 20);
          context.font = "5pt Calibri";
          context.fillStyle = "#fff";
          context.fillText(message, 5, 12);
        }
        var p_arr = [];

        function getPointOnCanvas(canvas, evt) {
          var rect = canvas.getBoundingClientRect();
          var x = evt.layerX * (canvas.width / rect.width);
          var y = evt.layerY * (canvas.height / rect.height);
          return {
            x: x,
            y: y
          };
        }

        // function doMouseDown(event) {
        //   var rect = canvas.getBoundingClientRect();
        //   var loc = getPointOnCanvas(canvas, event);
        //   console.log("mouse down at point( x:" + loc.x + ", y:" + loc.y + ")");
        //   console.log(
        //     "mouse down at point比例( x:" +
        //       loc.x / canvas.width +
        //       ", y:" +
        //       loc.y / canvas.height +
        //       ")"
        //   ); //将比例传给后端

        //   context.beginPath();
        //   if (that.isSwiper) {
        //     context.arc(loc.x + that.id * 300, loc.y, 10, 0, 2 * Math.PI);
        //   } else {
        //     context.arc(loc.x, loc.y, 10, 0, 2 * Math.PI);
        //   }
        //   context.stroke();
        //   context.lineStyle = "#fff";
        //   p_arr.push(loc);
        //   started = true;
        // }

        var canvas = document.getElementById("canvasMap" + this.id);
        var context = canvas.getContext("2d");

        // 画路线
        var routeArr = [
          [100, 100],
          [100, 88],
          [120, 88],
          [120, 80]
        ];
        drawRoute();
        function drawRoute() {
          // 划线
          context.beginPath();
          context.lineWidth = 1;
          context.setLineDash([1, 1]);
          for (let i = 0; i < routeArr.length - 1; i++) {
            context.moveTo(routeArr[i][0], routeArr[i][1]);
            context.lineTo(routeArr[i + 1][0], routeArr[i + 1][1]);
          }
          context.strokeStyle = "#ff0";
          context.stroke();
        }
        var imgW = 10,imgH = 8
        var newImg = new Image();
          newImg.src = require("../../assets/image/ren_external.png");
          newImg.onload = function() {
            context.drawImage(
              newImg,
              routeArr[routeArr.length - 1][0]-imgW/2,
              routeArr[routeArr.length - 1][1]-imgH/2,
              imgW,
              imgH
            );
          };
        // 获取新窗口的宽高,然后将比例乘以新的宽高，得到新的坐标，进行渲染。
        //后端返回数据给前端时，再通过初始化的canvas宽高与比例相乘，得到相对坐标点
        // var that = this;
        // canvas.addEventListener(
        //   "mousemove",
        //   function(evt) {
        //     var mousePos = getPointOnCanvas(canvas, evt);
        //     console.log(that.id * canvas.width);
        //     var message;
        //     if (that.isSwiper) {
        //       message =
        //         (mousePos.x + that.id * canvas.width).toFixed(1) +
        //         "," +
        //         mousePos.y.toFixed(1);
        //     } else {
        //       message = mousePos.x.toFixed(1) + "," + mousePos.y.toFixed(1);
        //     }

        //     writeMessage(canvas, message);
        //   },
        //   false
        // );

        // canvas.addEventListener("mousedown", doMouseDown, false);
      });
    }
  }
};
</script>
