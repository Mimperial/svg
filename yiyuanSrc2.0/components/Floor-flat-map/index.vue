<template>
  <!-- <div style="width: 100%;height:100%"> -->
    <div style="width: 100%; height: 100%;text-align: center;">
      <canvas
        id='canvasMap' 
        width="300"
        :style="'height:100%;background-image: url(' + src + ');background-repeat:no-repeat;bacground-color:#000'"
      ></canvas>
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "",
  props: {
    src: '',
    id: ''
  },
  created() {
    this.drawMap();
  },
  methods: {
    drawMap() {
      var started
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

        function doMouseDown(event) {
          var rect = canvas.getBoundingClientRect();
          var loc = getPointOnCanvas(canvas, event);
          console.log("mouse down at point( x:" + loc.x + ", y:" + loc.y + ")");
          console.log(
            "mouse down at point比例( x:" +
              loc.x / canvas.width +
              ", y:" +
              loc.y / canvas.height +
              ")"
          ); //将比例传给后端

          context.beginPath();
          context.arc(loc.x, loc.y, 5, 0, 2 * Math.PI);
          context.stroke();
          context.lineStyle="#fff"
          p_arr.push(loc);
          started = true;
        }

        var canvas = document.getElementById("canvasMap");
        var context = canvas.getContext("2d");
        // 获取新窗口的宽高,然后将比例乘以新的宽高，得到新的坐标，进行渲染。
        //后端返回数据给前端时，再通过初始化的canvas宽高与比例相乘，得到相对坐标点
        canvas.addEventListener(
          "mousemove",
          function(evt) {
            var mousePos = getPointOnCanvas(canvas, evt);
            var message =
              "" + mousePos.x.toFixed(1) + "," + mousePos.y.toFixed(1);
            writeMessage(canvas, message);
          },
          false
        );

        canvas.addEventListener("mousedown", doMouseDown, false);
        // window.addEventListener(
        //   "resize",
        //   function() {
        //     context.clearRect(0, 0, canvas.width, canvas.height);
        //   },
        //   false
        // );
      });
    }
  }
};
</script>
