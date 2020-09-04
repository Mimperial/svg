<template>
    <div class="shop-inter">
        <!-- 店招采集 -->
        <h1>  {{ markeTitle }} </h1>
        <!-- <OnePhoto :belongTo="markeTitle" :userId ="userId" :storeId="storeId"></OnePhoto> -->
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
import { Dialog } from 'vant';
import { ImagePreview } from 'vant';
import axios from "axios";
Vue.use(Notify);
Vue.use(Dialog);
Vue.use(ImagePreview);
export default {
    data(){
        return{
            markeTitle:"",
            operateTitle:"店招采集",
            userId: 1,
            storeId:1,
            oldArrImg:"",
            newImgFile:"",
            show:false,
            uploader: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }],//已上传图片
        }
    },
    components:{
        // 'OnePhoto': ()=>import('../../components/OnePhoto')
    },
    beforeCreate(){
        
    },
    mounted(){
        this.backList()
        let userIdLocal = window.localStorage.getItem('userId')
        this.userId = userIdLocal
        this.storeId = this.$route.query.storeId
        if(this.userId && this.storeId){
            this.lookMyCap()
        }
    },
    methods:{
        backList(){
            this.markeTitle = this.$route.query.title
        },
        afterRead(file) {
          // 此时可以自行将文件上传至服务器
          console.log(file.file);
        //   let _this = this;
          let formData = new FormData();
          formData.append("userId", this.userId);
          formData.append("storeId", this.storeId);
          formData.append("storeFrontFile", file.file);
          console.log(formData.get("storeFrontFile"))
            axios
              .post("/collect/uploadStoreFrontInfo", formData)
              .then(function(response) {
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
        lookMyCap(){
            let _this = this;
            let formDataMy = new FormData();
          formDataMy.append("userId", this.userId);
          formDataMy.append("storeId", this.storeId);
        //   formDataMy.append("existStoreFrontInfo", []);
        //   formDataMy.append("modifyStoreFrontFile", '');
            axios
                .post("/check/modifyStorefrontInfo", formDataMy)
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
        lookBigImg(){
            ImagePreview([
            'https://img.yzcdn.cn/vant/apple-1.jpg',
         ]);
        },
        egImg(){
          this.show = true
        },
    }
}
</script>
<style lang="stylus" scoped>
.shop-inter{
    padding 15px
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