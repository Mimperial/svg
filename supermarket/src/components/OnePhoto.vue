<template>
  <div class="one-photo">
    <div class="top">
      <h2>{{ operateTitle }}</h2>
      <p class="eg" @click="egImg"> 
          <van-icon name="warning-o" color="red" size="17" />  
           示例图片
      </p>
      <van-dialog v-model="show" :title='operateTitle + "示例图"' show-cancel-button>
        <img width="60%" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        <img width="60%" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
      </van-dialog>
    </div>
    <!-- 上传图片 -->
    <div>
      <van-uploader :after-read="afterRead" v-model="uploader" multiple :max-count="1" @click="lookBigImg" />
    </div>
    

  </div>
</template>
<script>
import Vue from 'vue'
import { Notify } from 'vant';
import { ImagePreview } from 'vant';
import { Dialog } from 'vant';
import axios from "axios";
Vue.use(Notify);
Vue.use(Dialog);
Vue.use(ImagePreview);
export default {
    name:"OnePhoto",
    props:{
      belongTo:{
        default:"店铺名",
        type:String,
      },
      storeId:{
        default:"1",
        type:String,
      },
      userId:{
        default:"001",
        type:String,
      }
    },
    data() {
        return {
        operateTitle: "",
        uploader: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }],
        successIcon: "",
        show: false,
        };
    },
    mounted(){
      console.log(this.$route.query.operateMarket)
        this.operateTitle = this.$route.query.operateMarket
        this.belongTo = this.$route.query.title
    },
    methods:{
        
        lookBigImg(){
            ImagePreview([
            'https://img.yzcdn.cn/vant/apple-1.jpg',
         ]);
        },
        egImg(){
          this.show = true
        },
        afterRead(file) {
          // 此时可以自行将文件上传至服务器
          console.log(file.file);
          let _this = this;
          var formData = new FormData();
          formData.append("userId", _this.userId);
          formData.append("storeId", _this.storeId);
          formData.append("storeFrontFile", file.file);
          console.log(formData.get("storeFrontFile"))
            axios
              .post("/collect/uploadStoreFrontInfo", formData)
              .then(function(response) {
                console.log("店铺搜索");
                console.log(response);
                if(response.data.code == 0){
                  Notify({ type: 'success', message: '上传成功' });
                  this.$router.push({path:'/search/detail',query:{title:this.belongTo}});
                }else{
                  console.log(response.data.msg)
                  Notify({ type: 'warning', message: response.data.msg });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
        },
    }
};
</script>
<style lang="stylus" scoped>
.one-photo{
    padding 20px 10px
    .top{
        display flex
        justify-content space-between
        padding 10px 0
        .eg{
            display flex
            align-items center
            font-size 16px
        }
        .van-dialog{
              text-align center
            }
    }
    .upload{
        float right
        
    }
}
</style>
