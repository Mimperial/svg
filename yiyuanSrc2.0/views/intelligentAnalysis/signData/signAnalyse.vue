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
        <el-form-item label="周期">
            <el-select
                v-model="signData.cycleDay"
                filterable
                placeholder="请选择周期"
              >
                <el-option
                  v-for="(item, index) in signData.cycleOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search" @click="lookDiffIndividual()">搜索</el-button>
        </el-form-item>
      </el-form>
     
    </div>
    
    <div class="dailog-charts" v-show="resDataSign !== ''">
        <div class="chart-title">
          <span>运动时长分析</span>
          <div class="line"></div>
        </div>

        <div id="mycharts" style="width: 1529px; height: 539px;"></div>

        <div class="chart-title">
          <span>体重变化分析</span>
          <div class="line"></div>
        </div>
        <div id="ucharts" style="width: 1529px; height: 539px;"></div>

        <div class="chart-title">
          <span>情绪变化分析</span>
          <div class="line"></div>
        </div>
        <div id="hecharts" style="width: 1529px; height: 539px;"></div>
      
    </div>
    <div class="before-chart-hint" v-show="signData.cycleDay == '' || resDataSign == ''">
        <p>请输入要查询的人和周期</p>
    </div>
  </div>
</template>

<script>
import { dealSelectOption } from "@/commonjs/selectOption.js"

export default {
  name: "signRecord",
  data() {
    return {
      signData: {
        workerId: "",
        cycleDay:'',
        cycleOptions:[
            {label: '近7天',
            value:'7'
            },
            {label: '近30天',
            value:'30'
            },
            {label: '全年',
            value:'-1'
            },
        ]
      },
      statusValue: "",
      sporTime: "",
      neWeight: "",
      newMood: "",
      resDataSign:''
    };
  },
  beforeUpdate() {},
  mounted() {},
  methods: {
      
    lookIndividualData(id) {
      this.signData.workerId = id;
      var formData = new FormData();
      formData.append("workerId", this.signData.workerId);
      this.$api.bodySign.bodySignTodayChart(formData).then(res => {
        if (res.code == 200) {
          let bodySignTodayData = res.data;
          this.sporTime = bodySignTodayData.todayLength;
          this.neWeight = bodySignTodayData.weight;
          this.newMood = bodySignTodayData.emotion;
          this.lookDiffIndividual();
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    lookDiffIndividual() {
      var formData = new FormData();
      formData.append("workerId", this.signData.workerId);
      formData.append("length", this.signData.cycleDay);
      this.$api.bodySign.bodySignHistoryChart(formData).then(res => {
        if (res.code == 200) {
          let bodySignHistoryData = res.data;
          this.resDataSign = bodySignHistoryData
          let arrSportLength = bodySignHistoryData.sportLength;
          let arrWeight = bodySignHistoryData.weight;
          let arrEmotion = bodySignHistoryData.emotion;
          let dbArrSport = arrSportLength.map((item, index) => {
              return ([index] = [item.key, item.value]);
            });
          let dbArrWeight = arrWeight.map((item, index) => {
              return ([index] = [item.key, item.value]);
            });
          this.getIndividualChart(dbArrSport, dbArrWeight, arrEmotion);
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "warning"
          });
        }
      });
    },

    getIndividualChart(sportLength, weight, emotion) {
      this.$nextTick(function() {
        var mycharts = this.$echarts.init(document.getElementById("mycharts"));
        var ucharts = this.$echarts.init(document.getElementById("ucharts"));
        var hecharts = this.$echarts.init(document.getElementById("hecharts"));
        var sloption = {
          xAxis: {
            name: "日期",
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            }
          },
          yAxis: {
            name: "时长/min",
            type: "value",
            boundaryGap: [0, "30%"],
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            }
          },
           grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          visualMap: {
            type: "piecewise",
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: [
              {
                gt: 1,
                lt: 3,
                color: "rgba(0, 180, 0, 0.5)"
              },
              {
                gt: 5,
                lt: 7,
                color: "rgba(0, 180, 0, 0.5)"
              }
            ]
          },
          series: [
            {
              type: "line",
              smooth: 0.4,
              symbol: "none",
              lineStyle: {
                color: "green",
                width: 5
              },
              markLine: {
                symbol: ["none", "none"],
                label: { show: false },
                data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
              },
              areaStyle: {},
              data: sportLength
              
            }
          ]
        };

        var weoption = {
          xAxis: {
            name: "日期",
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            }
          },
          yAxis: {
            name: "体重/kg",
            type: "value",
            boundaryGap: [0, "30%"],
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            }
          },
           grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          visualMap: {
            type: "piecewise",
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: [
              {
                gt: 1,
                lt: 3,
                color: "rgba(0, 180, 0, 0.5)"
              },
              {
                gt: 5,
                lt: 7,
                color: "rgba(0, 180, 0, 0.5)"
              }
            ]
          },
          series: [
            {
              type: "line",
              smooth: 0.4,
              symbol: "none",
              lineStyle: {
                color: "green",
                width: 5
              },
              markLine: {
                symbol: ["none", "none"],
                label: { show: false },
                data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
              },
              areaStyle: {},
              data: weight
              
            }
          ]
        };
        // 构造多条线
        var emotionCategory = Object.keys(emotion)
        let emoAngry = emotion.anger
        let emoHappy = emotion.happy
        let emoPeace = emotion.peace
        let emoSad = emotion.sadness
        let angryLen = emoAngry.length
        // 构造日期
        let emotionDates = []
        let emotionAngryValue = []  //angry值
        let emotionHappyValue = []  
        let emotionSpaceValue = []  
        let emotionSadValue = []  //
        // shengqi
        for(var i = 0; i<angryLen; i++){
          let emotionDateItem = emoAngry[i].key
          let emotionAngryItem = emoAngry[i].value
          emotionDates.push(emotionDateItem)
          emotionAngryValue.push(emotionAngryItem)
        }
        console.log(emotionCategory)
        // gaoxing
        for(var i = 0; i<angryLen; i++){
          let emotionItem = emoHappy[i].value
          emotionHappyValue.push(emotionItem)
        }
        // pingjing
        for(var i = 0; i<angryLen; i++){
          let emotionItem = emoPeace[i].value
          emotionSpaceValue.push(emotionItem)
        }
        // beishang
        for(var i = 0; i<angryLen; i++){
          let emotionItem = emoSad[i].value
          emotionSadValue.push(emotionItem)
        }
        // 构造不同线
        var emoption = {
          color:['#4472C5','#ED7C30','#80FF80','#FF8096','#800080'],
          title: {
            text: ""
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            // data: emotionCategory, //这里的值需要和series中的对象名一致才会出现
            data: ['生气', '高兴', '平静', '悲伤'],
            textStyle:{
              color: '#000',
              fontSize:16
            },
            right: '60px'
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          yAxis: {
            name: "次数",
            type: "value",
            boundaryGap: [0, "30%"],
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            }
          },
          xAxis: {
            name: "日期",
            type: "category",
            boundaryGap: false,
            data: emotionDates,
            axisLine: {
              lineStyle: {
                color: "#000"
              }
            }
          },
          
          series: [
            {
              name: "生气",
              type: "line",
              stack: "总量",
              data: emotionAngryValue
            },
            {
              name: "高兴",
              type: "line",
              stack: "总量",
              data: emotionHappyValue
            },
            {
              name: "平静",
              type: "line",
              stack: "总量",
              data: emotionSpaceValue
            },
            {
              name: "悲伤",
              type: "line",
              stack: "总量",
              data: emotionSadValue
            },
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        mycharts.setOption(sloption);
        ucharts.setOption(weoption);
        hecharts.setOption(emoption);
      });
    }
  }
  }
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
