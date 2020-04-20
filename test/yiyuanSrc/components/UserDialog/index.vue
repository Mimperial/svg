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
      </div>
      <div class="option">
          <el-button type="primary" @click="createUser" class="sure">确定</el-button>
          <el-button @click="cancelCreate">取消</el-button>
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

<style lang="scss">
.user_dialog {
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
        // width: 50%;
        transform: translate(-50%, -50%);
        .el-form-item {
            height: 100%;
            margin-bottom: 20px;
            .el-form-item__content {
                line-height: 30px !important;
                margin-left: 0 !important;
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
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
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
}
</style>
