<template>
  <div class="visit_record">
    <!-- 体征数据 -->
    <div class="top">
      <el-form :inline="true" :model="signData" class="demo-form-inline">
        <el-form-item label="姓名/工号">
          <el-input
            placeholder="请输入内容"
            v-model="signData.workerId"
            clearable
            class="meeting-name"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="10">
            <el-date-picker
              v-model="signData.starTime"
              type="datetime"
              value-format="timestamp"
              placeholder="选择开始时间"
              default-time="00:00:00"
            >
            </el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="signData.endTime"
              type="datetime"
              value-format="timestamp"
              placeholder="选择结束时间"
              default-time="23:59:59"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button class="search" @click="getSignData()">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="option">
        <el-button class="export" @click="exportExcle()">导出</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        ref="multipleTable"
        :data="signTableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        :header-cell-style="{
          background: '#fff',
          'text-align': 'center',
          color: '#000'
        }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column type="selection" label="全选" width="55">
        </el-table-column>
        <el-table-column
          prop="workerId"
          label="工号"
          width="50px"
        ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column prop="position" label="岗位"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column
          prop="equipment"
          label="（运动）使用器材"
        ></el-table-column>
        <el-table-column
          prop="startTime"
          label="（运动）开始时间"
        ></el-table-column>
        <el-table-column
          prop="endTime"
          label="（运动）结束使用"
        ></el-table-column>
        <el-table-column prop="weight" label="体重（kg）"></el-table-column>
        <el-table-column prop="emotion" label="情绪"></el-table-column>
        <el-table-column prop="pimg" label="人员照片"></el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="lookIndividualData(scope.row.workerId)"
              type="text"
              size="small"
              ><i class="el-icon-search"></i
            ></el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "signRecord",
  data() {
    return {
      signData: {
        workerId: "",
        starTime: "",
        endTime: ""
      },
      signTableData: [],
      currentPage: 1,
      pageSize: 8,
      total: 1,
      options: [
        {
          value: "选项1",
          label: "黄金"
        }
      ],
      statusValue: "",
      individualDataVisibale: false,
      sporTime: "",
      neWeight: "",
      newMood: ""
    };
  },
  beforeUpdate() {},
  mounted() {},
  methods: {
    getSignData() {
      this.$api.bodySign
        .bodySignList({
          workerId: this.signData.workerId,
          startTime: this.signData.starTime,
          endTime: this.signData.endTime,
          page: this.currentPage,
          rows: this.pageSize
        })
        .then(res => {
          if (res.code == 200) {
            this.signTableData = res.data.row;
            this.total = res.data.total;
          } else if (res.code == 201) {
            this.signTableData = [];
            this.total = 0;
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "warning"
            });
          }
        });
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.currentPage = currentPage;
      this.getSignData();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getSignData();
    },
    exportExcle(){
      window.location.href =
        "http://192.168.10.11:9100/ai/skeletonRecognition/export/excel?workerId=" +
        this.signData.workerId +
        "&startTime=" +
        this.signData.starTime +
        "&endTime=" +
        this.signData.endTime;
    }
  }
};
</script>

<style lang="scss">
.visit_record {
  .top {
    .el-form-item__label {
      &::before {
        content: "";
        position: relative;
        top: 5px;
        right: 2px;
        display: inline-block;
        width: 16px;
        height: 16px;
        // background: url("../../../assets/image/before.png") no-repeat;
      }
    }
    .search{
      margin-left: -55px;
    }
  }
  
}
</style>
