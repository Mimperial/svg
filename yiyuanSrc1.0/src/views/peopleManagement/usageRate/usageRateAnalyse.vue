<template>
  <div class="usage_rate">
    <!-- 使用率分析 -->
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
              v-for="item in placeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="周期">
          <el-select
            v-model="searchParam.timeFrameValue"
            filterable
            clearable
            placeholder="请选择周期"
          >
            <el-option
              v-for="item in timeFrameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="lookIndividualData()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="dailog-charts" v-show="resDataSign !== ''">
      <div class="chart-title">
          <span>08:00-18:00时段</span>
          <div class="line"></div>
        </div>

        <div id="mycharts" style="width: 1670px; height: 539px;"></div>

        <div class="chart-title">
          <span>18:00-24:00时段</span>
          <div class="line"></div>
        </div>
        <div id="ucharts" style="width: 1670px; height: 539px;"></div>

        <div class="chart-title">
          <span>24:00-08:00时段</span>
          <div class="line"></div>
        </div>
        <div id="hecharts" style="width: 1670px; height: 539px;"></div>
    </div>
    <div class="before-chart-hint" v-show="searchParam.timeFrameValue == '' || resDataSign == ''">
        <p>请选择区域与时段</p>
    </div>
  </div>
</template>

<script>
import { dealSelectOption } from "@/commonjs/selectOption.js";
import { chartOption } from "@/commonjs/chartOption.js";
export default {
  name: "meetingRecord",
  data() {
    return {
      usageRateList: [],
      searchParam: {
        areaValue: "",
        timeFrameValue: ""
      },
      timeFrame: [new Date(2020, 9, 10, 8, 10), new Date(2020, 9, 10, 18, 10)],
      resDataSign: '',
      timeFrameList:[
          {label: '近7天',
            value:'7'
            },
            {label: '近30天',
            value:'30'
            },
            {label: '全年',
            value:'-1'
            }
      ]
    };
  },
  computed: {
    //   区域下拉
    placeOptions: function() {
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
  },
  created() {
  },
  mounted() {},
  methods: {
    usageRateChart(data1, data2, data3) {
      this.$nextTick(function() {
        var mycharts = this.$echarts.init(document.getElementById("mycharts"));
        var ucharts = this.$echarts.init(document.getElementById("ucharts"));
        var hecharts = this.$echarts.init(document.getElementById("hecharts"));
        var option1 = chartOption(data1)
        var option2 = chartOption(data2)
        var option3 = chartOption(data3)

        // 使用刚指定的配置项和数据显示图表。
        mycharts.setOption(option1);
        ucharts.setOption(option2);
        hecharts.setOption(option3);
      });
    },

    // 查看每行折线图
    lookIndividualData(id) {
      this.individualDataVisibale = true;
      this.$api.usageRate
        .lookDetail({
          id: this.searchParam.areaValue,
          dateLength: this.searchParam.timeFrameValue, //周期/时间长度
        })
        .then(res => {
          if (res.code == 200) {
            let resDataSign = res.data
            this.resDataSign = resDataSign //点击搜索有返回值，提示消失
            let resLinedata1 = resDataSign[1];
            let resLinedata2 = resDataSign[2];
            let resLinedata3 = resDataSign[3];

            // 将对象数组转化为二维数组
            let arrTwo1 = resLinedata1.map((item, index) => {
              return ([index] = [item.key, item.value]);
            });
            let arrTwo2 = resLinedata2.map((item, index) => {
              return ([index] = [item.key, item.value]);
            });
            let arrTwo3 = resLinedata3.map((item, index) => {
              return ([index] = [item.key, item.value]);
            });
            this.usageRateChart(arrTwo1, arrTwo2, arrTwo3);
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "warning"
            });
          }
        });
    },
    lookDiffIndividual(sign) {
      this.sign = sign;
      this.lookIndividualData();
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
  .dailog-charts {
    .el-dialog__title {
      color: #fff;
      font-size: 14px;
    }

    .el-dialog__header {
      background: #2f7b8f;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }
}
</style>
