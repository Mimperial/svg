<template>
    <div class="resource">
        <aside-bar :menuList="menuList" :moduleIcon="moduleIcon" title="资源管理"></aside-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import AsideBar from '@/components/AsideBar/index.vue'
export default {
  name: 'resource',
  data () {
    return {
      moduleIcon: require('@/assets/image/resource.png'),
      menuList: [
        {
          path: '/home/resource_management',
          title: '区域管理',
          children: [
            {
              path: '/home/resource_management/floor',
              title: '楼层管理'
            },
            {
              path: '/home/resource_management/area',
              title: '区域管理'
            }
          ]
        },
        {
          path: '/home/resource_management/equipment',
          title: '设备管理'
        },
        {
          path: '/home/resource_management/arithmetic',
          title: 'AI算法管理'
        }
      ]
    }
  },
  components: {
    AsideBar
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.resource {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
}
</style>
