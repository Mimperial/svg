<template>
  <div class="usage_rate">
    <!-- 使用率 -->
    <div class="top">
      <el-form :inline="true" :model="area" class="demo-form-inline">
        <el-form-item label="区域">
          <el-select v-model="areaValue" filterable placeholder="全部">
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
          <el-select v-model="timeFrameValue" filterable placeholder="全部">
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
          <el-button>搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="option">
        <el-button class="export">导出</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        ref="multipleTable"
        :data="usageRateList"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{
          background: 'rgba(1,38,63,1)',
          'text-align': 'center',
          color: 'rgba(94,187,220,1)'
        }"
        :cell-style="{ 'text-align': 'center' }"
        stripe
      >
        <el-table-column type="selection" label="全选" width="55">
        </el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="area" label="区域"> </el-table-column>
        <el-table-column prop="interval" label="时段"> </el-table-column>
        <el-table-column prop="count" label="人数"> </el-table-column>
        <el-table-column prop="rate" label="使用率"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="lookIndividualData(scope.row.id)"
              type="text"
              size="small"
              ><i class="el-icon-search"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    <div class="dailog-charts">
      <el-dialog
        width="90%"
        height="100%"
        center
        :visible.sync="individualDataVisibale"
      >
        <div class="line-tab">
          <div class="line-tab-btn">
            <!-- 点击不同按钮请求不同数据，修改data即可 -->
            <!-- 点击切换选中按钮颜色 -->
            <el-button @click="lookDiffIndividual(7)">周报表</el-button>
            <el-button @click="lookDiffIndividual(30)">月报表</el-button>
            <el-button @click="lookDiffIndividual(-1)">年报表</el-button>
          </div>
          <div class="time-frame">
            <img src="../../../assets/image/before.png" alt=""> 时段
            <el-time-picker
              is-range
              v-model="timeFrame"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </div>
        </div>

        <div
          id="mycharts"
          style="width: 1670px; height: 539px;"
        ></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "meetingRecord",
  data() {
    return {
      input: "",
      usageRateList: [
        {
          id: 1,
          area: "大厅",
          interval: "08:00-18:00",
          count: 20,
          rate: "80%",
          time: "2020-03-18"
        },
        {
          id: 2,
          area: "大厅",
          interval: "08:00-18:00",
          count: 20,
          rate: "80%",
          time: "2020-03-18"
        },
      ],
      currentPage: 1,
      pageSize: 1,
      options: [
        {
          value: "选项1",
          label: "黄金"
        }
      ],
      areaOptions: [
        {
          value: "选项1",
          label: "黄金"
        }
      ],
      timeFrameOptions: [
        {
          value: "选项1",
          label: "黄金"
        }
      ],
      area: {
        value: "选项1",
        label: "黄金"
      },
      time: "",
      timeFrame: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      areaValue: "",
      timeFrameValue: "",
      individualDataVisibale: false
    };
  },
  beforeUpdate() {
    this.$nextTick(function() {
      var mycharts = this.$echarts.init(document.getElementById("mycharts"));
      var option = {
    xAxis: {
        name:"日期",
        type: 'category',
        boundaryGap: false,
        axisLine:{
          lineStyle:{
            color:'#fff'
          }
        }
    },
    yAxis: {
        name:'使用率',
        type: 'value',
        boundaryGap: [0, '30%'],
        axisLine:{
          lineStyle:{
            color:'#fff'
          }
        }
    },
    visualMap: {
        type: 'piecewise',
        show: false,
        dimension: 0,
        seriesIndex: 0,
        pieces: [{
            gt: 1,
            lt: 3,
            color: 'rgba(0, 180, 0, 0.5)'
        }, {
            gt: 5,
            lt: 7,
            color: 'rgba(0, 180, 0, 0.5)'
        }]
    },
    series: [
        {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
                color: 'green',
                width: 5
            },
            markLine: {
                symbol: ['none', 'none'],
                label: {show: false},
                data: [
                    {xAxis: 1},
                    {xAxis: 3},
                    {xAxis: 5},
                    {xAxis: 7}
                ]
            },
            areaStyle: {},
            data: [
                ['2019-10-10', 200],
                ['2019-10-11', 400],
                ['2019-10-12', 650],
                ['2019-10-13', 500],
                ['2019-10-14', 250],
                ['2019-10-15', 300],
                ['2019-10-16', 450],
                ['2019-10-17', 300],
                ['2019-10-18', 100]
            ]
        }
    ]
};

      // 使用刚指定的配置项和数据显示图表。
      mycharts.setOption(option);
    });
  },
  mounted() {},
  methods: {
    lookIndividualData(id) {
      console.log(id);
      this.individualDataVisibale = true;
    },
    lookDiffIndividual(sign){
      this.lookIndividualData(sign)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
        background: url("../../../assets/image/before.png") no-repeat;
      }
    }
  }
  .line-tab {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    .el-button{
      height: 34px;
      line-height: 13px;
    }
    .time-frame{
      color: #fff;
      .el-range-editor.el-input__inner{
        height: 34px;
        border: 1px solid #2BF2F4 !important;
      }
    }
  }
  .el-dialog__header,
  .el-dialog__body,.el-range-editor.el-input__inner,.el-date-editor .el-range-input{
   background: #164E66;
   color:#fff
  }
  .el-date-editor .el-range-separator{
    color: #fff;
  }
}
</style>
