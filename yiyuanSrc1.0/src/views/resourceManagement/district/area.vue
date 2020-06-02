<template>
    <div class="area">
        <div class="top">
          <el-form :inline="true" :model="area" class="demo-form-inline">
            <el-form-item label="所在楼层">
              <el-select v-model="area.floorId">
                <el-option v-for="(item, index) in floorSelect" :label="item.name" :value="item.value" :key="index"></el-option>
                <!-- <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="区域类型">
              <el-select v-model="area.areaType">
                <el-option v-for="(item, index) in areaTypeSelect" :label="item.name" :value="item.value" :key="index"></el-option>
                <!-- <el-option label="门禁" value="1"></el-option>
                <el-option label="会议室" value="2"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="区域名称">
              <el-input v-model="area.areaName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="searchArea">搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="option">
            <el-button type="primary" @click="showAreaDialog('创建')">创建</el-button>
            <el-button type="primary" @click="exportExcel">导出</el-button>
          </div>
        </div>
        <div class="bottom">
          <el-table
            :data="areaList"
            :header-cell-style="{'background':'#fff','text-align':'center','color':'#000'}"
            :cell-style="{'text-align':'center'}"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="fid"
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
            <!-- <el-table-column
              prop="coordinatesX"
              label="x值">
            </el-table-column>
            <el-table-column
              prop="coordinatesY"
              label="y值">
            </el-table-column> -->
            <!-- <el-table-column
              prop="floorId"
              label="r值">
            </el-table-column> -->
            <!-- <el-table-column
              prop="create_person"
              label="创建人">
            </el-table-column> -->
            <el-table-column
              prop="createTime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="option"
              label="操作">
              <template slot-scope="scope">
                <span class="edit" @click="showAreaDialog('编辑',scope.row)"></span>
                <span class="remove" @click="deleteArea(scope.row)"></span>
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
        <area-dialog v-if="visible" :visible.sync="visible" :option="option" :form="areaItem" @createArea="createArea"></area-dialog>
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
      area: {
        floorId: '',
        areaType: '',
        areaName: ''
      },
      option: '',
      visible: false,
      currentPage: 1,
      pagesize: 12,
      total: 0,
      floorSelect: [],
      areaTypeSelect: []
    }
  },
  components: {
    AreaDialog
  },
  created () {
    this.getAreaList()
    this.getFloorSelect()
    this.getAreaTypeSelect()
  },
  methods: {
    getFloorSelect () {
      this.$api.select.floor().then(res => {
        if (res.code === 200) {
          this.floorSelect = res.data
        }
      })
    },
    getAreaTypeSelect () {
      this.$api.select.areaType().then(res => {
        if (res.code === 200) {
          this.areaTypeSelect = res.data
        }
      })
    },
    getAreaList () {
      this.$api.area.areaList({
        page: this.currentPage,
        rows: this.pagesize,
        floor: this.area.floorId,
        areaType: this.area.areaType,
        areaName: this.area.areaName
      }).then(res => {
        if (res.code === 200) {
          this.areaList = res.data.row
          this.total = res.data.total
        } else {
          this.areaList = []
          this.total = 0
        }
      })
    },
    searchArea () {
      this.currentPage = 1
      this.getAreaList()
    },
    deleteArea (item) {
      this.$confirm('是否确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.area.deleteArea({
          ids: item.id
        }).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getAreaList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showAreaDialog (option, item) {
      this.option = option
      this.visible = true
      if (!item) {
        this.areaItem = {}
      } else {
        this.areaItem = {
          aid: item.id,
          floorId: item.fid,
          areaType: item.areaType,
          areaName: item.areaName,
          coordinatesX: item.coordinatesX,
          coordinatesY: item.coordinatesY
        }
      }
    },
    createArea (option, data) {
      if (option == '创建') {
        data.username = sessionStorage.getItem('admin-user')
        this.$api.area.addArea(data).then( res => {
          if (res.code === 200) {
            this.getAreaList()
            this.visible = false
            this.$message({
              type: 'success',
              message: '新建区域成功'
            })
          }
        })
      }
      if (option == '编辑') {
        this.$api.area.editArea(data).then( res => {
          if (res.code === 200) {
            this.getAreaList()
            this.visible = false
            this.$message({
              type: 'success',
              message: '编辑区域成功'
            })
          }
        })
      }
    },
    changeCurrent(currentPage) {
      this.currentPage = currentPage;
      this.getAreaList();
    },
    exportExcel () {
      window.location.href='http://192.168.10.11:9100/resource/area/export/excel?floor=' + this.area.floorId + '&areaType=' + this.area.areaType + '&areaName=' + this.area.areaName
      // this.$export({
      //   url: 'http://192.168.10.39:9100/resource/area/export/excel?floor=' + this.area.floorId + '&areaType=' + this.area.areaType + '&areaName=' + this.area.areaName,
      //   name: '区域管理'
      // })
    }
  }
}
</script>

<style lang="scss">
.area {
  // .top {
  //   .el-form-item__label {
  //       &::before {
  //           content: '';
  //           position: relative;
  //           top: 5px;
  //           right: 2px;
  //           display: inline-block;
  //           width: 16px;
  //           height: 16px;
  //           background: url('../../../assets/image/before.png') no-repeat;
  //       }
  //   }
  // }
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
