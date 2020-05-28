<template>
  <div class="user_dialog" v-if="visible">
    <div class="content">
      <div class="header">
        <div class="title">{{option}}</div>
        <span class="close" @click="cancelCreate">×</span>
      </div>
      <div class="con">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名称">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="初始密码">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-select v-model="form.userType" placeholder="请选择">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="option">
          <el-button type="primary" @click="createUser">确定</el-button>
          <el-button @click="cancelCreate">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 创建或编辑用户弹框
 * 1.option：弹框类型  编辑/创建 默认: 创建
 * 2.form: 用户信息 编辑是需要传 用于回显
 * 3.visible: 弹框是否显示  true/false
 */
export default {
  name: 'user-dialog',
  props: {
    option: {
      default: '创建',
      type: String
    },
    form: {
      default: () => {
        return {
          username: '',
          pwd: '',
          userType: ''
        }
      },
      type: Object
    },
    visible: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    createUser () {
      this.$emit('update:visible', false)
    },
    cancelCreate () {
      this.$emit('update:form', {
        name: '',
        pwd: '',
        userType: ''
      })
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.user_dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 28%;
    height: 42%;
    background: #fff;
    border: 1px solid #4976a7;
    border-radius: 10px;
    overflow: hidden;
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
      position: absolute;
      left: 50%;
      top: 50%;
      width: 70%;
      transform: translate(-50%, -50%);
    }
    .option {
      width: 50%;
      margin: 0 auto;
      margin-top: 40px;
    }
  }
}
</style>
