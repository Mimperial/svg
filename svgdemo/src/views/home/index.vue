<template>
    <el-container>
        <div class="content">
            <div class="item-title" v-for="(item, index) in routes" :key="index" @click="linkPage(index)">
                <span>{{item.title}}</span>
            </div>
        </div>
    </el-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      routes: [
        {
          path: '/visual_large_screen',
          title: '数据驾驶舱',
          icon: ''
        },
        {
          path: '/intelligent_analysis',
          title: 'AI智能分析',
          icon: ''
        },
        {
          path: '/people_management',
          title: '人员管理中心',
          icon: ''
        },
        {
          path: '',
          title: '操作规范',
          icon: ''
        },
        {
          path: '/resource_management',
          title: '资源管理',
          icon: ''
        },
        {
          path: '/user_management',
          title: '用户管理',
          icon: ''
        }
      ]
    }
  },
  methods: {
    linkPage (index) {
      if (this.routes[index].path !== '') {
        this.$router.push('/home' + this.routes[index].path)
      } else {
        this.$message('此模块正在开发中...')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
    width: 1000px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .item-title {
      width: 280px;
      height: 160px;
      cursor: pointer;
      line-height: 160px;
      text-align: center;
      background-color: rgb(69, 124, 168);
      color: #fff;
      font-size: 20px;
      margin-bottom: 20px;
    }
}
</style>
