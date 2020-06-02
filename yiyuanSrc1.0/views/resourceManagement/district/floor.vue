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
                <span class="edit" @click="editFloor(scope.row)"></span>
                <span class="remove" @click="deleteFloor(scope.row)"></span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="total"
            :current-page="currentPage"
            :page-size="pagesize"
            @current-change="changeCurrent"
            >
          </el-pagination>
        </div>
        <floor-dialog :option="option" :visible.sync='visible' :formData="floorItem"></floor-dialog>
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
      floorItem: {},
      currentPage: 1,
      pagesize: 12,
      total: 0
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
      this.$http.post('/resource/floor/findAll', {
        page: this.currentPage,
        rows: this.pagesize
      }).then(res => {
        this.floorList = res.data.data.row
        this.total = res.data.data.total
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
    },
    changeCurrent(currentPage) {
      this.currentPage = currentPage;
      this.getFloorList();
    }
  }
}
</script>

<style lang="scss">
.floor {
  .top {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end !important;
    height: 50px;
    background: rgba(22,78,102,.25);
    padding: 10px 20px;
    box-sizing: border-box;
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
