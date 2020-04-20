<template>
    <div class="alarm_box">
        <div class="item_alarm_box" v-for="(item, index) in data" :key="index">
            <div class="left">
                <img :src="item[imgUrl]" alt="" />
            </div>
            <div class="right">
                <div class="alarm_type">
                    <span>报警类型</span>:
                    <span>{{item[alarmType]}}</span>
                </div>
                <div class="alarm_place">
                    <span>报警地点</span>:
                    <span>{{item[alarmPlace]}}</span>
                </div>
                <div class="alarm_time">
                    <span>报警时间</span>:
                    <span>{{item[alarmTime]}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 实时报警模块组件
 * data  接收渲染数据的数组 Array
 *    imgUrl: 图片字段
 *    alarmType: 报警类型字段
 *    alarmPlace: 报警地点字段
 *    alarmTime: 报警时间字段
 */
export default {
    name: 'alarm-box',
    props: {
        data: {
            default: [],
            type: Array
        },
        imgUrl: {
            default: '',
            type: String
        },
        alarmType: {
            default: '',
            type: String
        },
        alarmPlace: {
            default: '',
            type: String
        },
        alarmTime: {
            default: '',
            type: String
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.alarm_box {
    width: auto;
    height: auto;
    .item_alarm_box {
        background: #eee;
        border: 1px solid #ccc;
        width: 320px;
        height: 130px;
        padding: 10px;
        display: flex;
        margin-bottom: 15px;
        &:last-child {
            margin-bottom: 0;
        }
        .left {
            width: 165px;
            height: 130px;
            min-height: 120px;
            img {
                width: 100%;
                height: 100%;;
            }
        }
        .right {
            font-size: 14px;
            line-height: 25px;
            flex: 1;
            margin-left: 10px;
            .alarm_type,.alarm_place,.alarm_time {
                display: flex;
            }
        }
    }
    
}
</style>