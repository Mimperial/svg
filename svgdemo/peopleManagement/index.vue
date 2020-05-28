<template>
  <div class="people-management">
    <aside-bar :menuList="menuList" title="人员管理中心"></aside-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import AsideBar from "@/components/AsideBar/index.vue";
export default {
  name: "intelligent",
  data() {
    return {
      menuList: [
        {
          path: "/home/people_management/usageRate",
          title: "使用率"
        },
        {
          path: "/home/people_management/staffManagement",
          title: "员工管理",
          children: [
            {
              path: "/home/people_management/goThroughRecord",
              title: "通行记录"
            },
            {
              path: "/home/people_management/staffList",
              title: "员工列表"
            }
          ]
        },
        {
          path: "/home/people_management/visitoRecord",
          title: "访客记录"
        },
        {
          path: "/home/people_management/meetingRecord",
          title: "会议记录",
          
        }
      ]
    };
  },
  components: {
    AsideBar
  }
};
</script>

<style lang="scss" scoped>
.people-management {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
}
</style>
