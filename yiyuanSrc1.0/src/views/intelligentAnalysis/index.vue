<template>
    <div class="user-management">
        <aside-bar :menuList="menuList" :moduleIcon="moduleIcon" title="AI智能分析"></aside-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import AsideBar from '@/components/AsideBar/index.vue'
export default {
  name: 'intelligent',
  data () {
    return {
      moduleIcon: require('@/assets/image/user.png'),
      menuList: [
        {
          path: '/home/intelligent_analysis/anomalousEvent',
          title: '异常事件',
          icon: require('../../assets/image/user_control.png'),
          activedIcon: require('../../assets/image/user_control.png')
        },
        {
          path: '/home/intelligent_analysis/peopleMoveLine',
          title: '人员动线',
          icon: require('../../assets/image/user_control.png'),
          activedIcon: require('../../assets/image/user_control.png')
        },
        {
          path: '/home/intelligent_analysis/crowdDensity',
          title: '人群密度',
          icon: require('../../assets/image/user_control.png'),
          activedIcon: require('../../assets/image/user_control.png')
        },
        {
          path: '/home/intelligent_analysis/boneIdentification',
          title: '骨骼识别',
          icon: require('../../assets/image/user_control.png'),
          activedIcon: require('../../assets/image/user_control.png')
        },
        {
          path: '/home/intelligent_analysis/signData',
          title: '体征数据',
          icon: require('../../assets/image/user_control.png'),
          activedIcon: require('../../assets/image/user_control.png'),
          children:[
            {
              path:'/home/intelligent_analysis/signRecord',
              title:'体征记录'
            },
            {
              path:'/home/intelligent_analysis/signAnalyse',
              title:'体征分析'
            },
          ]
        },
      ]
    }
  },
  components: {
    AsideBar
  }
}
</script>

<style lang="scss" scoped>
.user-management {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  background: #F2F2F2;
}
</style>
