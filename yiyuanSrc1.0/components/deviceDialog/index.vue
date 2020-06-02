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
                     <el-form-item label="IP地址">
                        <el-input v-model="formData.IP"></el-input>
                    </el-form-item>
                    <el-form-item label="设备名称">
                        <el-input v-model="formData.deviceName"></el-input>
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
                        <el-input v-model="formData.deviceDes"></el-input>
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
                </el-form>
            </div>
            <div class="option">
                <el-button type="primary" class="sure" @click="createUser">确定</el-button>
                <el-button class="cancel" @click="cancelCreate">取消</el-button>
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

<style lang="scss">
.device_dialog {
    position: fixed;
    top: 80px;
    right: 15px;
    bottom: 15px;
    left: 15px;
    background:#06141A;
    z-index: 999;
    .content {
        width: 700px;
        height: 600px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .header {
            height: 40px;
            line-height: 40px;
            position: relative;
            background:rgba(1,38,63,1);
            border-radius: 10px;
            font-size: 14px;
            margin-bottom: 10px;
            color: #5EBBDC;
            .title {
                margin-left: 20px;
            }
            .close {
                position: absolute;
                top: 0px;
                right: 20px;
                cursor: pointer;
                font-size: 20px;
            }
        }
        .con {
            background:#0A232D;
            border-radius: 10px;
            height: 450px;
            padding: 0 20px;
            box-sizing: border-box;
            position: relative;
            .el-form {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 75%;
                transform: translate(-50%, -50%);
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                .el-form-item {
                    height: 100%;
                    margin-bottom: 20px;
                    .el-form-item__content {
                        line-height: 30px !important;
                        margin-left: 0 !important;
                        .upload {
                        display: inline-block;
                        }
                        .hint {
                        display: inline-block;
                        color: #fff;
                        font-size: 12px;
                        }
                    }
                    .el-form-item__label {
                        line-height: 30px;
                        color: #fff;
                        float: none;
                        &::before {
                            content: '';
                            position: relative;
                            top: 5px;
                            right: 2px;
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            background: url('../../assets/image/before.png') no-repeat;
                        }
                    }
                    .el-radio {
                        color: #fff;
                        .el-radio__inner {
                            border: 1px solid #2BF2F4;
                            background: none;
                        }
                        .el-radio__input.is-checked+.el-radio__label {
                            color: #2BF2F4;
                        }
                    }
                    .el-radio-group {
                        width: 250px;
                    }
                    .el-input__inner {
                        border:1px solid rgba(43,242,244,1);
                        width: 250px;
                        height: 30px;
                        background: none;
                        border-radius: 0;
                        color: #fff;
                    }
                }
            }
        }
        .option {
            display: flex;
            justify-content: space-around;
            margin-top: 30px;
            .el-button {
                width: 80px;
                height: 30px;
                padding: 0;
                border-radius: 4px;
                color:#00F7FF;
                border:1px solid rgba(43,242,244,1);
                background: none;
            }
            .sure {
                color: #091525;
                background: #00F7FF;
            }
        }
        .test {
            position: absolute;
            left: 100%;
            padding: 0;
            height: 30px;
            width: 60px;
            margin-left: 10px;
            background:rgba(0,247,255,1);
            border-radius:4px;
            border: none;
            font-size: 14px;
            color: #091525;
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