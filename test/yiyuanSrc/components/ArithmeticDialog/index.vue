<template>
    <div class="arithmetic_dialog" v-if="visible">
        <div class="header">
            <div class="tabPage">
                <span @click="cancel">AI算法管理</span>
                <span>{{option}}</span>
            </div>
        </div>
        <div class="con">
            <div class="left">
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="所在楼层">
                        <el-select v-model="form.floorId" placeholder="请选择">
                            <el-option label="1层" value="1"></el-option>
                            <el-option label="2层" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="设备">
                         <el-select v-model="form.areaType" placeholder="请选择">
                            <el-option label="1层" value="1"></el-option>
                            <el-option label="2层" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="监控类型">
                        <el-radio-group v-model="form.floorImg">
                            <el-radio label="人脸"></el-radio>
                            <el-radio label="头肩"></el-radio>
                            <el-radio label="骨骼"></el-radio>
                            <el-radio label="行为"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="算法任务">
                        <el-input type="textarea" v-model="form.areaName"></el-input>
                    </el-form-item>
                    <el-form-item label="算法参数">
                        <el-input type="textarea" v-model="form.coordinatesX"></el-input>
                    </el-form-item>
                </el-form>
                <div class="option">
                    <el-button class="sure">确定</el-button>
                    <el-button class="cancel" @click="cancel">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'arithmetic-dialog',
    props: {
        visible: {
            default: false,
            type: Boolean
        },
        option: {
            default: '创建',
            type: String
        },
        form: {
            default: () => {
                return {
                    floorId: '',
                    areaType: '',
                    floorImg: '',
                    areaName: '',
                    coordinatesX: '',
                    coordinatesY: '',
                    coordinatesR: ''
                }
            }
        }
    },
    methods: {
        cancel () {
            this.$emit('update:visible', false)
        }
    }
}
</script>

<style lang="scss">
.arithmetic_dialog {
    position: fixed;
    top: 80px;
    right: 15px;
    bottom: 15px;
    left: 15px;
    background:#06141A;
    z-index: 999;
    display: flex;
    flex-direction: column;
    .header {
        height: 50px;
        position: relative;
        background:rgba(22,78,102,.25);
        font-size: 14px;
        color: #fff;
        padding: 10px 15px;
        box-sizing: border-box;
        .tabPage {
            font-size: 12px;
            border: 1px solid rgba(43,242,244,1);
            width: 130px;
            height: 28px;
            display: flex;
            border-radius: 2px;
            span {
                width: 50%;
                text-align: center;
                line-height: 28px;
                cursor: pointer;
                &:first-child {
                    border-right: 1px solid rgba(43,242,244,1);
                    background:rgba(2,66,82,1);
                }
            }
        }
    }
    .con {
        flex: 1;
        padding: 15px;
        box-sizing: border-box;
        position: relative;
        .left {
            width: 400px;
            height: 100%;
            border-radius: 10px;
            background:rgba(22,78,102,.25);
            margin-left: 50px;
            padding: 20px 30px;
            box-sizing: border-box;
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
            .addType {
                width:80px;
                height:30px;
                background:rgba(0,247,255,1);
                border-radius:4px;
                border:none;
                margin-left: 5px;
            }
            .unit {
                color: #fff;
                margin-left: 5px;
            }
            .el-form {
                .el-form-item {
                    height: 100%;
                    margin-bottom: 10px;
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
                        margin-right: 10px !important;
                        .el-radio__inner {
                            border: 1px solid #2BF2F4;
                            background: none;
                        }
                        .el-radio__label {
                            padding-left: 5px;
                        }
                        .el-radio__input.is-checked+.el-radio__label {
                            color: #2BF2F4;
                        }
                    }
                    .el-radio-group {
                        width: 250px;
                    }
                    .el-input {
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
                    .el-textarea {
                        .el-textarea__inner {
                            border-radius: 0;
                            border:1px solid rgba(43,242,244,1);
                            background: none;
                            height: 150px;
                        }
                    }
                }
            }
        }
        
    }
}
</style>
