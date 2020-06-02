<template>
    <div class="algorithmManagementLeft">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="所在楼层">
                <el-select v-model="form.floor" placeholder="请选择">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备">
                <el-select v-model="form.device" placeholder="请选择">
                    <el-option label="摄像头1" value="摄像头1"></el-option>
                    <el-option label="摄像头2" value="摄像头2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="监控类型">
                <el-radio-group v-model="form.monitorType">
                    <el-radio label="人脸"></el-radio>
                    <el-radio label="头肩"></el-radio>
                    <el-radio label="骨骼"></el-radio>
                    <el-radio label="行为"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.task"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.param"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'algorithm-management',
    props: {
        form: {
            default: () => {
                return {
                    floor: '',
                    device: '',
                    monitorType: '',
                    task: '',
                    param: ''
                }
            },
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
.algorithmManagementLeft {
    width: 100%;
    padding: 20px 20px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    box-sizing: border-box;
}
</style>