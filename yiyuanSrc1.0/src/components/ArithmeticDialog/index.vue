<template>
  <div class="arithmetic_dialog" v-if="visible">
    <div class="header">
      <div class="tabPage">
        <span @click="close">AI算法管理</span>
        <span>{{option}}</span>
      </div>
      <div class="createDeviceType" v-if="option == '创建'">
        <button :class="active == 1?'active':''" @click="addDevice(1)">真实设备</button>
        <button :class="active == 2?'active':''" @click="addDevice(2)">虚拟设备</button>
      </div>
      <span class="close" @click="close">×</span>
    </div>
    <div class="con" v-if="active == 1">
      <div class="left">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="所在楼层1">
            <el-select v-model="floor" placeholder="请选择" @change="changeFloor">
              <el-option
                v-for="(item, index) in floorSelect"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
              <!-- <el-option label="1F" value="1"></el-option>
              <el-option label="2F" value="2"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="设备">
            <el-select v-model="form.equipmentId" placeholder="请选择">
              <el-option
                v-for="(item, index) in deviceSelect"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
              <!-- <el-option label="1层" value="1"></el-option>
              <el-option label="2层" value="2"></el-option>-->
            </el-select>
            <button class="addType" @click="addType">添加设备</button>
          </el-form-item>
          <el-form-item label="监控类型">
            <el-select v-model="form.algorithmTypeIds">
              <el-option label="头肩检测" :value="0"></el-option>
              <el-option label="人脸识别" :value="1"></el-option>
              <el-option label="人体关键点" :value="2"></el-option>
              <el-option label="人员滞留" :value="3"></el-option>
              <el-option label="火灾识别" :value="4"></el-option>
              <el-option label="物品滞留" :value="5"></el-option>
            </el-select>
            <!-- <el-radio-group v-model="form.algorithmTypeIds">
              <el-radio label="1">人脸</el-radio>
              <el-radio label="2">头肩</el-radio>
              <el-radio label="3">骨骼</el-radio>
              <el-radio label="4">行为</el-radio>
            </el-radio-group>-->
          </el-form-item>
          <!-- <el-form-item label="算法任务">
            <el-input type="textarea" v-model="form.equipmentScenePic"></el-input>
          </el-form-item>-->
          <el-form-item label="时间制">
            <el-radio-group v-model="form.algorithmTypeIds">
              <el-radio label="24小时制" value="1"></el-radio>
              <el-radio label="60分钟制" value="2"></el-radio>
              <el-radio label="60秒制" value="3"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="时间段">
            <el-time-picker
              is-range
              v-model="value1"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="算法参数">
            <el-input type="textarea" v-model="form.algorithmParam"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <flat-map :src="imgSrc"></flat-map>
        <div id="canvas"></div>
        <div class="option" v-if="option === '创建'">
          <el-button class="sure" @click="createArithmetic">确定</el-button>
          <el-button class="cancel" @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
    <div class="con" v-if="active == 2">
      <div class="left">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="所在楼层2">
            <el-select v-model="floor" placeholder="请选择" @change="changeFloor">
              <el-option
                v-for="(item, index) in floorSelect"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
              <!-- <el-option label="1F" value="1"></el-option>
              <el-option label="2F" value="2"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="设备">
            <el-select v-model="form.equipmentId" placeholder="请选择">
              <el-option
                v-for="(item, index) in deviceSelect"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
              <!-- <el-option label="1层" value="1"></el-option>
              <el-option label="2层" value="2"></el-option>-->
            </el-select>
            <button class="addType" @click="addType">添加设备</button>
          </el-form-item>
          <el-form-item label="监控类型">
            <el-select v-model="form.algorithmTypeIds">
              <el-option label="头肩检测" :value="0"></el-option>
              <el-option label="人脸识别" :value="1"></el-option>
              <el-option label="人体关键点" :value="2"></el-option>
              <el-option label="人员滞留" :value="3"></el-option>
              <el-option label="火灾识别" :value="4"></el-option>
              <el-option label="物品滞留" :value="5"></el-option>
            </el-select>
            <!-- <el-radio-group v-model="form.algorithmTypeIds">
              <el-radio label="1">人脸</el-radio>
              <el-radio label="2">头肩</el-radio>
              <el-radio label="3">骨骼</el-radio>
              <el-radio label="4">行为</el-radio>
            </el-radio-group>-->
          </el-form-item>
          <!-- <el-form-item label="算法任务">
            <el-input type="textarea" v-model="form.equipmentScenePic"></el-input>
          </el-form-item>-->
          <el-form-item label="时间制">
            <el-radio-group v-model="form.algorithmTypeIds">
              <el-radio label="24小时制" value="1"></el-radio>
              <el-radio label="60分钟制" value="2"></el-radio>
              <el-radio label="60秒制" value="3"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="时间段">
            <el-time-picker
              is-range
              v-model="value1"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="算法参数">
            <el-input type="textarea" v-model="form.algorithmParam"></el-input>
          </el-form-item>
        </el-form>
        <!-- <div class="option">
                    <el-button class="sure">确定</el-button>
                    <el-button class="cancel" @click="cancel">取消</el-button>
        </div>-->
      </div>
      <div class="right">
        <div id="canvas"></div>
        <div class="option" v-if="option === '创建'">
          <el-button class="sure" @click="createArithmetic">确定</el-button>
          <el-button class="cancel" @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlatMap from '@/components/Floor-flat-map/index.vue'
export default {
  name: "arithmetic-dialog",
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    option: {
      default: "查看",
      type: String
    },
    form: {
      default: () => {
        return {
          // floor: "",
          // equipmentId: "",
          algorithmTypeIds: "",
          equipmentScenePic: "",
          algorithmParam: "",
          algorithmTypeIds: ""
        };
      }
    }
  },
  data() {
    return {
      floorSelect: [],
      deviceSelect: [],
      rectArr: [],
      flag: 1,
      floor: "",
      value1: [new Date(0, 0, 0, 0, 0, 59), new Date(0, 0, 0, 9, 59, 59)],
      active: 1,
      imgSrc: ''
    };
  },
  components: {
    FlatMap
  },
  created() {
    this.getFloorSelect();
    this.getDeviceSelect();
    this.updateMonitorType();
  },
  mounted() {
    console.log(this.form);
    if (this.option === "创建") {
      this.drawLine();
    }
    if (this.option === "查看") {
      this.active = 1
      // this.showArea()
    }
  },
  methods: {
    addDevice (index) {
      this.active = index
    },
    addType() {
      this.$router.push("/home/resource_management/equipment?option=create");
    },
    showArea() {
      this.$nextTick(() => {
        console.log($("#canvas"));
        $("#canvas").html(
          `<div style="width:100px;height: 100px;left:100px;top: 100px"></div>`
        );
      });
    },
    updateMonitorType() {
      if (this.form.algorithmTypeIds == "人脸") {
        this.form.algorithmTypeIds = "1";
      }
      if (this.form.algorithmTypeIds == "头肩") {
        this.form.algorithmTypeIds = "2";
      }
      if (this.form.algorithmTypeIds == "骨骼") {
        this.form.algorithmTypeIds = "3";
      }
      if (this.form.algorithmTypeIds == "行为") {
        this.form.algorithmTypeIds = "4";
      }
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

          $("#canvas").html(divEle);
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
            _this.form.rjAlgorithmTaskDetails = {
              algorithmAreaLeft: x,
              algorithmAreaTop: y,
              algorithmAreaRight: x + width,
              algorithmAreaBottom: y + height,
              algorithmId: 1
            };
            // {
            //   leftTop: "(" + x + "," + y + ")",
            //   rightTop: "(" + (x + width) + "," + y + ")",
            //   rightBottom: "(" + (x + width) + "," + (y + height) + ")",
            //   leftBottom: "(" + x + "," + (y + height) + ")"
            // }
            console.log(_this.form.rjAlgorithmTaskDetails);
            e.stopPropagation();
            canvas.onmousemove = null;
          };
        });
      });
    },
    changeFloor() {
      this.$nextTick(() => {
        this.floorSelect.forEach((item) => {
          if (this.floor == item.value) {
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
      this.getDeviceSelect();
      // this.$nextTick(() => {
      //   this.floorSelect.forEach(item => {
      //     if (this.form.floor == item.value) {
      //       console.log(item.alternate)
      //       $('#canvas').attr('style','background : url(' + 'http://192.168.10.93:4456/upload/rj-user-resource/' + item.alternate + ');background-size:100% 100%')
      //     }
      //   })
      // })
    },
    getFloorSelect() {
      this.$api.select.floor().then(res => {
        if (res.code === 200) {
          this.floorSelect = res.data;
        }
      });
    },
    getDeviceSelect() {
      this.$api.select
        .device({
          floorId: this.floor,
          areaId: ""
        })
        .then(res => {
          if (res.code === 200) {
            this.deviceSelect = res.data;
          }
        });
    },
    createArithmetic() {
      this.$emit("createArithmetic", this.option, this.form);
    },
    cancel() {
      this.$nextTick(() => {
        $("#canvas").html("");
      });
    },
    close() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="scss">
.arithmetic_dialog {
  position: fixed;
  top: 86px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  padding: 20px;
  box-sizing: border-box;
  // background: #06141a;
  background: #f2f2f2;
  z-index: 999;
  display: flex;
  flex-direction: column;
  .el-input__icon {
    height: 32px;
  }
  .el-range-separator {
    height: 32px;
    color: #303133 !important;
    font-size: 12px;
  }
  .header {
    height: 50px;
    position: relative;
    // background: rgba(22, 78, 102, 0.25);
    background: #fff;
    font-size: 14px;
    // color: #fff;
    padding: 10px 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .tabPage {
      font-size: 12px;
      // border: 1px solid rgba(43, 242, 244, 1);
      border: 1px solid #21839b;
      width: 130px;
      height: 28px;
      display: flex;
      border-radius: 2px;
      position: relative;
      span {
        width: 50%;
        text-align: center;
        line-height: 28px;
        cursor: pointer;
        color: #21839b;
        &:first-child {
          border-right: 1px solid rgba(43, 242, 244, 1);
          background: #21839b;
          color: #fff;
        }
      }
    }
    .createDeviceType {
      position: absolute;
      left: 180px;
      line-height: 28px;
      button {
        color: #fff;
        background: #21839B;
        border: 1px solid #ccc;
        border-radius: 3px;
        outline: none;
        height: 30px;
        &.active {
          color: #155AA6;
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
    flex-wrap: no-wrap;
    .left {
      width: 400px;
      height: 100%;
      border-radius: 10px;
      background: #fff;
      // background: rgba(22, 78, 102, 0.25);
      // margin-left: 50px;
      padding: 20px 30px;
      box-sizing: border-box;
      .addType {
        width: 80px;
        height: 30px;
        // background: rgba(0, 247, 255, 1);
        background: #21839b;
        border-radius: 2px;
        border: none;
        margin-left: 5px;
        color: #fff;
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
            // color: #fff;
            margin-right: 10px !important;
            .el-radio__inner {
              // border: 1px solid #2bf2f4;
              // background: none;
            }
            .el-radio__label {
              padding-left: 5px;
            }
            .el-radio__input.is-checked .el-radio__inner {
              background: #21839b;
            }
            .el-radio__input.is-checked + .el-radio__label {
              color: #21839b;
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
          .el-textarea {
            .el-textarea__inner {
              width: 250px;
              border-radius: 0;
              // border: 1px solid rgba(43, 242, 244, 1);
              background: none;
              height: 120px;
              // color: #fff;
            }
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
      position: relative;
      #canvas {
        position: relative;
        width: 1000px;
        height: 500px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: url("../../assets/floor/1.png") no-repeat center center;
        background-size: 100% 100%;
      }
      #canvas > div {
        border: 2px solid green;
        position: absolute;
        background: rgba(255, 255, 255, 0.5);
      }
      .option {
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        .el-button {
          width: 80px;
          height: 30px;
          padding: 0;
          border-radius: 4px;
          // color: #00f7ff;
          // border: 1px solid rgba(43, 242, 244, 1);
          color: #21839b;
          border: 1px solid #21839b;
          background: none;
        }
        .sure {
          // color: #091525;
          color: #fff;
          background: #21839b;
        }
      }
      canvas {
        // width: 100%;
        // height: 100%;
        // position: relative;
        // left: 50%;
        // top: 50%;
        // transform: translate(-50%, -50%);
        // border: 2px solid #fff;
        // background: url("../../assets/floor/1.png") no-repeat center center;
      }
      // img {
      //     position: relative;
      //     left: 50%;
      //     top: 50%;
      //     transform: translate(-50%, -50%);
      // }
    }
  }
}
</style>
