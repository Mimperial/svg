<template>
  <div class="visit_record">
    <!-- 访客记录 -->
    <div class="top">
      <el-form :inline="true" :model="meeting" class="demo-form-inline">
        <el-form-item label="日期">
          <el-col :span="10">
            <el-date-picker
              v-model="meeting.startTime"
              type="datetime"
              value-format="timestamp"
              placeholder="选择开始日期时间"
              default-time="00:00:00"
            >
            </el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="meeting.endTime"
              type="datetime"
              value-format="timestamp"
              placeholder="选择结束日期时间"
              default-time="23:59:59"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button @click="getVisitoRecord()">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="option">
        <el-button class="export" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        ref="multipleTable"
        :data="tableData"
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
        <el-table-column prop="area" label="区域"></el-table-column>
        <el-table-column prop="time" label="抓拍时间"></el-table-column>
        <el-table-column prop="snapshotUrl" label="抓拍图">
          <template slot-scope="scope">
            <img
              :src="scope.row.snapshotUrl"
              alt=""
              width="68.5px"
              height="68px"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "visitorRecord",
  data() {
    return {
      meeting: {
        startTime: "",
        endTime: ""
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      pagesize: 20
    };
  },
  mounted() {},
  methods: {
    getVisitoRecord() {
      this.$api.visitorRecord
        .visitorRecord({
          page: this.currentPage,
          rows: this.pagesize,
          startTime: this.meeting.startTime,
          entTime: this.meeting.endTime
        })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data.row;
            this.total = res.data.total;
          } else if (res.code == 201) {
            this.tableData = [];
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
      this.currentPage = currentPage;
      this.getVisitoRecord();
    },
    exportExcel() {
      window.location.href =
        "http://192.168.10.39:9100/personnel/visitor/export/excel?startTime=" +
        this.meeting.startTime +
        "&entTime=" +
        this.meeting.endTime;
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
  }
}
</style>
