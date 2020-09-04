<template>
<div class="list-detail">
    <div class="btn-box" >
        <van-button type="default" class="btn-item" @click="shopVCapBtn()">店招采集</van-button>
        <van-button type="default" class="btn-item" @click="licenceCapBtn()">许可证采集</van-button>
        <van-button type="default" class="btn-item" @click="counterCapBtn()">柜台采集</van-button>
        <van-button type="default" class="btn-item" @click="expZoneCapBtn()">体验区采集</van-button>
        <van-button type="default" class="btn-item" @click="storeCapBtn()">库存采集</van-button>
    </div>
</div>
    
</template>
<script>
import { Dialog } from 'vant';
export default {
    data(){
        return{
        }
    },
    mounted(){
    },
    methods:{
        shopVCapBtn(){
            Dialog.alert({
                title: '店招采集',
                message: `每家店铺采集一张包含店铺名称（牌匾）的整体图，<em style="color:red">建议白天拍摄，且需正面拍摄，并保证拍摄清晰</em>。如遇不可抗拒因素，比如店铺前有一棵树等障碍物，正面拍摄会存在遮挡，此时可以以一定的角度斜拍，但需保证拍摄清晰及完整。`,
                }).then(() => {
                // on close
            });
        },
        licenceCapBtn(){
            Dialog.alert({
                title: '许可证采集',
                message: `每家店铺采集一张烟草经营许可证，<em style="color:red">需正面拍摄，不可大角度倾斜，光照适中，不可过曝和过暗，并且保证拍摄清晰，许可证上的文字清晰可见。</em>`,
                }).then(() => {
                // on close
            });
        },
        counterCapBtn(){
            Dialog.alert({
                title: '柜台采集',
                message: `柜台采集主要包括前柜、背柜以及尊客柜台（或收银台）的采集，主要用于卷烟陈列识别、价签及爆炸贴识别、店面形象分析、尊客柜台分析以及POS机分析等。采集方式为：<em style="color:red">每家店铺各个柜台单独采集一张图像，如店铺中总共包含9个柜台，则需要采集9张。需要正面拍摄（有些前柜可能需要正面俯拍），拍摄距离适中，不可大角度倾斜，当前柜台图像不可涵盖其他柜台信息。其中收银台在拍摄中需要涵盖POS机。整体拍摄光照适中，不可过曝和过暗，保证拍摄清晰，<strong style="font-weight:600">卷烟规格清晰可见，POS机清晰可见，尊客标志及“泰山尊客”字眼清晰可见。</strong></em>`,
                }).then(() => {
                // on close
            });
        },
        expZoneCapBtn(){
            Dialog.alert({
                title: '体验区采集',
                message: `每家店铺（尊客店）采集一张体验区照片，<em style="color:red">正面拍摄，光照适中，不可过曝和过暗，保证拍摄清晰即可。</em>`,
                }).then(() => {
                // on close
            });
        },
        storeCapBtn(){
            Dialog.alert({
                title: '库存采集',
                message: `每家店铺各个库存柜或者各个库存单元需单独采集一张，<em style="color:red">正面拍摄，拍摄距离适中，不可大角度倾斜，光照适中，不可过曝和过暗，尽量防止反光，保证拍摄清晰，<strong style="font-weight:600">条烟规格清晰可见。</strong></em>`,
                }).then(() => {
                // on close
            });
        },
    }
}
</script>
<style lang="stylus" scoped>
.list-detail{
    padding 60px 10px 
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