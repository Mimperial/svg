<template>
  <div class="visit_record">
    <!-- 骨骼识别 -->
    <div class="top">
      <el-form :inline="true" :model="skeletonRecoge" class="demo-form-inline">
        <el-form-item label="时间">
          <el-col :span="10">
            <el-date-picker
              v-model="skeletonRecoge.starTime"
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
              v-model="skeletonRecoge.endTime"
              type="datetime"
              value-format="timestamp"
              placeholder="选择结束时间"
              default-time="23:59:59"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="区域">
          <el-select
            v-model="skeletonRecoge.area"
            filterable
            placeholder="全部"
          >
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
          <el-button @click="getBoneLook()">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="option">
        <el-button class="export" @click="exportExcel()">导出</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        ref="multipleTable"
        :data="skeletonRecogeList"
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
        <el-table-column prop="url" label="视频">
          <template slot-scope="scope" v-show="scope.row.url == null">
            --
          </template>
          <template slot-scope="scope" v-show="scope.row.url !== null">
            <video
              :src="scope.row.url"
              controls="controls"
              autoplay="autoplay"
              width="119px"
              height="78px"
            ></video>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small"
              ><i class="el-icon-download"></i
            ></el-button>
          </template>
        </el-table-column>
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
  name: "meetingRecord",
  data() {
    return {
      input: "",
      skeletonRecogeList: [],
      currentPage: 1,
      pageSize: 10,
      total: 10,
      options: [
        {
          value: "选项1",
          label: "黄金"
        }
      ],
      time: "",
      statusValue: "",
      skeletonRecoge: {
        area: "",
        starTime: "",
        endTime: ""
      }
    };
  },
  mounted() {
    this.getBoneLook();
  },
  methods: {
    getBoneLook() {
      this.$api.skeletonRecognition
        .skeletonRecognitionList({
          areaId: this.skeletonRecoge.area,
          startTime: this.skeletonRecoge.starTime,
          endTime: this.skeletonRecoge.endTime,
          page: this.currentPage,
          rows: this.pageSize
        })
        .then(res => {
          if (res.code == 200) {
            this.skeletonRecogeList = res.data.row;
            this.total = res.data.total;
          } else if (res.code == 201) {
            this.skeletonRecogeList = [];
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
        "http://192.168.10.11:9100/ai/skeletonRecognition/export/excel?areaId=" +
        this.skeletonRecoge.area +
        "&startTime=" +
        this.skeletonRecoge.starTime +
        "&endTime=" +
        this.skeletonRecoge.endTime;
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
