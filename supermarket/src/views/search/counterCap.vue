<template>
<!-- 柜台采集 -->
  <div class="nine-photo">
    <div class="top">
      <h2>{{ operateTitle }}</h2>
      <p class="eg" @click="egImg"> 
          <van-icon name="warning-o" color="red" size="17" />  
           示例图片
    </p>
    <van-dialog v-model="show" :title='operateTitle + "示例图"' show-cancel-button>
        <img width="60%" src="../../assets/imgs/counter/before1.png" />
        <img width="60%" src="../../assets/imgs/counter/before2.png" />
        <img width="60%" src="../../assets/imgs/counter/after1.png" />
        <img width="60%" src="../../assets/imgs/counter/after2.png" />
        <img width="60%" src="../../assets/imgs/counter/cash1.png" />
        <img width="60%" src="../../assets/imgs/counter/cash2.png" />
      </van-dialog>
    </div>
    <div class="contetnt">
        <div>
            <h3>①前柜（9张）</h3>
            <van-uploader v-model="beforeArkList" multiple :max-count="9" />
        </div>
        <div>
            <h3>②背柜（9张）</h3>
            <van-uploader v-model="afterArkList" multiple :max-count="9" />
        </div>
        <div>
            <h3>③尊客柜台或收银台（1张）</h3>
            <van-uploader v-model="cashierDesk" multiple :max-count="1" />
        </div>

    </div>
    <van-button type="info" @click="uploadImg()" class="upload">确认上传</van-button>

  </div>
</template>
<script>
import { Notify } from 'vant';
import Vue from 'vue'
import { Dialog } from 'vant';
Vue.use(Dialog);
Vue.use(Notify);
export default {
    name:"CountPhoto",
  data() {
    return {
      operateTitle: "柜台采集",
      uploader: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }],
      beforeArkList: [],
      afterArkList: [],
      cashierDesk: [],
      show:false
    };
  },
  methods:{
      uploadImg(){
            Notify({ type: 'success', message: '上传成功' });
            this.$router.push({path:'/search/detail',query:{title:this.belongTo}});
        },
        egImg(){
          this.show = true
        }
  }
};
</script>
<style lang="stylus" scoped>
.nine-photo{
    padding 15px
    .top{
        display flex
        justify-content space-between
        .eg{
            display flex
            align-items center
            font-size 16px
        }
        .van-dialog{
              text-align center
              height 30em
              overflow scroll
            }
    }
    .contetnt{
        padding 10px
        position relative
        height 50em
        overflow auto
        h3{
            padding 10px 0
        }
        
    }
    .upload{
        width 90%
        height 40px
        border-radius 15px
        position fixed
        bottom:50px
        margin 0 auto
    }
    
}
</style>
