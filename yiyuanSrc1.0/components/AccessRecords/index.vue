<template>
    <div class="access_box">
        <div class="item_access_box" v-for="(item, index) in data" :key="index">
            <div class="top">
                <img :src="item[imgUrl]" alt="" />
            </div>
            <div class="bottom">
                <div class="alarm_type">
                    <span>姓名</span>:
                    <span>{{item[accessName]}}</span>
                </div>
                <div class="alarm_place">
                    <span>情绪</span>:
                    <span>{{item[accessMood]}}</span>
                </div>
                <div class="alarm_time">
                    <span>识别位置</span>:
                    <span>{{item[accessPos]}}</span>
                </div>
                 <div class="alarm_time">
                    <span>识别时间</span>:
                    <span>{{item[acessTime]}}</span>
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
        data: {
            default: [],
            type: Array
        },
        imgUrl: {
            default: '',
            type: String
        },
        accessName: {
            default: '',
            type: String
        },
        accessMood: {
            default: '',
            type: String
        },
        accessPos: {
            default: '',
            type: String
        },
        acessTime: {
            default: '',
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
    .item_access_box {
        background: #eee;
        border: 1px solid #ccc;
        width: 150px;
        height: 220px;
        padding: 10px;
        margin-right: 15px;
        &:last-child {
            margin-right: 0;
        }
        .top {
            margin: 0 auto;
            width: 120px;
            height: 120px;
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
        }
    }
}
</style>