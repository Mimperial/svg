<template>
  <div class="aside">
    <el-aside width="220px">
        <div class="aside-logo-container">
          <img v-if="moduleIcon" :src="moduleIcon" alt="">
          <span>{{title}}</span>
        </div>
        <el-scrollbar>
          <el-menu
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            background-color="#164E66"
            text-color="#fff"
            active-text-color="#D50000"
            router
            >
              <div v-for="(item, index) in menuList" :key="index">
                <el-submenu :index="item.path" v-if="item.children">
                    <template slot="title">
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item v-for="i in item.children" :key="i.path" :index="i.path">
                        <!-- <router-link :to="sndRoute.path" > -->
                            {{ i.title}}
                        <!-- </router-link> -->
                    </el-menu-item>
                </el-submenu>
                <el-menu-item :index="item.path" v-else>
                    {{ item.title }}
                </el-menu-item>
              </div>
          </el-menu>
        </el-scrollbar>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: 'aside-bar',
  props: {
    menuList: {
      default: () => {
        return []
      },
      type: Array
    },
    title: {
      default: '',
      type: String,
      required: true
    },
    moduleIcon: {
      default: '',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.aside-logo-container {
  height: 50px;
  background:rgba(20,68,78,1);
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 14px;
    font-weight: 600;
    margin-left: 8px;
  }
}
</style>
