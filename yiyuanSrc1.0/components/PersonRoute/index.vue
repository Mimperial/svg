<template>
    <div class="personRouteLeft">
        <div class="top">
            <div>
                <upLoad />
                <div class="hint">建议上传图片格式为png, 大小不超过2M</div>
                <el-form label-width="80px" :model="form">
                    <el-form-item label="楼层">
                        <el-select v-model="form.floor" placeholder="请选择楼层">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="员工名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="起始时间">
                        <el-date-picker
                            v-model="form.startTime"
                            type="datetime">
                        </el-date-picker>
                    </el-form-item>
                     <el-form-item label="终止时间">
                        <el-date-picker
                            v-model="form.endTime"
                            type="datetime">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <el-button class="search">搜索</el-button>
            </div>
        </div>
        <div class="bottom">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="time"
                    label="时间">
                </el-table-column>
                <el-table-column
                    prop="region"
                    label="区域">
                </el-table-column>
                <el-table-column
                    label="抓拍图">
                    <template slot-scope="scope">
                        <img :src="scope.row['imgUrl']" alt="">
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :pager-count="5"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="prev, pager, next"
            :total="100">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import UpLoad from '@/components/upload/index.vue'
export default {
    name: 'person-route-left',
    props: {
        form: {
            default: () => {
                return {
                    floor: '',
                    name: '',
                    startTime: '',
                    endTime: ''
                }
            }
        },
        floorData: {
            default: () => {
                return [
                    {
                        value: '1层'
                    },{
                        value: '2层'
                    },{
                        value: '3层'
                    },{
                        value: '4层'
                    },{
                        value: '5层'
                    }
                ]
            }
        },
        tableData: {
            default: () => {
                return [
                    {
                        time: '1',
                        region: '东北门',
                        imgUrl: require('../../assets/image/left.png')
                    },
                    {
                        time: '1',
                        region: '东北门',
                        imgUrl: require('../../assets/image/left.png')
                    },
                    {
                        time: '1',
                        region: '东北门',
                        imgUrl: require('../../assets/image/left.png')
                    },
                    {
                        time: '1',
                        region: '东北门',
                        imgUrl: require('../../assets/image/left.png')
                    },
                    {
                        time: '1',
                        region: '东北门',
                        imgUrl: require('../../assets/image/left.png')
                    }
                ]
            }
        }
    },
    data () {
        return {
            valueUrl: '',
            currentPage: 1
        }
    },
    components: {
        UpLoad
    },
    methods: {
        handleSizeChange () {

        },
        handleCurrentChange () {

        }
    }
}
</script>

<style lang="scss" scoped>
.personRouteLeft {
    height: 100%;
    width: 15%;
    background: #6388B0;
    border-radius: 10px;
    color: #fff;
    .top {
        padding: 20px 0 10px 0;
        margin: 0 10px;
        border-bottom: 1px dotted #ccc;
        .hint {
            margin: 10px 0;
            font-size: 14px;
            text-align: center;
        }
    }
    .upload {
        position: relative;
        margin:0 auto;
    }
    .search {
        width: 80px;
        height: 30px;
        padding: 0;
        margin-top: 5px;
        color: #6388B0;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    .bottom {
        padding: 10px 0;
        margin: 0 10px;
    }
}

</style>