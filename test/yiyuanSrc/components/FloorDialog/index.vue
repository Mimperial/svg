<template>
  <div class="floor_dialog" v-if="visible">
    <div class="content">
      <div class="header">
        <div class="title">{{option}}</div>
        <span class="close" @click="cancelCreate">×</span>
      </div>
      <div class="con" v-if="option === '创建'">
        <el-form ref="form" :model="formData" label-width="90px">
          <el-form-item label="楼层">
            <el-input v-model="formData.floorId" placeholder="请输入楼层小写数字"></el-input>
          </el-form-item>
          <el-form-item label="平面图">
            <upLoad />
            <div class="hint">建议上传图片格式为png, 大小不超过2M</div>
          </el-form-item>
          <el-form-item label="立体图">
            <upLoad />
            <div class="hint">建议上传图片格式为png, 大小不超过2M</div>
          </el-form-item>
        </el-form>
      </div>
      <div class="con" v-if="option === '编辑'">
        <el-form ref="form" :model="formData" label-width="90px">
          <el-form-item label="楼层">
            <el-input v-model="formData.floorId"></el-input>
          </el-form-item>
          <el-form-item label="平面图">
            <upLoad :valueUrl="formData.ichnography" />
            <div class="preview" @click="preview">预览</div>
          </el-form-item>
          <el-form-item label="立体图">
            <upLoad :valueUrl="formData.cubicChart" />
            <div class="preview" @click="preview">预览</div>
          </el-form-item>
        </el-form>
      </div>
      <div class="option" v-if="option === '创建'">
        <el-button type="primary" class="sure" @click="createFloor">确定</el-button>
        <el-button class="cancel" @click="cancelCreate">取消</el-button>
      </div>
        <div class="option" v-if="option === '编辑'">
        <el-button type="primary" class="sure" @click="createFloor">确定</el-button>
        <el-button class="cancel" @click="cancelCreate">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import UpLoad from '@/components/upload/index.vue'

/**
 * 新建/编辑楼层
 * visible: 控制组件显示隐藏  Boolean 默认 false
 * option: 显示弹框是编辑/创建 String 默认  '创建'
 * formData: 表单数据 Object
 */
export default {
  name: 'floorDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    option: {
      type: String,
      default: '创建'
    },
    formData: {
      type: Object,
      default: () => {
        return {
          floorId: ''
        }
      }
    }
  },
  components: {
    UpLoad
  },
  methods: {
    createFloor () {
      this.$emit('update:visible', false)
    },
    cancelCreate () {
      this.$emit('update:formData', {
        floor: ''
      })
      this.$emit('update:visible', false)
    },
    preview () {
      // 预览图片
    }
  }
}
</script>

<style lang="scss">
.floor_dialog {
  position: fixed;
  top: 80px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  background:#06141A;
  z-index: 999;
  .content {
    width: 700px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .header {
      height: 40px;
      line-height: 40px;
      position: relative;
      background:rgba(1,38,63,1);
      border-radius: 10px;
      font-size: 14px;
      margin-bottom: 10px;
      color: #5EBBDC;
      .title {
        margin-left: 20px;
      }
      .close {
        position: absolute;
        top: 0px;
        right: 20px;
        cursor: pointer;
        font-size: 20px;
      }
    }
    .con {
      background:#0A232D;
      border-radius: 10px;
      height: 450px;
      padding: 0 20px;
      box-sizing: border-box;
      position: relative;
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
                  color: #fff;
                  font-size: 12px;
                }
            }
            .el-form-item__label {
                line-height: 30px;
                color: #fff;
                float: none;
                &::before {
                    content: '';
                    position: relative;
                    top: 5px;
                    right: 2px;
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: url('../../assets/image/before.png') no-repeat;
                }
            }
            .el-input__inner {
                border:1px solid rgba(43,242,244,1);
                width: 250px;
                height: 30px;
                background: none;
                border-radius: 0;
                color: #fff;
            }
        }  
      }
    }
    .option {
      display: flex;
      justify-content: space-around;
      margin-top: 30px;
      .el-button {
          width: 80px;
          height: 30px;
          padding: 0;
          border-radius: 4px;
          color:#00F7FF;
          border:1px solid rgba(43,242,244,1);
          background: none;
      }
      .sure {
        color: #091525;
        background: #00F7FF;
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
