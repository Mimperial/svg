<template>
    <div class="home">
        <my-header></my-header>
        <!-- <my-header :title="title" :isOption="isOption" :isUser="isUser"></my-header> -->
        <el-container>
          <router-view></router-view>
        </el-container>
    </div>
</template>

<script>
import MyHeader from '@/components/MyHeader/index.vue'
export default {
  name: 'home',
  data () {
    return {
      title: '内研所AI智能化管理系统',
      isOption: false,
      isUser: false
    }
  },
  components: {
    MyHeader
  },
  watch: {
    $route: {
      handler: function (n, o) {
        this.headerStyle()
      },
      deep: true
    }
  },
  created () {
    this.headerStyle()
  },
  methods: {
    linkPage (index) {
      if (this.routes[index].path !== '') {
        this.$router.push(this.routes[index].path)
      } else {
        this.$message('此模块正在开发中...')
      }
    },
    headerStyle () {
      if (this.$route.path !== '/login' && this.$route.path !== '/home/main') {
        this.isOption = true
        this.isUser = true
      }
    }
  }
}
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
    padding: 15px;
    box-sizing: border-box;
  }
}
</style>
