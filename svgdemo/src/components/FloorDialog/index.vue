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
        <div class="option">
          <el-button type="primary" class="sure" @click="createFloor">确定</el-button>
          <el-button class="cancel" @click="cancelCreate">取消</el-button>
        </div>
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
        <div class="option">
          <el-button type="primary" class="sure" @click="createFloor">确定</el-button>
          <el-button class="cancel" @click="cancelCreate">取消</el-button>
        </div>
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

<style lang="scss" scoped>
.floor_dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 50%;
    background: #fff;
    border: 1px solid #4976a7;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .header {
      height: 40px;
      line-height: 40px;
      position: relative;
      background: #4976a7;
      color: #fff;
      font-size: 14px;
      .title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      .close {
        position: absolute;
        right: 15px;
        cursor: pointer;
        font-size: 24px;
      }
    }
    .con {
      position: relative;
      left: 50%;
      top: 45%;
      width: 80%;
      transform: translate(-58%, -50%);
    }
    .option {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      .el-button {
        margin-left: 25px;
      }
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
  .upload {
    display: inline-block;
  }
  .hint {
    display: inline-block;
  }
  .preview {
    cursor: pointer;
    display: inline-block;
    color: #4976a7;
    margin-left: 10px;
  }
}
</style>
