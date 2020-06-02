<template>
  <div class="aside">
    <el-aside width="220px">
        <div class="aside-logo-container">
          <!-- <img v-if="moduleIcon" :src="moduleIcon" alt=""> -->
          <span>{{title}}</span>
        </div>
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          background-color="rgba(22,78,102,0)"
          text-color="#4D9EB3"
          active-text-color="#fff"
          router
          >
            <div v-for="(item, index) in menuList" :key="index">
              <el-submenu :index="item.path" v-if="item.children">
                  <template slot="title">
                      <!-- <img :src="item.icon" alt=""> -->
                      <span>{{ item.title }}</span>
                  </template>
                  <el-menu-item v-for="i in item.children" :key="i.path" :index="i.path">
                      <!-- <img :src="i.icon" alt=""> -->
                      <span>{{i.title}}</span>
                  </el-menu-item>
              </el-submenu>
              <el-menu-item :index="item.path" v-else>
                  <!-- <img :src="item.icon" alt=""> -->
                  <span>{{ item.title }}</span>
              </el-menu-item>
            </div>
        </el-menu>
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
  letter-spacing: 2px;
  span {
    font-size: 15px;
    font-weight: 600;
    margin-left: 8px;
  }
}
</style>
