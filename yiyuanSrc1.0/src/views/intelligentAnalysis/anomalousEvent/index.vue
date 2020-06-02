<template>
  <div class="visit_record">
    <!-- 异常事件 -->
    <div class="top">
      <el-form :inline="true" :model="anomalousEvent" class="demo-form-inline">
        <el-form-item label="时间">
          <el-col :span="10">
            <el-date-picker
              v-model="anomalousEvent.starTime"
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
              v-model="anomalousEvent.endTime"
              type="datetime"
              value-format="timestamp"
              placeholder="选择结束时间"
              default-time="23:59:59"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label=""> </el-form-item>
        <el-form-item label="区域">
          <el-select
            v-model="anomalousEvent.area"
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
        <el-form-item label="类型">
          <el-select
            v-model="anomalousEvent.type"
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
          <el-button @click="getabnormalEvents()">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="option">
        <el-button class="export" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        ref="multipleTable"
        :data="anomalousEvenTableData"
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
        <el-table-column prop="area" label="报警区域"></el-table-column>
        <el-table-column prop="alarmTime" label="报警时间"></el-table-column>
        <el-table-column prop="alarmIndex" label="报警类型"></el-table-column>
        <el-table-column prop="alarmUrl" label="报警图片">
          <template slot-scope="scope" v-show="scope.row.alarmUrl == null">
            --
          </template>
          <template slot-scope="scope" v-show="scope.row.alarmUrl !== null">
            <img
              :src="scope.row.alarmUrl"
              alt=""
              width="78px"
              height="77.5px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="alarmMv" label="视频播放">
          <template slot-scope="scope" v-show="scope.row.alarmMv == null">
            --
          </template>
          <template slot-scope="scope" v-show="scope.row.alarmMv !== null">
            <video
              :src="scope.row.alarmMv"
              controls="controls"
              autoplay="autoplay"
              width="119px"
              height="78px"
            ></video>
            <!-- <LivePlayer :videoUrl="scope.row.alarmMv" fluent autoplay live stretch width="119px" height="78px"></LivePlayer>     -->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a
              :href="scope.row.alarmMv"
              ><i class="el-icon-download"></i
            ></a>
          </template>
        </el-table-column>
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
import LivePlayer from "@liveqing/liveplayer";
export default {
  name: "meetingRecord",
  data() {
    return {
      input: "",
      anomalousEvenTableData: [],
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
      anomalousEvent: {
        area: "",
        starTime: "",
        endTime: "",
        type: ""
      }
    };
  },
  components: {
    LivePlayer
  },
  mounted() {
    this.getabnormalEvents();
  },
  methods: {
    getabnormalEvents() {
      this.$api.abnormalEvents
        .abnormalEventsList({
          startTime: this.anomalousEvent.starTime,
          endTime: this.anomalousEvent.endTime,
          areaId: this.anomalousEvent.area,
          type: this.anomalousEvent.type,
          page: this.currentPage,
          rows: this.pageSize
        })
        .then(res => {
          if (res.code == 200) {
            this.anomalousEvenTableData = res.data.row;
            this.total = res.data.total;
          } else if (res.code == 201) {
            this.anomalousEvenTableData = [];
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getabnormalEvents();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getabnormalEvents();
    },

    exportExcel() {
      window.location.href =
        "http://192.168.10.11:9100/ai/abnormalEvents/exportExcel?startTime=" +
        this.anomalousEvent.starTime +
        "&endTime=" +
        this.anomalousEvent.endTime +
        "&areaId=" +
        this.anomalousEvent.area +
        "&type" +
        this.anomalousEvent.type;
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
    .el-form-item .el-input__inner {
      width: 175px;
    }
  }
}
</style>
