<template>
  <div class="arithmetic">
    <div class="top">
      <el-form :inline="true" :model="arithmetic" class="demo-form-inline">
        <el-form-item label="设备ID">
          <el-input v-model="arithmetic.equipId"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="arithmetic.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchArithmetic">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="option">
        <el-button type="primary" @click="showArithmeticDialog('创建')">创建</el-button>
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        :data="arithmeticList"
        :header-cell-style="{'background':'#fff','text-align':'center','color':'#000'}"
        :cell-style="{'text-align':'center'}"
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="equipId" label="设备ID"></el-table-column>
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="equipType" label="设备类型"></el-table-column>
        <el-table-column prop="floor" label="所在楼层"></el-table-column>
        <el-table-column prop="area" label="监控区域"></el-table-column>
        <el-table-column prop="equipmentStatus" label="设备状态"></el-table-column>
        <el-table-column prop="algorithmTask" label="算法任务"></el-table-column>
        <el-table-column prop="algorithmParams" label="算法参数"></el-table-column>
        <el-table-column prop="option" label="操作">
          <template slot-scope="scope">
            <span class="line" @click="showArithmeticDialog('查看',scope.row)"></span>
            <span class="remove" @click="deleteArithmetic(scope.row)"></span>
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
      ></el-pagination>
    </div>
    <arithmetic-dialog
      v-if="visible"
      :visible.sync="visible"
      :option="option"
      :form="arithmeticItem"
      @createArithmetic="createArithmetic"
    ></arithmetic-dialog>
  </div>
</template>

<script>
import ArithmeticDialog from "@/components/ArithmeticDialog/index.vue";
export default {
  name: "arithmetic",
  data() {
    return {
      arithmeticList: [],
      arithmeticItem: {},
      arithmetic: {
        equipId: "",
        name: ""
      },
      visible: false,
      option: "创建",
      currentPage: 1,
      pagesize: 12,
      total: 0,
      areaArr: [
        {
          algorithmAreaLeft: "",
          algorithmAreaRight: "",
          algorithmAreaTop: "",
          algorithmAreaBottom: ""
        }
      ]
    };
  },
  components: {
    ArithmeticDialog
  },
  created() {
    this.getArithmeticList();
  },
  methods: {
    getArithmeticList() {
      this.$api.arithmetic
        .arithmeticList({
          page: this.currentPage,
          rows: this.pagesize,
          equipId: this.arithmetic.equipId,
          name: this.arithmetic.name
        })
        .then(res => {
          if (res.code == 200) {
            this.arithmeticList = res.data.row;
            this.total = res.data.total;
          } else {
            this.arithmeticList = [];
            this.total = 0;
          }
        });
    },
    searchArithmetic() {
      this.currentPage = 1;
      this.getArithmeticList();
    },
    showArithmeticDialog(option, item) {
      this.option = option;
      this.visible = true;
      if (!item) {
        // 查看
        this.arithmeticItem = {
          equipmentId: "",
          algorithmTypeIds: "",
          equipmentScenePic: "",
          algorithmParam: ""
        };
      } else {
        this.arithmeticItem = {
          // taskId: item.id,
          // floor: item.floor,
          equipmentId: item.equipId,
          algorithmTypeIds: item.aiType,
          equipmentScenePic: item.algorithmTask,
          algorithmParam: item.algorithmParams,
          username: sessionStorage.getItem('admin-user'),
          rjAlgorithmTaskDetails: {
            algorithmAreaLeft: '',
            algorithmAreaTop: '',
            algorithmAreaRight: '',
            algorithmAreaBottom: '',
            algorithmId: 1
          }
        };
      }
    },
    createArithmetic (option, data) {
      // data.username = sessionStorage.getItem('admin-user')
      this.$api.arithmetic.addArithmetic(data).then( res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '创建算法成功'
          })
          this.visible = false
          this.getArithmeticList()
        }
      })
    },
    deleteArithmetic(item) {
      this.$confirm("是否确认删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.arithmetic
            .deleteArithmetic({
              ids: item.id
            })
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getArithmeticList();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    looLine(item) {},
    changeCurrent(currentPage) {
      this.currentPage = currentPage;
      this.getArithmeticList();
    },
    exportExcel() {
      window.location.href =
        "http://192.168.10.11:9100/resource/algorithm/export/excel?equipId=" +
        this.arithmetic.equipId +
        "&name=" +
        this.arithmetic.name;
      // this.$export({
      //   url:"http://192.168.10.39:9100/resource/algorithm/export/excel?equipId=" + this.arithmetic.equipId + '&name=' + this.arithmetic.name,
      //   name: 'AI算法管理'
      // })
    }
  }
};
</script>

<style lang="scss">
.arithmetic {
  // .top {
  //   .el-form-item__label {
  //     &::before {
  //       content: "";
  //       position: relative;
  //       top: 5px;
  //       right: 2px;
  //       display: inline-block;
  //       width: 16px;
  //       height: 16px;
  //       background: url("../../../assets/image/before.png") no-repeat;
  //     }
  //   }
  // }
  .bottom {
    .line {
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius:50% ;
      background-color: #2C6A85;
      background-image: url('../../../assets/image/look.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 14px 14px;
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

