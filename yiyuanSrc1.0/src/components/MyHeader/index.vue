<template>
  <div id="my-header" class="head">
    <div class="my-header" v-if="!isCenter">
      <div class="title">
        <div v-if="titleType == 'text'">
          <div class="header-logo"></div>
          <h3 class="header-text">{{title}}</h3>
        </div>
      </div>
      <div class="userinfo" v-if="isUser">
        <div class="nowdate">
          <div class="date">{{date}}</div>
          <div class="time">{{time}}</div>
        </div>
        <div class="username">{{user}}</div>
        <div class="gohome" v-if="$route.path !== '/home/index'" @click="goHome">
          <img src="../../assets/image/home.png" alt />
        </div>
        <div class="edit" @click="edit">
          <img src="../../assets/image/exit.png" alt />
        </div>
      </div>
    </div>
    <div class="my-header-center" v-if="isCenter">
      <div class="option" v-if="isOption">
        <div class="gohome" @click="goHome">
          <img src="../../assets/image/home.png" alt="">
        </div>
        <div class="allScreen" @click="changeScreen">
          <img src="../../assets/image/allscreen.png" alt="">
        </div>
      </div>
      <div class="title">
        <div class="header-logo"></div>
        <h3 class="header-text">{{title}}</h3>
      </div>
      <div class="userinfo">
        <div class="nowdate">
          <div class="date">{{date}}</div>
          <div class="time">{{time}}</div>
        </div>
        <div class="username">{{user}}</div>
        <div class="edit" @click="edit">
          <img src="../../assets/image/exit.png" alt />
        </div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
/**
 * 属性:
 * 1.title: 标题文字
 * 2.logoUrl: 标题logo
 * 3.titleType：标题类型 'text': 文字标题  'img': '图片'
 * 4.user: 用户名
 * 5.isUser: 是否展示用户信息
 * 6.isOption: 是否展示相关操作
 */
import screenfull from "screenfull"; // 全屏操作插件
import { removeToken } from "@/utils/auth.js";
export default {
  name: "my-header",
  props: {
    title: {
      default: "内研所AI智能化管理系统",
      type: String
    },
    logoUrl: {
      default: "",
      type: String
    },
    titleType: {
      default: "text",
      type: String
    },
    user: {
      default: "admin",
      type: String
    },
    isOption: {
      default: false,
      type: Boolean
    },
    isUser: {
      default: true,
      type: Boolean
    },
    isCenter: {
      default: false
    }
  },
  data() {
    return {
      date: "",
      time: "",
      isFullScreen: false
    };
  },
  mounted() {
    let that = this;
    setInterval(function() {
      that.getNowDate();
    }, 1000);
  },
  methods: {
    getNowDate() {
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1;
      let day = nowDate.getDate();
      let hour = nowDate.getHours();
      let min = nowDate.getMinutes();
      let seconds = nowDate.getSeconds();
      this.date = year + "年" + month + "月" + day + "日";
      this.time =
        this.addZero(hour) +
        ":" +
        this.addZero(min) +
        ":" +
        this.addZero(seconds);
    },
    addZero(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    },
    changeScreen() {
      // 全屏操作
      if (!screenfull.isEnabled) {
        this.$message("您的浏览器不能全屏");
        return false;
      }
      screenfull.toggle();
    },
    goHome() {
      // 返回首页
      this.$router.push("/home/index");
    },
    edit() {
      // 退出登录
      removeToken();
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.my-header {
  width: 100%;
  height: 86px;
  position: relative;
  // background:linear-gradient(90deg,#024C5E,#00090F);
  background: linear-gradient(90deg, rgba(2, 85, 105, 1), #00090f);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  & > div {
    display: flex;
    .header-text {
      font-size: 28px;
      text-shadow: 0px 3px 2px rgba(0, 0, 0, 0.4);
      font-family: PingFangSC-Medium;
      font-weight: normal;
    }
  }
  .title {
    position: absolute;
    left: 20px;
    & > div {
      display: flex;
      align-items: center;
    }
    // left: 50%;
    // transform: translateX(-50%);
  }
  .userinfo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    & > div {
      padding: 0 10px;
    }
    .date {
      margin-right: 5px;
      font-size: 14px;
      line-height: 32px;
    }
    .time {
      line-height: 30px;
    }
    .nowdate:after {
      content: "|";
      width: 1px;
      display: inline-block;
      color: #fff;
      font-size: 16px;
      position: relative;
      left: 9px;
      top: 5px;
    }
    .edit,
    .gohome {
      cursor: pointer;
      height: 25px;
      width: 25px;
      margin-right: 5px;
      border: 1px solid #213532;
      padding: 0;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 2px;
      }
    }
    .username {
      line-height: 25px;
    }
  }
}
.my-header-center {
  display: flex;
  margin: 0 43px;
  box-sizing: border-box;
  height: 88px;
  background: url("../../assets/image/top-bg.png") no-repeat;
  background-position: 0 -3px;
  background-size: 100% 100%;
  justify-content: space-between;
  position: relative;
  color: #fff;
  .option {
    display: flex;
    position: absolute;
    left: 80px;
    top: 22px;
    // top: 50%;
    // transform: translateY(-50%);
    .gohome,.allScreen{
      cursor: pointer;
      height: 25px;
      width: 25px;
      margin-right: 5px;
      border: 1px solid #213532;
      padding: 0;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 2px;
      }
    }
  }
  .userinfo {
    display: flex;
    position: absolute;
    top: 22px;
    right: 80px;
    & > div {
      padding: 0 10px;
    }
    .date {
      margin-right: 5px;
      font-size: 14px;
      line-height: 32px;
    }
    .time {
      line-height: 30px;
    }
    .nowdate:after {
      content: "|";
      width: 1px;
      display: inline-block;
      font-size: 16px;
      position: relative;
      left: 9px;
      top: 5px;
    }
    .edit{
      cursor: pointer;
      height: 25px;
      width: 25px;
      margin-right: 5px;
      border: 1px solid #213532;
      padding: 0;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 2px;
      }
    }
    .username {
      line-height: 25px;
    }
  }
   
  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    color: #fff;
    align-items: center;
    top: 20px;
    .header-text {
      font-size: 28px;
      text-shadow: 0px 3px 2px rgba(0, 0, 0, 0.4);
      font-family: PingFangSC-Medium;
      font-weight: normal;
    }
  }
  .line {
    position: absolute;
    bottom: -5px;
    height: 24px;
    width: 100%;
    background: url('../../assets/image/topbg-line.png') center no-repeat;
    background-size:100% 100%;
  }
}
.header-logo {
  width: 50px;
  height: 50px;
  background: url("../../assets/image/top-logo.png");
  margin-right: 15px;
  margin-left: 5px;
}
.nowdate {
  display: flex;
}
</style>
