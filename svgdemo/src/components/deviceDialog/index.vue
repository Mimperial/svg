<template>
    <div class="device_dialog" v-if="visible">
        <div class="content">
            <div class="header">
                <div class="title">
                    {{option}}
                </div>
                <span class="close" @click="cancelCreate">×</span>
            </div>
            <div class="con">
                <el-form ref="form" :model="formData" label-width="90px">
                    <el-form-item label="设备ID">
                        <el-input v-model="formData.deviceId"></el-input>
                    </el-form-item>
                    <el-form-item label="设备名称">
                        <el-input v-model="formData.deviceName"></el-input>
                    </el-form-item>
                     <el-form-item label="设备类型">
                        <el-radio-group v-model="formData.deviceType">
                            <el-radio label="枪机"></el-radio>
                            <el-radio label="半球机"></el-radio>
                            <el-radio label="人脸识别相机"></el-radio>
                            <el-radio label="球机"></el-radio>
                            <el-radio label="监控相机"></el-radio>
                            <el-radio label="安防相机"></el-radio>
                            <el-radio label="人脸识别设备"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                     <el-form-item label="设备流地址">
                        <el-input v-model="formData.deviceAddress"></el-input>
                        <el-button class="test" type="primary" @click="createUser">测试</el-button>
                    </el-form-item>
                     <el-form-item label="IP地址">
                        <el-input v-model="formData.IP"></el-input>
                    </el-form-item>
                    <el-form-item label="所在楼层">
                        <el-select v-model="formData.floor" placeholder="请选择">
                            <el-option label="管理员" value="管理员"></el-option>
                            <el-option label="普通用户" value="普通用户"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="监控区域">
                        <el-select v-model="formData.monitorArea" placeholder="请选择">
                            <el-option label="管理员" value="管理员"></el-option>
                            <el-option label="普通用户" value="普通用户"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备描述">
                        <el-input type="textarea" v-model="formData.deviceDes"></el-input>
                    </el-form-item>
                </el-form>
                <div class="option">
                    <el-button type="primary" class="sure" @click="createUser">确定</el-button>
                    <el-button class="cancel" @click="cancelCreate">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 创建或编辑设备
 * 1.option：弹框类型  编辑/创建 默认: 创建
 * 2.form: 用户信息 编辑是需要传 用于回显
 * 3.visible: 弹框是否显示  true/false
 * 4.deviceId  设备id 字段
 * 5.deviceName 设备名称 字段
 * 6.deviceType 设备类型 字段
 * 7.deviceAddress 设备流地址 字段
 * 8.IP IP地址 字段
 * 9.monitorArea 监控区域 字段
 * 10.deviceDes 设备描述 字段
 */
export default {
    name: 'user-dialog',
    props: {
        option: {
            default: '创建',
            type: String
        },
        formData: {
            default: () => {
                return  {
                    deviceId: '',
                    deviceName: '',
                    deviceType: '',
                    deviceAddress: '',
                    IP: '',
                    floor: '',
                    monitorArea: '',
                    deviceDes: ''
                }
            },
            type: Object
        },
        visible: {
            default: false,
            type: Boolean
        },
        deviceId: {
            default: 'deviceId',
            type: String
        },
        deviceName: {
            default: 'deviceName',
            type: String
        },
        deviceType: {
            default: 'deviceType',
            type: String
        },
        deviceAddress: {
            default: 'deviceAddress',
            type: String
        },
        IP: {
            default: 'IP',
            type: String
        },
        floor: {
            default:'floor',
            type: String
        },
        monitorArea: {
            default: 'monitorArea',
            type: String
        },
        deviceDes: {
            default: 'deviceDes',
            type: String
        }
    },
    methods: {
        createUser () {
            this.$emit('update:visible', false)
        },
        cancelCreate () {
            this.$emit('update:formData', {
                name: '',
                pwd: '',
                userType: ''
            })
            this.$emit('update:visible', false)
        }
    }
}
</script>

<style lang="scss" scoped>
.device_dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.4);
    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30%;
        height: 60%;
        background: #fff;
        border: 1px solid #4976A7;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .header {
            height: 40px;
            line-height: 40px;
            position: relative;
            background: #4976A7;
            color: #fff;
            font-size: 14px;
            .title {
                position: absolute;
                left: 50%;
                transform: translateX( -50%);
            }
            .close {
                position: absolute;
                right: 15px;
                cursor: pointer;
                font-size: 24px;
            }
        }
        .con {
            position: relative;
            left: 50%;
            top: 45%;
            width: 65%;
            transform: translate(-58%, -50%);
        }
        .option {
            display: flex;
            justify-content: center;
            margin-top: 30px;
            .el-button {
                margin-left: 25px;
            }
        }
        .test {
            position: absolute;
            left: 100%;
            padding: 0;
            height: 30px;
            width: 50px;
            top: 5px;
            margin-left: 10px;
            background: #4976A7;
            border: none;
            font-size: 14px;
        }
        .sure {
            width: 60px;
            height: 30px;
            padding: 0;
            background: #4976A7;
            border: none;
            font-size: 14px;
        }
        .cancel {
            width: 60px;
            height: 30px;
            padding: 0;
        }
    }
}
</style>