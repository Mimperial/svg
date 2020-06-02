<template>
  <div class="area_dialog" v-if="visible">
    <div class="header">
      <div class="tabPage">
        <span @click="cancel">区域管理</span>
        <span>{{option}}</span>
      </div>
       <span class="close" @click="cancel">×</span>
    </div>
    <div class="con">
      <div class="left">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="所在楼层">
            <el-select v-model="form.floorId" placeholder="请选择" @change="changeFloor">
              <el-option
                v-for="(item, index) in floorSelect"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
              <!-- <el-option label="2层" value="2"></el-option>
                            <el-option label="3层" value="3"></el-option>
                            <el-option label="4层" value="4"></el-option>
                            <el-option label="5层" value="5"></el-option>
                            <el-option label="6层" value="6"></el-option>
              <el-option label="7层" value="7"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="区域类型">
            <el-select v-model="form.areaType" placeholder="请选择">
              <el-option
                v-for="(item, index) in areaTypeSelect"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
              <!-- <el-option label="2" value="2"></el-option> -->
            </el-select>
            <button class="addType" @click="addAreaType">添加类型</button>
          </el-form-item>
          <!-- <el-form-item label="楼层图">
                        <el-radio-group v-model="floorImg">
                            <el-radio label="平面图"></el-radio>
                            <el-radio label="立体图"></el-radio>
                        </el-radio-group>
          </el-form-item>-->
          <el-form-item label="区域名称">
            <el-input v-model="form.areaName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="X值">
                        <el-input v-model="form.coordinatesX"></el-input>
                    </el-form-item>
                    <el-form-item label="Y值">
                        <el-input v-model="form.coordinatesY"></el-input>
          </el-form-item>-->
          <!-- <el-form-item label="R值">
                        <el-input v-model="form.coordinatesR"></el-input>
                        <span class="unit">单位: m</span>
          </el-form-item>-->
        </el-form>
        <div class="option">
          <el-button class="sure" @click="createArea">确定</el-button>
          <el-button class="cancel" @click="cancel">取消</el-button>
        </div>
      </div>
      <div class="right">
        <flat-map :src="imgSrc"></flat-map>
           <!-- <div id="canvas"></div> -->
        <!-- <img src="../../assets/floor/1.png" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script>
import FlatMap from '@/components/Floor-flat-map/index.vue'
export default {
  name: "area-dialog",
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    option: {
      default: "创建",
      type: String
    },
    form: {
      default: () => {
        return {
          floorId: "",
          areaType: "",
          areaName: "",
          coordinatesX: "",
          coordinatesY: ""
        };
      }
    }
  },
  components: {
    FlatMap
  },
  data() {
    return {
      floorImg: "平面图",
      floorSelect: [],
      areaTypeSelect: [],
      imgSrc: ''
    };
  },
  created() {
    this.getFloorSelect();
    this.getAreaTypeSelect();
  },
  mounted() {
      // this.drawLine()
  },
  methods: {
    addAreaType () {
      // this.$router.push('/home/resource_management/equipment')
    },
    changeFloor() {
      this.$nextTick(() => {
        this.floorSelect.forEach((item) => {
          if (this.form.floorId == item.value) {
            // this.imgSrc =  item.alternate
            console.log('../../assets/flat-map-svg/f' + item.name.slice(0, item.name.length - 1) + '.svg')
            this.imgSrc = require('../../assets/flat-map-svg/f' + item.name.slice(0, item.name.length - 1) + '.svg')
            console.log(item.alternate);
            $("#canvas").attr(
              "style",
              "background : url(" +
                "http://192.168.10.93:4456/upload/rj-user-resource/" +
                item.alternate +
                ");background-size:100% 100%"
            );
          }
        });
      });
    },
    drawLine() {
      let _this = this;
      this.$nextTick(() => {
        var canvasWidth = 1000;
        var canvasHeight = 500;
        var canvas = document.getElementById("canvas");
        //参数canvas--所画素材框的区域
        var that = this;

        // canvas 的矩形框
        var canvasRect = canvas.getBoundingClientRect();
        // 矩形框的左上角坐标
        var canvasLeft = canvasRect.left;
        var canvasTop = canvasRect.top;
        var x = 0;
        var y = 0;
        // 鼠标点击按下事件,画图准备
        $(document).on("mousedown", "#canvas", function(e) {
          var divEle = "";
          // x y为鼠标的落点
          x = e.clientX - canvasLeft;
          y = e.clientY - canvasTop;
          // console.log(x, y);
          //创建div
          divEle = document.createElement("div");

          $('#canvas').html(divEle);
          divEle.style.top = y + "px";
          divEle.style.left = x + "px";
          // console.log(x, y);
          var tx = 0;
          var ty = 0;
          var twidth = 0;
          var theight = 0;

          //鼠标移动事件，画图
          var width = 0;
          var height = 0;
          canvas.onmousemove = function(e) {
            e.stopPropagation();
            // width height是鼠标移动末尾距鼠标起始位置的差值
            width = e.clientX - canvasLeft - x;
            height = e.clientY - canvasTop - y;
            divEle.style.width = width + "px";
            divEle.style.height = height + "px";

            var tw = e.clientX - canvasLeft;
            var th = e.clientY - canvasTop;

            // console.log(tw,th)
            if (
              tw >= parseInt(canvasWidth) - 7 ||
              th >= parseInt(canvasHeight) - 7
            ) {
              // 比canvas少3px,为了易于判断
              canvas.onmousemove = null;
              canvas.onmouseup = null;
              return;
            }
          };
          canvas.onmouseup = function(e) {
            console.log(width, height);
            // _this.form.rjAlgorithmTaskDetails = {
            //   algorithmAreaLeft: x,
            //   algorithmAreaTop: y,
            //   algorithmAreaRight: x + width,
            //   algorithmAreaBottom: y + height,
            //   algorithmId: _this.form.rjAlgorithmTaskDetails.algorithmId
            // };
            // // {
            //   leftTop: "(" + x + "," + y + ")",
            //   rightTop: "(" + (x + width) + "," + y + ")",
            //   rightBottom: "(" + (x + width) + "," + (y + height) + ")",
            //   leftBottom: "(" + x + "," + (y + height) + ")"
            // }
            e.stopPropagation();
            canvas.onmousemove = null;
          };
        });
      });
    },
    getFloorSelect() {
      this.$api.select.floor().then(res => {
        this.floorSelect = res.data;
      });
    },
    getAreaTypeSelect() {
      this.$api.select.areaType().then(res => {
        this.areaTypeSelect = res.data;
      });
    },
    cancel() {
      this.$emit("update:visible", false);
    },
    createArea() {
      this.$emit("createArea", this.option, this.form);
    }
  }
};
</script>

<style lang="scss">
.area_dialog {
  position: fixed;
  top: 86px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  // background: #06141a;
  background:#F2F2F2;
  padding: 20px;
  box-sizing: border-box;
  z-index: 999;
  display: flex;
  flex-direction: column;
  .header {
    height: 50px;
    position: relative;
    // background: rgba(22, 78, 102, 0.25);
    background: #fff;
    font-size: 14px;
    padding: 10px 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .tabPage {
      font-size: 12px;
      // border: 1px solid rgba(43, 242, 244, 1);
      border: 1px solid #21839B;
      width: 130px;
      height: 28px;
      display: flex;
      border-radius: 2px;
      span {
        width: 50%;
        text-align: center;
        line-height: 28px;
        cursor: pointer;
        color: #21839B;
        &:first-child {
          border-right: 1px solid rgba(43, 242, 244, 1);
          background: rgba(2, 66, 82, 1);
          color: #fff;
        }
      }
    }
    .close {
      font-size: 25px;
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .con {
    flex: 1;
    margin-top: 20px;
    // padding: 15px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    .left {
      width: 400px;
      height: 100%;
      border-radius: 10px;
      // background: rgba(22, 78, 102, 0.25);
      background: #fff;
      // margin-left: 50px;
      padding: 20px 30px;
      box-sizing: border-box;
      .option {
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
        .el-button {
          width: 80px;
          height: 30px;
          padding: 0;
          border-radius: 2px;
          // color: #00f7ff;
          // border: 1px solid rgba(43, 242, 244, 1);
          color: #21839B;
          border: 1px solid #21839B;
          background: none;
        }
        .sure {
          color: #091525;
          // background: #00f7ff;
          background: #21839B;
          color: #fff;
        }
      }
      .addType {
        width: 80px;
        height: 30px;
        // background: rgba(0, 247, 255, 1);
        background: #21839B;
        border-radius: 2px;
        color: #fff;
        border: none;
        margin-left: 5px;
      }
      .unit {
        color: #fff;
        margin-left: 5px;
      }
      .el-form {
        .el-form-item {
          height: 100%;
          margin-bottom: 10px;
          .el-form-item__content {
            line-height: 30px !important;
            margin-left: 0 !important;
            .upload {
              display: inline-block;
            }
            .hint {
              display: inline-block;
              color: #fff;
              font-size: 12px;
            }
          }
          .el-form-item__label {
            line-height: 30px;
            // color: #fff;
            float: none;
            // &::before {
            //   content: "";
            //   position: relative;
            //   top: 5px;
            //   right: 2px;
            //   display: inline-block;
            //   width: 16px;
            //   height: 16px;
            //   background: url("../../assets/image/before.png") no-repeat;
            // }
          }
          .el-radio {
            color: #fff;
            .el-radio__inner {
              border: 1px solid #2bf2f4;
              background: none;
            }
            .el-radio__input.is-checked + .el-radio__label {
              color: #2bf2f4;
            }
          }
          .el-radio-group {
            width: 250px;
          }
          .el-input {
            width: 250px;
          }
          .el-input__inner {
            // border: 1px solid rgba(43, 242, 244, 1);
            width: 250px;
            height: 30px;
            background: none;
            border-radius: 0;
            // color: #fff;
          }
        }
      }
    }
    .right {
      flex: 1;
      height: 100%;
      border-radius: 10px;
      // background: rgba(22, 78, 102, 0.25);
      background: #fff;
      margin-left: 20px;
      padding: 20px 30px;
      box-sizing: border-box;
    //   canvas {
    //     // width: 100%;
    //     // height: 100%;
    //     position: relative;
    //     left: 50%;
    //     top: 50%;
    //     transform: translate(-50%, -50%);
    //     background: url("../../assets/floor/1.png") no-repeat center center;
    //   }
      // img {
      //     position: relative;
      //     left: 50%;
      //     top: 50%;
      //     transform: translate(-50%, -50%);
      // }
      //  #canvas {
      //   position: relative;
      //   width: 1000px;
      //   height: 500px;
      //   left: 50%;
      //   top: 50%;
      //   transform: translate(-50%, -50%);
      //   background: url("../../assets/floor/1.png") no-repeat center center;
      //   background-size: 100% 100%;
      // }
      // #canvas > div {
      //   border: 2px solid green;
      //   position: absolute;
      //   background: rgba(255, 255, 255, 0.5);
      // }
    }
  }
}
</style>
