<template>
<div class="list-detail">
    <h1 type="text" @click="backList()">  {{ markeTitle }} </h1>
    <div class="btn-box">
        <van-button type="default" class="btn-item" @click="itemCapBtn('/search/shopInterV', '店招采集')">店招采集</van-button>
        <van-button type="default" class="btn-item" @click="itemCapBtn('/search/lienceCap', '许可证采集')">许可证采集</van-button>
        <van-button type="default" class="btn-item" @click="itemCapBtn('/search/counterCap', '柜台采集')">柜台采集</van-button>
        <van-button type="default" class="btn-item" @click="itemCapBtn('/search/experZone', '体验区采集')">体验区采集</van-button>
        <van-button type="default" class="btn-item" @click="itemCapBtn('/search/repertoryCap', '库存采集')">库存采集</van-button>
    </div>
</div>
    
</template>
<script>
export default {
    data(){
        return{
            markeTitle:"",
        }
    },
    mounted(){
        this.getRouteParam()
    },
    methods:{
        backList(){
            this.$router.push("/search/index");
            
        },
        getRouteParam(){
            this.markeTitle = this.$route.query.title
            this.storeId = this.$route.query.storeId
        },
        itemCapBtn(path, operateTitle){
            this.$router.push({path:path,query:{title:this.markeTitle,storeId: this.storeId, operateMarket:operateTitle}});
        },
    }
}
</script>
<style lang="stylus" scoped>
.list-detail{
    padding 30px 10px 
    h1{
        padding 10px
    }
    .btn-box{
        display flex
        flex-direction column
        padding 10px 
        .btn-item{
            margin 10px
            font-size 16px
        }
    }
}

</style>