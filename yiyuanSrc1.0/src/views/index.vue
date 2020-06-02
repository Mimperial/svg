<template>
  <div class="home" ref="home">
    <my-header
      :user="username"
      :isCenter="isCenter"
      :isOption="isOption"
      :isUser="isUser"
      :title="title"
    ></my-header>
    <el-container>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import { getToken } from '../utils/auth.js'
import MyHeader from "@/components/MyHeader/index.vue";
export default {
  name: "home",
  data() {
    return {
      title: "内研所AI智能化管理系统",
      isOption: false,
      isUser: false,
      username: "",
      isCenter: false
    };
  },
  components: {
    MyHeader
  },
  watch: {
    $route: {
      handler: function(n, o) {
        this.headerStyle();
      },
      deep: true
    }
  },
  created() {
    this.username = getToken("admin-user");
    this.headerStyle();
  },
  methods: {
    linkPage(index) {
      if (this.routes[index].path !== "") {
        this.$router.push(this.routes[index].path);
      } else {
        this.$message("此模块正在开发中...");
      }
    },
    headerStyle() {
      if (this.$route.path === "/home/index") {
        this.isCenter = true;
        this.isOption = false;
        this.title = "内研所AI智能化管理系统";
      }
      if (
        this.$route.path === "/home/visual_inner_screen" ||
        this.$route.path === "/home/visual_external_screen"
      ) {
        this.isCenter = true;
        this.isOption = true;
        this.title = "内研所AI智能数据驾驶舱";
      }
      if (
        this.$route.path !== "/login" &&
        this.$route.path !== "/home/index" &&
        this.$route.path !== "/home/visual_inner_screen" &&
        this.$route.path !== "/home/visual_external_screen"
      ) {
        this.isOption = true;
        this.isUser = true;
        this.isCenter = false;
        this.title = "内研所AI智能化管理系统";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .el-container {
    position: relative;
    // padding: 15px;
    box-sizing: border-box;
  }
}
</style>
