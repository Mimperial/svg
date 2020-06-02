<template>
  <div class="floor_dialog" v-if="visible">
    <div class="content">
      <div class="header">
        <div class="title">{{option}}</div>
        <span class="close" @click="cancelCreate">×</span>
      </div>
      <div class="con" v-if="option === '创建'">
        <div class="form">
          <el-form ref="form" :model="formData" label-width="90px">
            <el-form-item label="楼层">
              <el-input v-model="formData.name" placeholder="请输入楼层小写数字"></el-input>
            </el-form-item>
            <el-form-item label="平面图">
              <upLoad @uploadFile="uploadFile1" />
              <div class="hint">建议上传图片格式为png, 大小不超过2M</div>
            </el-form-item>
            <el-form-item label="立体图">
              <upLoad @uploadFile="uploadFile2" />
              <div class="hint">建议上传图片格式为png, 大小不超过2M</div>
            </el-form-item>
          </el-form>
        </div>
        <div class="option" v-if="option === '创建'">
          <el-button type="primary" class="sure" @click="createFloor">确定</el-button>
          <el-button class="cancel" @click="cancelCreate">取消</el-button>
        </div>
      </div>
      <div class="con" v-if="option === '编辑'">
        <div class="form">
          <el-form ref="form" :model="formData" label-width="90px">
            <el-form-item label="楼层">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="平面图">
              <upLoad :valueUrl="formData.ichnography" @uploadFile="uploadFile1" />
              <div class="preview" @click="preview">预览</div>
            </el-form-item>
            <el-form-item label="立体图">
              <upLoad :valueUrl="formData.cubicChart" @uploadFile="uploadFile2" />
              <div class="preview" @click="preview">预览</div>
            </el-form-item>
          </el-form>
        </div>
        <div class="option" v-if="option === '编辑'">
          <el-button type="primary" class="sure" @click="createFloor">确定</el-button>
          <el-button class="cancel" @click="cancelCreate">取消</el-button>
        </div>
      </div>
    </div>
    <img-dialog :visible.sync="isShow" :src="src"></img-dialog>
  </div>
</template>

<script>
import UpLoad from "@/components/upload/index.vue";
import ImgDialog from "@/components/ImgDialog/index.vue";
/**
 * 新建/编辑楼层
 * visible: 控制组件显示隐藏  Boolean 默认 false
 * option: 显示弹框是编辑/创建 String 默认  '创建'
 * formData: 表单数据 Object
 */
export default {
  name: "floorDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    option: {
      type: String,
      default: "创建"
    },
    formData: {
      type: Object,
      default: () => {
        return {
          name: "",
          ichnography: "",
          cubicChart: ""
        };
      }
    }
  },
  data() {
    return {
      isShow: false,
      src: ""
    };
  },
  components: {
    UpLoad,
    ImgDialog
  },
  methods: {
    uploadFile1(el) {
      this.formData.ichnography = el.target.files[0];
    },
    uploadFile2(el) {
      this.formData.cubicChart = el.target.files[0];
    },
    createFloor() {
      this.$emit("createFloor", this.formData, this.option);
    },
    cancelCreate() {
      // this.$emit('update:formData', {})
      this.$emit("update:visible", false);
    },
    preview() {
      // 预览图片
      this.isShow = true;
      this.src = this.formData.ichnography;
    }
  }
};
</script>

<style lang="scss">
.floor_dialog {
  position: fixed;
  top: 86px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  // background:#06141A;
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
      padding: 0 20px;
      box-sizing: border-box;
      position: relative;
      .form {
        position: relative;
        height: 380px;
        .el-form {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
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
                // color: #fff;
                color: #ccc;
                font-size: 12px;
              }
            }
            .el-form-item__label {
              line-height: 30px;
              color: #000;
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
            .el-input__inner {
              // border:1px solid rgba(43,242,244,1);
              width: 250px;
              height: 30px;
              background: none;
              border-radius: 0;
              color: #000;
            }
          }
        }
      }
      
    }
    .option {
      display: flex;
      justify-content: center;
      // margin-top: 30px;
      .el-button {
        width: 80px;
        height: 30px;
        padding: 0;
        border-radius: 2px;
        color: #21839B;
        border: 1px solid #21839B;
        background: none;
      }
      .sure {
        // color: #091525;
        // background: #00f7ff;
        color: #fff;
        background: #21839B;
        margin-right: 30px;

      }
    }
  }
  .preview {
    cursor: pointer;
    display: inline-block;
    color: #4976a7;
    margin-left: 10px;
  }
}
</style>
