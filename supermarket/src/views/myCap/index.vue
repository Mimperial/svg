<template>
  <div class="index">
    <h1>我的采集</h1>
    <div class="search-bar">
      <van-field v-model="shopName" label="店铺名称" placeholder="请输入店铺名称" />
      <van-button class="search-btn" @click="searchBtn" type="default">搜索</van-button>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in marketList"
        :key="index"
        :title="item.storeName"
        :label="item.location"
        is-link :to="{ path: '/search/detail', query: { id: item.storeId, title:item.storeInfo, pageSign:0 } }"
      />
    </van-list>
    
  </div>
</template>

<script>
import { Notify } from 'vant';
import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
      shopName: "",
      show: true,
      loading: true,
      finished: true,
      type:1,
      marketList: [{
        storeName: '宁阳县中超超市',
        location: '宁阳县新街路与建设路交叉口1',
        url: '/component/cell',
        storeId:"1"
      }, {
        storeName: '宁阳县中超超市2',
        location: '宁阳县新街路与建设路交叉口2',
        url: {
          path: '/component/radio',
          replace: false
        },
        storeId:"2"
      }],
      pageIndex:1,
      pageSize:5,
    };
  },
  mounted(){
    this.searchBtn()
  },
  methods: {
    searchBtn() {
      let _this = this;
      axios
        .post("/check/queryStore", {
          userId: window.localStorage.getItem('userId'),
          queryField: this.shopName,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
        })
        .then(function(response) {
          console.log("我的采集店铺");
          console.log(response);
          if(response.data.code == 0){
            let resDataList = response.data.result.storeInfo;
          _this.marketList = resDataList;
          }else{
            console.log(response.data.msg)
            Notify({ type: 'warning', message: response.data.msg });
          }
          
        })
        .catch(function(error) {
          console.log(error);
        });
    },
     onImgError (item, $event) {
      console.log(item, $event)
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
  }
}}
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
    .search-btn{
      width 20%
    }
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
