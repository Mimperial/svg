<template>
  <div class="visit_record">
    <!-- 人群密度 -->
    <div class="top">
      <el-form :inline="true" :model="crowdDensity" class="demo-form-inline">
        <el-form-item label="时间">
          <el-col :span="10">
            <el-date-picker
              v-model="crowdDensity.starTime"
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
              v-model="crowdDensity.endTime"
              type="datetime"
              value-format="timestamp"
              placeholder="选择结束时间"
              default-time="23:59:59"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="crowdDensity.area" filterable placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="crowdDensity.type" filterable placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getCrowdDensity()">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="option">
        <el-button class="export" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        ref="multipleTable"
        :data="crowdDensityTableData"
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
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="area" label="区域"></el-table-column>
        <el-table-column prop="count" label="人数"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
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
  name: "meetingRecord",
  data() {
    return {
      input: "",
      crowdDensityTableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 1,
      options: [
        {
          value: "选项1",
          label: "黄金"
        }
      ],
      time: "",
      statusValue: "",
      crowdDensity: {
        area: "",
        starTime: "",
        endTime: "",
        type: ""
      }
    };
  },
  mounted() {},
  methods: {
    getCrowdDensity() {
      this.$api.crowdDensity
        .crowdDensityList({
          areaId: this.crowdDensity.area,
          startTime: this.crowdDensity.starTime,
          endTime: this.crowdDensity.endTime,
          page: this.currentPage,
          rows: this.pageSize
        })
        .then(res => {
          if (res.code == 200) {
            this.crowdDensityTableData = res.data.row;
            this.total = res.data.total;
          } else if (res.code == 201) {
            this.crowdDensityTableData = [];
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
      this.getCrowdDensity();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getCrowdDensity();
    },
    // 导出
    exportExcel() {
      window.location.href =
        "http://192.168.10.11:9100/ai/crowdDensity/export/excel?areaId=" +
        this.crowdDensity.area +
        "&startTime=" +
        this.crowdDensity.starTime +
        "&endTime=" +
        this.crowdDensity.endTime;
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
        // background: url('../../../assets/image/before.png') no-repeat;
      }
    }
  }
}
</style>
