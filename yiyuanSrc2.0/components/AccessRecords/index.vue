<template>
    <div class="access_box">
        <div class="item_access_box" v-for="(item, index) in datas" :key="index">
            <div class="top">
                <img :src="item[imgUrl]" alt="" />
            </div>
            <div class="bottom">
                <div class="alarm_type">
                    
                    <span>{{item[accessName]}}</span>&nbsp;<span>{{item[accessMood]}}</span>
                </div>
                <div class="alarm_place">
                    <span>识别位置</span>:
                    <span>{{item[accessPos]}}</span>
                </div>
                 <div class="alarm_time">
                    <span>识别时间</span>:
                    <span>{{item[accessTime]}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 通行记录模块组件
 * data: 展示数据
 *   imgUrl: 图片地址字段
 *   accessName: 人员姓名字段
 *   accessMood: 人员情绪字段 
 *   accessPos: 抓拍位置字段
 *   accessTime: 抓拍时间字段
 */
export default {
    name: 'access-records',
     props: {
        datas: {
            default: [],
            type: Array
        },
        imgUrl: {
            default: 'imgUrl',
            type: String
        },
        accessName: {
            default: 'accessName',
            type: String
        },
        accessMood: {
            default: 'accessMood',
            type: String
        },
        accessPos: {
            default: 'accessPos',
            type: String
        },
        accessTime: {
            default: 'accessTime',
            type: String
        }
    },
}
</script>

<style lang="scss" scoped>
.access_box {
    width: auto;
    height: auto;
    display: flex;
    justify-content: space-between;
    .item_access_box {
        background: #2B4E5E;
        width: 141px;
        height: 230px;
        padding: 8px;
        margin-right: 15px;
        &:last-child {
            margin-right: 0;
        }
        .top {
            margin: 0 auto;
            width: 124px;
            height: 125px;
            min-height: 120px;
            img {
                width: 100%;
                height: 100%;;
            }
        }
        .bottom {
            font-size: 14px;
            line-height: 25px;
            flex: 1;
            margin-top: 5px;
            &>div {
                display: flex;
                span:first-child {
                    width: 60px;
                    text-align: right;
                }
            }
            .alarm_type{
                font-size: 16px;
            }
        }
    }
}
</style>