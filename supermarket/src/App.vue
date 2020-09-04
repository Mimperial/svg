<template>
  <div id="app" class="index">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view/>
    <van-tabbar v-model="active">
        <van-tabbar-item icon="search" @click="routerBtn()">店铺搜索</van-tabbar-item>
        <van-tabbar-item icon="home-o" @click="routerBtn()">采集要求</van-tabbar-item>
        <van-tabbar-item icon="friends-o" @click="routerBtn()">我的采集</van-tabbar-item>

    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      title: "",
      menuList: [],
      active: 0,
    };
  },
  components: {},
  watch: {
  },
  created() {},
  mounted(){
      this.routerBtn()
  },
  methods: {
      routerBtn(){
          console.log(this.active)
          switch(this.active){
              case 0:
                  console.log("店铺搜索")
                  this.$router.push("/search/index");
                  break;
              case 1:
                  console.log("采集要求")
                  this.$router.push("/require/index");
                  break;
              case 2:
                  console.log("我的采集")
                  this.$router.push("/myCap/index");
                  break;
          }
      }
  },
};
</script>

<style>
.index{
  
}
</style>
