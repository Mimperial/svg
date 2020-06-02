<template>
    <div class="floor">
        <div class="top">
            <div class="option">
              <el-button type="primary" @click="showFloorDialog('创建')">创建</el-button>
              <el-button type="primary" @click="exportExcel">导出</el-button>
            </div>
        </div>
        <div class="bottom">
          <el-table
            :data="floorList"
            :header-cell-style="{'background':'#fff','text-align':'center','color':'#000'}"
            :cell-style="{'text-align':'center'}"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="楼层">
            </el-table-column>
            <el-table-column
              label="平面图">
              <template slot-scope="scope">
                <span class="preview" @click="preview(scope.row.ichnography)">预览</span>
              </template>
            </el-table-column>
            <el-table-column
              label="立体图">
              <template slot-scope="scope">
                <span class="preview" @click="preview(scope.row.cubicChart)">预览</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createPerson"
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
                <span class="edit" @click="showFloorDialog('编辑',scope.row)"></span>
                <span class="remove" @click="deleteFloor(scope.row)"></span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <my-pagination></my-pagination> -->
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
        <floor-dialog :option="option" :visible.sync='visible' :formData="floorItem" @createFloor="createFloor"></floor-dialog>
        <img-dialog :src="previewUrl" :visible.sync="isShow"></img-dialog>
    </div>
</template>

<script>
import FloorDialog from '@/components/FloorDialog/index.vue'
import ImgDialog from '@/components/ImgDialog/index.vue'
import MyPagination from '@/components/MyPagination/index.vue'
import axios from 'axios'
import {getToken} from '@/utils/auth.js'
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
      total: 0,
      previewUrl: '',
      isShow: false
    }
  },
  components: {
    FloorDialog,
    ImgDialog,
    MyPagination
  },
  created () {
    this.getFloorList()
  },
  methods: {
    getFloorList () {
      this.$api.floor.floorList({
        page: this.currentPage,
        rows: this.pagesize
      }).then(res => {
        if (res.code === 200) {
          this.floorList = res.data.row
          this.total = res.data.total
        } else {
          this.floorList = []
          this.total = 0
        }
      })
    },
    createFloor (data, option) {
      data.name = data.name + 'F'
      var formData_request = new FormData();
      for(var key in data) {
        formData_request.append(key, data[key])
      }
      if (option == '创建') {
        this.$api.floor.addFloor(formData_request).then(res => {
          if (res.code === 200) {
            this.visible = false
            this.getFloorList()
            this.$message({
              type: 'success',
              message: '新建楼层成功!'
            })
          }
        })
      }
      if (option == '编辑') {
        this.$api.floor.editFloor(formData_request).then(res => {
          if (res.code === 200) {
            this.visible = false
            this.getFloorList()
            this.$message({
              type: 'success',
              message: '编辑楼层成功!'
            })
          }
        })
      }
      console.log(data)
    },
    deleteFloor (item) {
      this.$confirm('是否确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(item)
        this.$api.floor.deleteFloor({
          ids: item.floorId
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getFloorList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showFloorDialog (option, item) {
      this.option = option
      this.visible = true
      if (!item) {
        this.floorItem = {
          name: '',
          ichnography: '',
          cubicChart: '',
          username: sessionStorage.getItem('admin-user')
        }
      } else {
        this.floorItem = {
          name: item.name ? item.name.split('F')[0] : '',
          ichnography: item.ichnography,
          cubicChart: item.cubicChart,
          floorId: item.floorId
        }
      }
    },
    changeCurrent(currentPage) {
      this.currentPage = currentPage;
      this.getFloorList();
    },
    preview (imgUrl) {
      this.isShow = true
      this.previewUrl = imgUrl
    },
    exportExcel () {
      window.location.href='http://192.168.10.11:9100/resource/floor/export/excel'
      // this.$export({
      //   url: 'http://192.168.10.39:9100/resource/floor/export/excel',
      //   name: '楼层管理'
      // })
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
      width: 25px;
      height: 25px;
      border-radius:50% ;
      background-color: #2C6A85;
      background-image: url('../../../assets/image/edit.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 13px 13px;
    }
    .remove {
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius:50% ;
      background-color: #2C6A85;
      background-image: url('../../../assets/image/close.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 11px 11px;
      margin-left: 10px;  
    }
  }
}
</style>
