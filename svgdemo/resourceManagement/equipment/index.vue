<template>
    <div class="equipment">
        <div class="top">
          <el-form :inline="true" :model="equipment" class="demo-form-inline">
            <el-form-item label="设备ID">
              <el-input v-model="equipment.deviceId"></el-input>
            </el-form-item>
            <el-form-item label="设备名称">
              <el-input v-model="equipment.deviceName"></el-input>
            </el-form-item>
            <el-form-item label="设备类型">
              <el-select v-model="equipment.equipType">
                <el-option label="枪机" value="1"></el-option>
                <el-option label="半球机" value="2"></el-option>
                <el-option label="球机" value="3"></el-option>
                <el-option label="监控相机" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button>搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="option">
            <el-button type="primary" @click="createEquipment">创建</el-button>
            <el-button type="primary">导出</el-button>
          </div>
        </div>
        <div class="bottom">
          <el-table
            :data="equipmentList"
            :header-cell-style="{'background':'rgba(1,38,63,1)','text-align':'center','color':'rgba(94,187,220,1)'}"
            :cell-style="{'text-align':'center'}"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="50">
            </el-table-column>
            <el-table-column
              prop="id"
              label="设备ID"
              width="80">
            </el-table-column>
            <el-table-column
              prop="name"
              label="设备名称">
            </el-table-column>
            <el-table-column
              prop="equipType"
              label="设备类型">
            </el-table-column>
            <el-table-column
              prop="equipUrl"
              label="设备流地址"
              width="310">
            </el-table-column>
            <el-table-column
              prop="equipIp"
              label="IP地址"
              width="120">
            </el-table-column>
            <el-table-column
              prop="area"
              label="监控区域">
            </el-table-column>
            <el-table-column
              prop="equipDiscription"
              label="设备描述">
            </el-table-column>
            <el-table-column
              prop="equipStatus"
              label="设备状态">
            </el-table-column>
            <el-table-column
              prop="creator"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="160">
            </el-table-column>
            <el-table-column
              prop="option"
              label="操作">
              <template slot-scope="scope">
                <span class="edit" @click="editEquipment(scope.row)"></span>
                <span class="remove" @click="deleteEquipment(scope.row)"></span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :total="20"
            >
          </el-pagination>
        </div>
        <device-dialog :visible.sync="visible" :option="option" ></device-dialog>
    </div>
</template>

<script>
import DeviceDialog from '@/components/deviceDialog/index.vue'
export default {
  name: 'equipment',
  data () {
    return {
      equipmentList: [],
      equipmentItem: {},
      equipment: {
        deviceId: '',
        deviceName: '',
        equipType: ''
      },
      visible: false,
      option: ''
    }
  },
  components: {
    DeviceDialog
  },
  created () {
    this.getEquipmentList()
  },
  methods: {
    getEquipmentList () {
      this.$http.get('/resource/device/findAll').then(res => {
        this.equipmentList = res.data
        console.log(this.equipmentList)
      })
    },
    editEquipment (item) {
      this.equipmentItem = item
      this.option = '编辑'
      this.visible = true
    },
    deleteEquipment (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    createEquipment () {
      this.equipmentItem = {}
      this.option = '创建'
      this.visible = true
    }
  }
}
</script>

<style lang="scss">
.equipment {
  .top {
    .el-form-item__label {
        &::before {
            content: '';
            position: relative;
            top: 5px;
            right: 2px;
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url('../../../assets/image/before.png') no-repeat;
        }
    }
  }
  .bottom {
    .edit {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('../../../assets/image/edit.png') no-repeat;    
    }
    .remove {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('../../../assets/image/close.png') no-repeat;
      margin-left: 10px;  
    }
  }
}
</style>
