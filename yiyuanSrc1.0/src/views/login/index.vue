<template>
  <div class="login">
    <my-header :isUser="false"></my-header>
    <div class="loginbox">
      <h4>用户登录</h4>
      <div class="username">
        <div>
          <span class="userbg"></span>
          <input type="text" v-model="form.username" placeholder="请输入用户名" />
        </div>
      </div>
      <div class="pwd">
        <div>
          <span class="pwdbg"></span>
          <input type="password" v-model="form.password" placeholder="请输入密码" />
        </div>
      </div>
      <div>
        <button @click="login('form')">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { setToken } from "@/utils/auth";
import MyHeader from "@/components/MyHeader/index.vue";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    MyHeader
  },
  mounted() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode === 13) {
        if (that.$route.path == "/login") {
          that.login("form"); // 登录方法名
          return true;
        }
      }
    };
  },
  methods: {
    login(form) {
      this.$api.user
        .login({
          username: this.form.username,
          password: this.form.password
        })
        .then(data => {
          // if (data.code === 200) {
          //   this.$message({
          //     message: "登录成功",
          //     type: "success"
          //   });
          //   setToken('Admin-Token', data.msg);
          //   setToken("admin-user", this.form.username);
          //   this.$router.push("/home/index");
          // }
          if (data.needUpdatePassword === 0) { //不需要更新密码
            this.$message({
              message: "登录成功",
              type: "success"
            });
            setToken('Admin-Token', data.token);
            setToken("admin-user", this.form.username);
            this.$router.push("/home/index");
          }else{
            this.$message({
              message: "需要更新密码",
              type: "success"
            });
          }
        });
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/image/bg.png");
  // background-size: 131% 168%;
  background-position: -248px -440px;
  // background-repeat:no-repeat ;
  .my-header {
    background: none !important;
  }
  .loginbox {
    width: 452px;
    height: 460px;
    position: absolute;
    right: 360px;
    top: 263px;
    background-image: url("../../assets/image/login-bg.png");
    color: #fff;
    padding: 65px;
    box-sizing: border-box;
    .username,
    .pwd {
      width: 100%;
      height: 40px;
      border: 1px solid #01edfc;
      border-radius: 4px;
      margin-top: 40px;
      // margin-bottom: 20px;
      // margin:20px 0 20px 0;
      & > div {
        height: 40px;
        display: flex;
        align-items: center;
        .userbg {
          width: 40px;
          height: 20px;
          border-right: 1px solid #01edfc;
          background: url("../../assets/image/person.png") center no-repeat;
        }
        .pwdbg {
          width: 40px;
          height: 20px;
          border-right: 1px solid #01edfc;
          background: url("../../assets/image/password.png") center no-repeat;
        }
        input {
          flex: 1;
          background: none;
          border: none;
          padding: 0 10px;
          outline: 0;
          color: #01edfc;
          font-size: 16px;
          &::placeholder {
            color: #01edfc;
            font-size: 14px;
          }
        }
      }
    }
    & > .pwd {
      margin-bottom: 60px;
      // margin:40px 0;
    }
    h4 {
      color: #01edfc;
      font-size: 20px;
      font-weight: normal;
    }
    button {
      width: 100%;
      height: 40px;
      background: #00f7ff;
      border: none;
      border-radius: 4px;
    }
  }
}
</style>
