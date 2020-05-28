<template>
    <div class="floor">
        <div class="top">
            <div class="option">
              <el-button type="primary" @click="createFloor">创建</el-button>
              <el-button type="primary">导出</el-button>
            </div>
        </div>
        <div class="bottom">
          <el-table
            :data="floorList"
            :header-cell-style="{'background':'#FAFAFA','text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="floorId"
              label="楼层">
            </el-table-column>
            <el-table-column
              label="平面图">
              <template slot-scope="scope">
                <span class="upload">上传</span>
                <span class="preview">预览</span>
              </template>
            </el-table-column>
            <el-table-column
              label="立体图">
              <template slot-scope="scope">
                <span class="upload">上传</span>
                <span class="preview">预览</span>
              </template>
            </el-table-column>
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
                <span class="edit" @click="editFloor(scope.row)">编辑</span>
                <span class="remove" @click="deleteFloor(scope.row)">删除</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :total="20"
            >
          </el-pagination>
          <floor-dialog :option="option" :visible.sync='visible' :formData="floorItem"></floor-dialog>
        </div>
    </div>
</template>

<script>
import FloorDialog from '@/components/FloorDialog/index.vue'
export default {
  name: 'floor',
  data () {
    return {
      floorList: [],
      option: '',
      visible: false,
      floorItem: {}
    }
  },
  components: {
    FloorDialog
  },
  created () {
    this.getFloorList()
  },
  methods: {
    getFloorList () {
      this.$http.get('/resource/floor/findAll').then(res => {
        console.log(res)
        this.floorList = res.data
        console.log(this.floorList)
      })
    },
    editFloor (item) {
      this.floorItem = item
      this.option = '编辑'
      this.visible = true
    },
    deleteFloor (item) {
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
    createFloor () {
      this.floorItem = {}
      this.option = '创建'
      this.visible = true
    }
  }
}
</script>

<style lang="scss">
.floor {
  flex: 1;
  padding: 20px;
  position: relative;
  .top {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
  }
  .bottom {
    margin-top: 10px;
  }
  .edit,.remove,.upload,.preview {
    color: #4976a7;
    margin-right: 10px;
    cursor: pointer;
  }
  .el-pagination {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
