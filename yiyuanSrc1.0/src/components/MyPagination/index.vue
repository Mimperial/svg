<template>
  <div class="my-pagiantion">
    <div>共{{total}}页</div>
    <div class="first">
      <button>首页</button>
    </div>
    <div class="prev">
      <button @click="changeCurrentPage">上一页</button>
    </div>
    <div class="pages">
      <!-- <button :class="num === currentpage? 'active': ''" v-for="num in showMaxNum" :key="num" @click="changeCurrentPage">{{num}}</button> -->
    </div>
    <div class="next">
      <button @click="changeCurrentPage">下一页</button>
    </div>
    <div class="last">
      <button @click="changeCurrentPage">末页</button>
    </div>
    <div class="jump-page">
      <input type="text" class="page-num" v-model="currentpage" />
    </div>
    <div style="margin-left:5px">
      <button @click="changeCurrentPage">跳转</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-pagination",
  props: {
    total: {
      default: 10,
      type: Number
    },
    currentpage: {
      default: 1,
      type: Number
    },
    showMaxNum: {
      default: 6,
      type: Number
    }
  },
  created () {
      this.showPages()
  },
  methods: {
    changeCurrentPage() {
      this.$emit("changeCurrentPage");
    },
    showPages () {
        this.$nextTick(() => {
            var html=''
            var page = this.currentpage
            for(var i=0; i<this.showMaxNum;i++) {
                html += '<button style="border:none;background:#fff;border:1px solid #ccc;margin:0 3px">'+ page++ +'</button>'
            }
            $('.pages').html(html)
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.my-pagiantion {
  font-size: 14px;
  display: flex;
  & > div {
    margin: 0 3px;
    button {
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
  }
  .jump-page {  
    .page-num {
      border: none;
      background: none;
      outline: 0;
      width: 30px;
      border: 1px solid #ccc;
      background: #fff;
      height: 17px;
      text-align: center;
    }
  }
  .pages {
    display: flex;
    button {
      border-radius: 2px;
      margin: 0 3px;
      outline: none;
    //   cursor: pointer;
      &.active {
          background: #21839B;
          color: #fff;
      }
    }
  }
}
</style>