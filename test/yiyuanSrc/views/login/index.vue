<template>
    <div class="login">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
            <el-input  v-model="form.username"></el-input>
          </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login('form')">登录</el-button>
          </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      }
      setTimeout(() => {
        if (value !== 'admin') {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }, 1000)
    }
    var checkPassWord = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      setTimeout(() => {
        if (value !== 'admin') {
          callback(new Error('请输入正确的密码'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            validator: checkUsername,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: checkPassWord,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    let that = this
    document.onkeypress = function (e) {
      var keycode = document.all ? event.keyCode : e.which
      if (keycode === 13) {
        that.login('form')// 登录方法名
        return false
      }
    }
  },
  methods: {
    login (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          this.$router.push('/home/index')
        } else {
          return false
        }
      })
      /* if (this.form.password && this.form.username) {
         this.$api.user.login({
          username: this.form.username,
          password: this.form.password
        }).then((data) => {
          if (data.code === 200) {
            this.getUserInfo()
            document.cookie = "userinfo=" + JSON.stringify(this.form)
            this.$router.push('/main')
            this.$message({
              message: '登录成功',
              type: 'success'
            });
          } else {
             this.$message.error(data.message);
          }
        })
      } */
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 360px;
  height:auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%);
}
button {
  width: 100%;
  background: #4976A7;
  border:none;
}
</style>
