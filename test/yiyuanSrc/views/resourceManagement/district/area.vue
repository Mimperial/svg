<template>
    <div class="area">
        <div class="top">
          <el-form :inline="true" :model="floor" class="demo-form-inline">
            <el-form-item label="所在楼层">
              <el-select v-model="floor.floorId">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区域类型">
              <el-select v-model="floor.areaType">
                <el-option label="门禁" value="1"></el-option>
                <el-option label="会议室" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区域名称">
              <el-input v-model="floor.areaName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button>搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="option">
            <el-button type="primary" @click="createArea">创建</el-button>
            <el-button type="primary">导出</el-button>
          </div>
        </div>
        <div class="bottom">
          <el-table
            :data="areaList"
            :header-cell-style="{'background':'rgba(1,38,63,1)','text-align':'center','color':'rgba(94,187,220,1)'}"
            :cell-style="{'text-align':'center'}"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="floorId"
              label="所在楼层">
            </el-table-column>
            <el-table-column
              prop="areaType"
              label="区域类型">
            </el-table-column>
            <!-- <el-table-column
              prop="floorId"
              label="业务类型">
            </el-table-column> -->
            <el-table-column
              prop="areaName"
              label="区域名称">
            </el-table-column>
            <el-table-column
              prop="coordinatesX"
              label="x值">
            </el-table-column>
            <el-table-column
              prop="coordinatesY"
              label="y值">
            </el-table-column>
            <!-- <el-table-column
              prop="floorId"
              label="r值">
            </el-table-column> -->
            <el-table-column
              prop="creator"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="option"
              label="操作">
              <template slot-scope="scope">
                <span class="edit" @click="editArea(scope.row)"></span>
                <span class="remove" @click="deleteArea(scope.row)"></span>
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
        <area-dialog :visible.sync="visible" :option="option"></area-dialog>
    </div>
</template>

<script>
import AreaDialog from '@/components/AreaDialog/index.vue'
export default {
  name: 'areas',
  data () {
    return {
      areaList: [],
      areaItem: {},
      floor: {
        floorId: '',
        areaType: '',
        areaName: ''
      },
      option: '',
      visible: false
    }
  },
  components: {
    AreaDialog
  },
  created () {
    this.getAreaList()
  },
  methods: {
    getAreaList () {
      this.$http.get('/resource/area/findAll').then(res => {
        this.areaList = res.data
        console.log(this.areaList)
      })
    },
    editArea (item) {
      this.areaItem = item
      this.option = '编辑'
      this.visible = true
    },
    deleteArea (item) {
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
    createArea () {
      this.areaItem = {}
      this.option = '创建'
      this.visible = true
    }
  }
}
</script>

<style lang="scss">
.area {
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
