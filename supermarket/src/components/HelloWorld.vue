<template>
  <div class="index">
    <h1>店铺搜索</h1>
    <div class="search-bar">
      <x-input
        placeholder="店铺名称"
        v-model="inputMarket"
        class="search-input"
      ></x-input>
      <button class="search-btn" @click="searchBtn">搜索</button>
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
        :title="item"
      />
    </van-list>
    <ul class="content">
      <li v-for="(item, index) in marketList" :key="index">
        <div class="market-name">
          <h3>{{ item.name }}</h3>
          <p>地址：{{ item.adrr }}</p>
        </div>
        <router-link :to="{ name: 'detail', params: { id: item.id } }">
          <div class="right-btn">
            >
          </div>
        </router-link>
      </li>
    </ul>
    <!-- <tab class="btn-tab-foot">
      <tab-item @on-item-click="handler">店铺搜索</tab-item>
      <tab-item @on-item-click="handler">采集要求</tab-item>
      <tab-item @on-item-click="handler">我的采集</tab-item>
    </tab> -->
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  data() {
    return {
      inputMarket: "hq",
      show: true,
      type:1,
      marketList: [{
        name: '宁阳县中超超市',
        adrr: '宁阳县新街路与建设路交叉口1',
        url: '/component/cell',
        id:"1"
      }, {
        name: '宁阳县中超超市',
        adrr: '宁阳县新街路与建设路交叉口2',
        url: {
          path: '/component/radio',
          replace: false
        },
        id:"2"
      }],
    };
  },
  methods: {
    handler() {
      alert("123456");
    },
    searchBtn() {
      console.log("搜索按钮");
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
    background: #fff;
    display: flex;
    .search-input {
      width: 90%;
      border: 1px solid #5c5c5c;
      margin-right: 5px;
      border-radius: 6px;
    }
    .search-btn {
      width: 66px;
      font-size: 16px;
      border-radius: 6px;
    }
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
  .btn-tab-foot {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
