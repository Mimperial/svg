<template>
    <el-container>
        <div class="content">
            <div class="item-title" v-for="(item, index) in routes" :key="index" @click="linkPage(index)">
                <img :src="require('../../assets/image/icon' + (index + 1) + '.png')" alt="">
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
          path: '/visual_external_screen',
          title: '数据驾驶舱',
          icon: ''
        },
        // {
        //   path: '/visual_inner_screen',
        //   title: '数据驾驶舱',
        //   icon: ''
        // },
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
    width: 1200px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .item-title {
      width: 386px;
      height: 300px;
      cursor: pointer;
      background: url('../../assets/image/bottom.png') center 0 no-repeat;
      position: relative;
      margin-top: 50px;
      font-size: 28px;
      color: #fff;
      letter-spacing: 3px;
      span {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
      img {
        position: absolute;
        left: 50%;
        top: -20px;
        transform: translateX(-50%);
      }
    }
}
</style>
