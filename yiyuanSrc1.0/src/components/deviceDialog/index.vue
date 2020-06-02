<template>
  <div class="device_dialog" v-if="visible">
    <div class="content">
      <div class="header">
        <div class="title">{{option}}</div>
        <span class="close" @click="cancelCreate">×</span>
      </div>
      <div class="con">
        <div class="form">
          <el-form ref="form" :model="formData" label-width="90px">
            <el-form-item label="设备ID">
              <el-input v-model="formData.equipId"></el-input>
            </el-form-item>
            <el-form-item label="IP地址">
              <el-input v-model="formData.equipIp"></el-input>
            </el-form-item>
            <el-form-item label="设备名称">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="所在楼层">
              <el-select v-model="formData.floor" placeholder="请选择">
                <el-option
                  v-for="(item, index) in floorSelect"
                  :label="item.name"
                  :value="item.value"
                  :key="index"
                ></el-option>
                <!-- <el-option label="2F" value="2F"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="监控区域">
              <el-select v-model="formData.area" placeholder="请选择">
                <el-option v-for="(item, index) in areaTypeSelect" :key="index" :label="item.name" :value="item.value"></el-option>
                <!-- <el-option label="会议室1" value="1"></el-option>
                <el-option label="会议室2" value="2"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="设备描述">
              <el-input v-model="formData.equipDiscription"></el-input>
            </el-form-item>
            <el-form-item label="设备类型">
              <el-radio-group v-model="formData.equipType">
                <el-radio v-for="(item, index) in deviceTypeSelect" :key="index" :label="item.name" :value="item.value"></el-radio>
                <!-- <el-radio label="1">枪机</el-radio>
                <el-radio label="2">半球机</el-radio>
                <el-radio label="3">人脸识别相机</el-radio>
                <el-radio label="4">球机</el-radio>
                <el-radio label="5">监控相机</el-radio>
                <el-radio label="6">安防相机</el-radio>
                <el-radio label="7">人脸识别设备</el-radio> -->
              </el-radio-group>
            </el-form-item>
            <el-form-item label="设备流地址">
              <el-input v-model="formData.equipUrl"></el-input>
              <el-button class="test" type="primary" @click="testRTSP">测试</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="option">
          <el-button type="primary" class="sure" @click="createUser">确定</el-button>
          <el-button class="cancel" @click="cancelCreate">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 创建或编辑设备
 * 1.option：弹框类型  编辑/创建 默认: 创建
 * 2.form: 用户信息 编辑是需要传 用于回显
 * 3.visible: 弹框是否显示  true/false
 * 4.deviceId  设备id 字段
 * 5.deviceName 设备名称 字段
 * 6.deviceType 设备类型 字段
 * 7.deviceAddress 设备流地址 字段
 * 8.IP IP地址 字段
 * 9.monitorArea 监控区域 字段
 * 10.deviceDes 设备描述 字段
 */
export default {
  name: "user-dialog",
  props: {
    option: {
      default: "创建",
      type: String
    },
    formData: {
      default: () => {
        return {
          equipId: "",
          equipIp: "",
          name: "",
          floor: "",
          area: "",
          equipDiscription: "",
          equipType: "",
          equipUrl: ""
        };
      },
      type: Object
    },
    visible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      floorSelect: [],
      areaTypeSelect: [],
      deviceTypeSelect: []
    };
  },
  created() {
    this.getFloorSelect();
    this.getFloorId();
    this.getAreaTypeSelect()
    this.getDeviceTypeSelect()
  },
  methods: {
    getFloorId() {
      this.floorSelect &&
        this.floorSelect.forEach(item => {
          if (this.form.floor === item.name) {
            this.form.floor = item.value;
          }
        });
    },
    getAreaTypeSelect () {
      this.$api.select.areaType().then(res => {
        if (res.code === 200) {
          this.areaTypeSelect = res.data
        }
      })
    },
    getDeviceTypeSelect () {
      this.$api.select.deviceType().then(res => {
        if (res.code === 200) {
          this.deviceTypeSelect = res.data
        }
      })
    },
    getFloorSelect() {
      this.$api.select.floor().then(res => {
        if (res.code == 200) {
          this.floorSelect = res.data;
        }
      });
    },
    createUser() {
      this.$emit("createDevice", this.option, this.formData);
    },
    cancelCreate() {
      this.$emit("update:formData", {});
      this.$emit("update:visible", false);
    },
    testRTSP() {
      if (this.formData.equipUrl) {
        this.$api.device
          .testDeviceIP({
            equipUrl: this.formData.equipUrl
          })
          .then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "测试成功"
              });
            } else {
              this.$message({
                type: "error",
                message: "测试失败"
              });
            }
          });
      } else {
        this.$message({
          type: "warning",
          message: "请先填写地址"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.device_dialog {
  position: fixed;
  top: 86px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: #f2f2f2;
  z-index: 999;
  .content {
    width: 700px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .header {
      height: 50px;
      line-height: 50px;
      position: relative;
      // background:rgba(1,38,63,1);
      background: #21839b;
      border-radius: 10px;
      font-size: 14px;
      margin-bottom: 10px;
      // color: #5EBBDC;
      color: #fff;
      .title {
        margin-left: 20px;
      }
      .close {
        position: absolute;
        top: 0px;
        right: 20px;
        cursor: pointer;
        font-size: 24px;
      }
    }
    .con {
      // background:#0A232D;
      background: #fff;
      border-radius: 10px;
      height: 450px;
    //   padding: 0 20px;
      box-sizing: border-box;
    //   position: relative;
      .form {
        height: 400px;
        position: relative;
        .el-form {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 75%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          .el-form-item {
            height: 100%;
            margin-bottom: 20px;
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
              //     content: '';
              //     position: relative;
              //     top: 5px;
              //     right: 2px;
              //     display: inline-block;
              //     width: 16px;
              //     height: 16px;
              //     background: url('../../assets/image/before.png') no-repeat;
              // }
            }
            .el-radio {
              // color: #fff;
              .el-radio__inner {
                // border: 1px solid #2BF2F4;
                // background: none;
                // background: #21839B;
              }
              .el-radio__input.is-checked .el-radio__inner {
                  background: #21839B;
              }
              .el-radio__input.is-checked + .el-radio__label {
                color: #21839b;
              }
            }
            .el-radio-group {
              width: 250px;
            }
            .el-input__inner {
              // border:1px solid rgba(43,242,244,1);
              width: 250px;
              height: 30px;
              background: none;
              border-radius: 0;
              // color: #fff;
            }
          }
        }
      }
    }
    .option {
      display: flex;
      justify-content: center;
      //   margin-top: 30px;
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
        // color: #091525;
        color: #fff;
        background: #21839B;
        margin-right: 30px;
      }
    }
    .test {
      position: absolute;
      left: 100%;
      padding: 0;
      height: 30px;
      width: 60px;
      margin-left: 10px;
      background: rgba(0, 247, 255, 1);
      border-radius: 4px;
      border: none;
      font-size: 14px;
      color: #091525;
    }
    .sure {
      width: 60px;
      height: 30px;
      padding: 0;
      background: #4976a7;
      border: none;
      font-size: 14px;
    }
    .cancel {
      width: 60px;
      height: 30px;
      padding: 0;
    }
  }
}
</style>