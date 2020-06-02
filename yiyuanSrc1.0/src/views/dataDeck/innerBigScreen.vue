<template>
  <!-- 对内大屏 -->
  <div class="HolyGrail-body">
    <main class="HolyGrail-content">
      <div class="static-number">
        <div>
          <p class="num-title">在所员工</p>
          <p class="num-green">7006</p>
        </div>
        <div>
          <p class="num-title">在所访客</p>
          <p class="num-yellow">7006</p>
        </div>
        <div>
          <p class="num-title">今日累计</p>
          <p class="num-blue">7006</p>
        </div>
        <div>
          <p class="num-title">昨日累计</p>
          <p class="num-blue">7006</p>
        </div>
      </div>
      <div class="flat-map-scroll">
        <div class="center_center">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item, index) in imgUrl" :key="index">
              <flat-map :src="item" :id="index" :isSwiper="true"></flat-map>
              <div class="floorName">
                <div class="name">内分泌研究所</div>
                <div class="floorNum">{{ index + 1 }}F</div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="icon">
            <div class="inner">
              <img src="../../assets/image/ren_inner.png" alt />
              <span>所内访客</span>
            </div>
            <div class="external">
              <img src="../../assets/image/ren_external.png" alt />
              <span>所外访客</span>
            </div>
          </div>
        </div>
      </div>
      <h4>通行记录</h4>
      <div class="gothrough-record">
        <AccessRecords :datas="gothroughData"></AccessRecords>
      </div>
    </main>
    <nav class="HolyGrail-nav">
      <h4>人群热力图</h4>

      <div class="people-heatmap">
        <swiper :options="swiperOptionHeat" ref="mySwipers">
          <swiper-slide v-for="(item, index) in arrHeatMapDiv" :key="index">
            <div
              class="canvas-heatmap"
              :style="
                'background:url(' + item.bgImg + ');background-size:100% 100%'
              "
            >
              <HeatMap :ids="'heat' + index" class="crowded-heat-map"></HeatMap>
              <div class="heat-threshold">
                <div v-for="(item, index) in colorHot" :key="index">
                  <p :style="{ background: item.colorval }"></p>
                  <span>{{ item.colornum }}</span>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="floor-choose">
          <el-button
            v-for="(item, index) in floorMap"
            class="btn-f"
            :class="activeFloor === index ? 'active': ''"
            @click="changeIndex(index)"
            :key="index"
            >{{ item }}层
          </el-button>
        </div>
      </div>

      <h4>实时报警</h4>
      <div class="alarm-time">
        <AlarmBox :alarmData="alarmData"></AlarmBox>
      </div>
    </nav>
    <aside class="HolyGrail-ads">
      <h4>人员结构分析</h4>
      <div class="people-structure">
        <div id="canvasManStructure" class="people-str-pie"></div>
        <div class="people-str-bar">
          <p>
            66%
            <img src="../../assets/image/girl.png" alt />
            <img src="../../assets/image/girl.png" alt /> 女(3376)
          </p>
          <p>
            34%
            <img src="../../assets/image/boy.png" alt /> 男(1276)
          </p>
        </div>
      </div>
      <h4>员工情绪分析</h4>
      <div class="staff-mood">
        <div class="sentimentAnalysis">
          <mood
            ids="moodBall1"
            ballColorOne="rgba(0,92,224,.7)"
            ballColorTwo="rgba(100,165,244,.7)"
            text="高兴"
            :data="dataHappy"
          />
          <mood
            ids="moodBall2"
            ballColorOne="rgba(245,127,159,.7)"
            ballColorTwo="rgba(167,31,68, .7)"
            text="愤怒"
            :data="dataAngry"
          />
          <mood
            ids="moodBall3"
            ballColorOne="rgba(108,234,173,.7)"
            ballColorTwo="rgba(19,127,102,.7)"
            text="平静"
            :data="dataPace"
          />
          <mood
            ids="moodBall4"
            ballColorOne="rgba(131,119,238,.7)"
            ballColorTwo="rgba(88,53,197,.7)"
            text="悲伤"
            :data="dataSad"
          />
        </div>
      </div>
      <div>
        <h4>员工运动与体重分析</h4>
        <div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期"> </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import LivePlayer from "@liveqing/liveplayer";
import AccessRecords from "@/components/AccessRecords/index.vue";
import AlarmBox from "@/components/AlarmBox/index.vue";
import Mood from "@/components/Mood/index.vue";
import HeatMap from "@/components/HeatMap/index.vue";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import FlatMap from "@/components/Floor-flat-map/routeMap.vue";
export default {
  name: "dataDeck",
  data() {
    let that = this;
    return {
      gothroughData: [
        {
          imgUrl: require("../../assets/floor/1.png"),
          accessName: "hq",
          accessMood: "平静",
          accessPos: "天台",
          accessTime: "2020.8.31"
        }
      ],
      floorMap: ['一', '二', '三', '四', '五', '六', '七'],
      alarmData: [
        {
          imgUrl: require("../../assets/image/left.png"),
          alarmType: "test",
          alarmPlace: "test",
          alarmTime: "2020-13-23"
        }
      ],
      videoUrl: "rtmp://192.168.10.153:1935/hls/66",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      colorHot: [
        { colorval: "#1F4C94", colornum: "<10" },
        { colorval: "#4FA4DF", colornum: "10-20" },
        { colorval: "#499453", colornum: "20-30" },
        { colorval: "#FCED6A", colornum: "30-40" },
        { colorval: "#EE9950", colornum: "40-50" },
        { colorval: "#C04233", colornum: "50-60" }
      ],
      dataHappy: [0.9],
      dataAngry: [0.1],
      dataPace: [0.7],
      dataSad: [0.2],
      arrHeatMapDiv: [
        {
          bgImg: require("../../assets/floor/1.png"),
          f1Data: []
        },
        {
          bgImg: require("../../assets/floor/2.png"),
          f2Data: []
        },
        {
          bgImg: require("../../assets/floor/3.png"),
          f3Data: []
        },
        {
          bgImg: require("../../assets/floor/4.png"),
          f4Data: []
        },
        {
          bgImg: require("../../assets/floor/5.png"),
          f5Data: []
        },
        {
          bgImg: require("../../assets/floor/6.png"),
          f6Data: []
        },
        {
          bgImg: require("../../assets/floor/7.png"),
          f7Data: []
        }
      ],
      imgUrl: [
        require("../../assets/flat-map-svg/f1.svg"),
        require("../../assets/flat-map-svg/f2.svg"),
        require("../../assets/flat-map-svg/f3.svg"),
        require("../../assets/flat-map-svg/f4.svg"),
        require("../../assets/flat-map-svg/f5.svg"),
        require("../../assets/flat-map-svg/f6.svg"),
        require("../../assets/flat-map-svg/f7.svg")
      ],
      // swiperReset: true,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active"
        },
        // paginationClickable: true,
        autoplay: {
          delay: 8000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        // loop: true
      },
      swiperOptionHeat: {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        // loop: true,//加上之后会出现前两个楼层没有热力图的情况
        on: {
          slideChangeTransitionEnd: function(swiper) {
            that.activeFloor = this.activeIndex
          }
        }
      },
      active: 0,
      activeFloor: 0,
    };
  },
  components: {
    AccessRecords,
    AlarmBox,
    LivePlayer,
    Mood,
    HeatMap,
    FlatMap
  },
   computed: {
    swiper() {
      return this.$refs.mySwipers.$swiper;
    }
  },
  mounted() {
    // 用xy坐标系展示热力图，然后还是把坐标系隐藏，背景放个楼层平面图
    this.getManStructure();
  },
  methods: {
    changeIndex (index) {
      this.swiper.slideTo(index, 1000, false);
      this.activeFloor = index
    },
    // 热力图数据需要循环组建
    getManStructure() {
      var pieManStructure = this.$echarts.init(
        document.getElementById("canvasManStructure")
      );
      var data = [
        {
          name: "0-6岁",
          value: 456
        },
        {
          name: "7-17岁",
          value: 231
        },
        {
          name: "18-40岁",
          value: 121
        },
        {
          name: "41-65岁",
          value: 45
        },
        {
          name: "66岁以上",
          value: 154
        }
      ];

      let option = {
        color: [
          "#bf19ff",
          "#854cff",
          "#5f45ff",
          "#02cdff",
          "#314976",
          "#f9e264",
          "#f47a75",
          "#009db2",
          "#024b51- 0780cf",
          "#765005"
        ],
        backgroundColor: "#070D0F",
        // title: {
        //   text: 7789,
        //   subtext: "总计",
        //   textStyle: {
        //     color: "#f2f2f2",
        //     fontSize: 40
        //   },
        //   subtextStyle: {
        //     fontSize: 30,
        //     color: ["#ff9d19"]
        //   },
        //   x: "center",
        //   y: "center"
        // },
        grid: {
          bottom: 150,
          left: 100,
          right: "10%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/> {c}% ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 4,
          textStyle: {
            color: "#f2f2f2",
            fontSize: 12
          },
          icon: "roundRect",
          data: data
        },
        series: [
          // 主要展示层的
          {
            radius: ["50%", "90%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
              position: "inner",
              formatter: "{b}：{c}%"
            },
            labelLine: {
              normal: {
                show: true,
                length: 10,
                length2: 55
              },
              emphasis: {
                show: true
              }
            },
            data: data
          },
          // 边框的设置
          {
            radius: ["45%", "50%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            data: [
              {
                value: 1,
                itemStyle: {
                  color: "rgba(250,250,250,0.3)"
                }
              }
            ]
          },
          {
            name: "外边框",
            type: "pie",
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ["50%", "50%"],
            radius: ["100%", "100%"],
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 9,
                name: "",
                itemStyle: {
                  normal: {
                    borderWidth: 2,
                    borderColor: "#0b5263"
                  }
                }
              }
            ]
          }
        ]
      };
      pieManStructure.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.canvas-heatmap {
        // background: url('../../assets/floor/1.png') no-repeat;
        // background-size: 408px 251px;
}
.crowded-heat-map {
  width: 410px;
  height: 280px;
}
</style>
