<template>
    <div class="user-management">
        <aside-bar :menuList="menuList" :moduleIcon="moduleIcon" title="用户管理"></aside-bar>
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
          path: '/home/user_management/user',
          title: '用户管理',
          icon: require('../../assets/image/user_control.png'),
          activedIcon: require('../../assets/image/user_control.png')
        },
        {
          path: '/home/user_management/role',
          title: '角色管理',
          icon: require('../../assets/image/user_control.png'),
          activedIcon: require('../../assets/image/user_control.png')
        }
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
}
</style>
