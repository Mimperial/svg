<template>
    <div class="arithmetic">
        <div class="top">
          <el-form :inline="true" :model="arithmetic" class="demo-form-inline">
            <el-form-item label="设备ID">
              <el-input v-model="arithmetic.deviceId"></el-input>
            </el-form-item>
            <el-form-item label="设备名称">
              <el-input v-model="arithmetic.deviceName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button>搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="option">
            <el-button type="primary">导出</el-button>
          </div>
        </div>
        <div class="bottom">
          <el-table
            :data="arithmeticList"
            :header-cell-style="{'background':'rgba(1,38,63,1)','text-align':'center','color':'rgba(94,187,220,1)'}"
            :cell-style="{'text-align':'center'}"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="equipId"
              label="设备ID">
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
              prop="floor"
              label="所在楼层">
            </el-table-column>
            <el-table-column
              prop="area"
              label="监控区域">
            </el-table-column>
            <el-table-column
              prop="algorithmStatus"
              label="设备状态">
            </el-table-column>
            <el-table-column
              prop="algorithmTask"
              label="算法任务">
            </el-table-column>
            <el-table-column
              prop="algorithmParams"
              label="算法参数">
            </el-table-column>
            <el-table-column
              prop="option"
              label="操作">
              <template slot-scope="scope">
                <!-- <span class="line" @click="looLine(scope.row)">查看划线</span> -->
                <span class="edit" @click="editArithmetic(scope.row)"></span>
                <span class="remove" @click="deleteArithmetic(scope.row)"></span>
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
        <arithmetic-dialog :visible.sync="visible" :option="option"></arithmetic-dialog>
    </div>
</template>

<script>
import ArithmeticDialog from '@/components/ArithmeticDialog/index.vue'
export default {
  name: 'arithmetic',
  data () {
    return {
      arithmeticList: [],
      arithmeticItem: {},
      arithmetic: {
        deviceId: '',
        deviceName: '',
        equipType: ''
      },
      visible: false,
      option: '创建'
    }
  },
  components: {
    ArithmeticDialog
  },
  created () {
    this.getArithmeticList()
  },
  methods: {
    getArithmeticList () {
      this.$http.get('/resource/algorithm/findAll').then(res => {
        this.arithmeticList = res.data
        console.log(this.arithmeticList)
      })
    },
    editArithmetic (item) {
      this.arithmeticItem = item
      this.option = '编辑'
      this.visible = true
    },
    deleteArithmetic (item) {
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
    looLine (item) {

    }
  }
}
</script>

<style lang="scss">
.arithmetic {
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

