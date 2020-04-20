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
        :header-cell-style="{'background':'rgba(1,38,63,1)','text-align':'center','color':'rgba(94,187,220,1)'}"
        :cell-style="{'text-align':'center'}"
        stripe
      >
        <el-table-column
          type="selection"
          label="全选"
          width="55"
        >
        </el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="area" label="区域">
        </el-table-column>
        <el-table-column prop="interval" label="时段">
        </el-table-column>
        <el-table-column prop="count" label="人数">
        </el-table-column>
        <el-table-column prop="rate" label="使用率">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="lookIndividualData(scope.row.id, scope.row.dateLength, scope.row.interval)"
              type="text"
              size="small"
              ><i class="el-icon-search"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
    <div>
      <el-dialog
      width="80%"
      height="100%"
      center
      :visible.sync="individualDataVisibale"
    >
    <div id="usageRateAnalyse" style="width: 1000px; height: 939px"></div>
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
    			"id": 1,
    			"area": "大厅",
    			"interval": "08:00-18:00",
    			"count": 20,
    			"rate": "80%",
    			"time": "2020-03-18"
    		}
      ],
      currentPage:1,
      options: [
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
      time: "",
      areaValue: "",
      timeFrameValue: "",
      individualDataVisibale:false
    };
  },
  mounted() {},
  methods: {
    lookIndividualData(id, dateLength, interval){
      this.individualDataVisibale = true
      var rateAnalyseLineChart = this.$echarts.init(document.getElementById('usageRateAnalyse'));
      var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        rateAnalyseLineChart.setOption(option);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
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
            content: '';
            position: relative;
            top: 5px;
            right: 2px;
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url('../../../assets/image/before.png') no-repeat;
        }
    }
  }
}
</style>
