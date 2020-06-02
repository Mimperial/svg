<template>
    <div class="alarm_box">
        <div class="item_alarm_box" v-for="(item, index) in alarmData" :key="index">
            <div class="left">
                <img :src="item[imgUrl]" alt="" />
            </div>
            <div class="right">
                <div class="alarm_type">
                    <span>报警类型</span>:
                    <span class="alarm-info">{{item[alarmType]}}</span>
                </div>
                <div class="alarm_place">
                    <span>报警地点</span>:
                    <span class="alarm-info">{{item[alarmPlace]}}</span>
                </div>
                <div class="alarm_time">
                    <span>报警时间</span>:
                    <span class="alarm-info">{{item[alarmTime]}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 实时报警模块组件
 * alarmData  接收渲染数据的数组 Array
 *    imgUrl: 图片字段
 *    alarmType: 报警类型字段
 *    alarmPlace: 报警地点字段
 *    alarmTime: 报警时间字段
 */
export default {
    name: 'alarm-box',
    props: {
        alarmData: {
            default: [],
            type: Array
        },
        imgUrl: {
            default: 'imgUrl',
            type: String
        },
        alarmType: {
            default: 'alarmType',
            type: String
        },
        alarmPlace: {
            default: 'alarmPlace',
            type: String
        },
        alarmTime: {
            default: 'alarmTime',
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
        background: #2B4E5E;
        // border: 1px solid #ccc;
        // width: 320px;
        height: 109px;
        margin: 16px 0;
        display: flex;
        
        &:last-child {
            margin-bottom: 0;
        }
        .left {
            width: 145px;
            height: 109px;
            img {
                width: 100%;
                height: 100%;;
            }
        }
        .right {
            font-size: 16px;
            line-height: 35px;
            flex: 1;
            margin-left: 10px;
            .alarm_type,.alarm_place,.alarm_time {
                display: flex;
            }
            .alarm-info{
                color:#fff;
                padding-left: 12px;
            }
        }
    }
    
}
</style>