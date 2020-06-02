<template>
  <div class="usage_rate">
    <!-- 使用率记录 -->
    <div class="top">
      <el-form :inline="true" :model="searchParam" class="demo-form-inline">
        <el-form-item label="区域">
          <el-select
            v-model="searchParam.areaValue"
            filterable
            clearable
            placeholder="全部"
          >
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时段">
          <el-select
            v-model="searchParam.timeFrameValue"
            filterable
            clearable
            placeholder="全部"
          >
            <el-option
              v-for="item in timeFrameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getUsageRateList()">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="option">
        <el-button type="primary" @click="exportExcel()">导出</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        ref="multipleTable"
        :data="usageRateList"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{
          background: '#fff',
          'text-align': 'center',
          color: '#000'
        }"
        :cell-style="{ 'text-align': 'center' }"
        stripe
      >
        <el-table-column type="selection" label="全选" width="55">
        </el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="area" label="区域">
          <template slot-scope="scope" v-show="scope.row.area == null">
            无
          </template>
        </el-table-column>
        <el-table-column prop="interval" label="时段"> </el-table-column>
        <el-table-column prop="count" label="人数"> </el-table-column>
        <el-table-column prop="rate" label="使用率(百分比)"> </el-table-column>
       
      </el-table>
      <el-pagination
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
import { dealSelectOption } from "@/commonjs/selectOption.js";
export default {
  name: "meetingRecord",
  data() {
    return {
      usageRateList: [],
      currentPage: 1,
      pageSize: 10,
      total: 10,
      searchParam: {
        areaValue: 1,
        timeFrameValue: 1
      },
      areaId: 1,
      timeFrameInt: 1,
    };
  },
  computed: {
    //   区域下拉
    areaOptions: function() {
      let placeList = [
        "",
        "运动区",
        "餐饮区",
        "CAP实验室",
        "GMP实验室",
        "NGS实验室",
        "质谱实验室",
        "无菌动物房",
        "公共试验区",
        "细胞培养室",
        "会议室1",
        "会议室2",
        "会议室3",
        "会议室4",
        "会议室5"
      ];
      return dealSelectOption(placeList);
    },
    // 时段下拉
    timeFrameOptions: function(){
        let timeRangeArr = ["", "08:00-18:00", "18:00-24:00", "24:00-08:00"];
        return dealSelectOption(timeRangeArr)
    }
  },
  created() {
    this.getUsageRateList();
  },
  mounted() {},
  methods: {

    getUsageRateList() {
      this.$api.usageRate
        .usageRateList({
          id: this.searchParam.areaValue,
          interval: this.searchParam.timeFrameValue,
          page: this.currentPage,
          rows: this.pageSize
        })
        .then(res => {
          if (res.code == 200) {
            this.usageRateList = res.data.row;
            this.total = res.data.total;
          } else if (res.code == 201) {
            this.usageRateList = [];
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
      this.getUsageRateList();
    },

    
    exportExcel() {
      window.location.href =
        "http://192.168.10.39:9100/personnel/utilizationRate/export/excel?area=" +
        this.areaId +
        "&interval=" +
        this.timeFrameInt;
    }
  }
};
</script>

<style lang="scss">
.usage_rate {
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
  .time-frame {
    span {
      color: #000;
      font-size: 14px;
      padding-right: 11px;
    }
  }
}
</style>
