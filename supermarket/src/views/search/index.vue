<template>
  <div class="index">
    <h1>店铺搜索</h1>
    <div class="search-bar">
      <van-search
        v-model="shopName"
        show-action
        label="店铺名称"
        placeholder="请输入店铺名称"
        @search="searchBtn"
      >
        <template #action>
          <div @click="searchBtn" type="default">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="searchShop"
      >
        <van-cell
          v-for="(item, index) in marketList"
          :key="index"
          :label="item.location"
          is-link
          :to="{
            path: '/search/detail',
            query: { storeId: item.storeId, title: item.storeName, pageSign: 0 },
          }"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title">{{ item.storeName }}</span>
            <van-tag type="danger" v-show="item.isCollect == false">未采集</van-tag>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
import { Notify } from "vant";
import axios from "axios";
Vue.use(Notify);
export default {
  name: "Index",
  data() {
    return {
      shopName: "",
      show: true,
      loading: true,
      finished: false,
      refreshing: false,
      type: 1,
      marketList: [],
      pageSize: 5,
      pageIndex: 1,
      userId: 1,
      
    };
  },
  mounted() {
    this.searchShop();
    window.localStorage.setItem('userId', "001")
  },
  methods: {
    searchShop() {
      let _this = this;
      axios
        .post("/collect/queryStore", {
          userId: this.userId,
          queryField: this.shopName,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
        })
        .then(function(response) {
          console.log("店铺搜索");
          console.log(response);
          if(response.data.code == 0){
            let resDataList = response.data.result.storeInfo;
            let resDataLisTotal = response.data.result.totalCount;
          _this.marketList = resDataList;
          if (resDataLisTotal >= 2000) {
          this.finished = true;
        }
          }else{
            console.log(response.data.msg)
            Notify({ type: 'warning', message: response.data.msg });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchBtn(val) {
      console.log(this.shopName);
      Toast(val);
    },
    onImgError(item, $event) {
      console.log(item, $event);
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style scoped lang="stylus">

.index {
  width: 100%;
  height: 100%;
  h1 {
    padding: 10px;
    font-weight: 600;
    font-size: 16px;
  }
  .search-bar {
    display: flex;
    padding: 10px;
  }
  .content {
    margin-top: 10px;
    li {
      padding: 10px 20px;
      margin:5px;
      background: #fff;
      display: flex;
      .market-name {
        width: 100%;
        height: 50px;
        line-height: 26px;
      }
      .right-btn {
        height: 50px;
        line-height: 65px;
      }
    }
  }
}
</style>
