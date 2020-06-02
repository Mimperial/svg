<template>
  <!-- 数据驾驶舱-对外 -->
  <div class="externalScreen">
    <div class="left">
      <div class="left_top">
        <div class="title">人群热力图</div>
        <div class="thermodynamicChart">
          <swiper :options="swiperOption1" ref="mySwipers">
            <swiper-slide v-for="(item,index) in arrHeatMapDiv" :key="index">
              <div
                class="canvas-heatmap"
                :style="'background:url('+ item.bgImg +');background-size:100% 100%'"
              >
                <HeatMap :ids="'heat' + index" class="crowded-heat-map"></HeatMap>
                <div class="heat-threshold">
                  <div v-for="(item, index) in colorHot" :key="index">
                    <p :style="{background:item.colorval}"></p>
                    <span>{{item.colornum}}</span>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="floor-choose">
            <el-button v-for="(item, index) in floorMap" :key="index" :class="activeFloor === index ? 'active': ''" @click="changeIndex(index)">
              {{
              index + 1
              }}层
            </el-button>
          </div>
        </div>
      </div>
      <div class="left_center">
        <div class="title">人员关键点识别</div>
        <div class="keyPointRecognition">
          <LivePlayer
            videoUrl="rtmp://192.168.10.9:1935/lskjapp/2200001201000053"
            fluent
            autoplay
            live
            stretch
          ></LivePlayer>
        </div>
      </div>
      <div class="left_bottom">
        <div class="title">员工情绪分析</div>
        <div class="sentimentAnalysis">
          <mood
            ids="moodBall1"
            ballColorOne="rgba(100,165,244,.7)"
            ballColorTwo="rgba(0,92,224,.7)"
            text="高兴"
            :data="data1"
          />
          <mood
            ids="moodBall2"
            ballColorOne="rgba(245,127,159,.7)"
            ballColorTwo="rgba(167,31,68, .7)"
            text="愤怒"
            :data="data2"
          />
          <mood
            ids="moodBall3"
            ballColorOne="rgba(108,234,173,.7)"
            ballColorTwo="rgba(19,127,102,.7)"
            text="平静"
            :data="data3"
          />
          <mood
            ids="moodBall4"
            ballColorOne="rgba(131,119,238,.7)"
            ballColorTwo="rgba(88,53,197,.7)"
            text="悲伤"
            :data="data4"
          />
        </div>
      </div>
    </div>
    <div class="center">
      <div class="center_top">
        <div>
          <div>在所员工</div>
          <div style="color:#00E389">1546</div>
        </div>
        <div>
          <div>在所访客</div>
          <div style="color:#FBB53B">1123</div>
        </div>
        <div>
          <div>今日累计</div>
          <div style="color:#00F0FE">2669</div>
        </div>
        <div>
          <div>昨日累计</div>
          <div style="color:#00F0FE">2352</div>
        </div>
      </div>
      <div class="center_center">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item,index) in imgUrl" :key="index">
            <flat-map :src="item" :id="index" :isSwiper="true"></flat-map>
            <div class="floorName">
              <div class="name">内分泌研究所</div>
              <div class="floorNum">{{index + 1}}F</div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="icon">
          <div class="inner">
            <img src="../../assets/image/ren_inner.svg" alt />
            <span>所内访客</span>
          </div>
          <div class="external">
            <img src="../../assets/image/ren_external.svg" alt />
            <span>所外访客</span>
          </div>
        </div>
        <!-- <div class="map"></div> -->
      </div>
      <div class="center_bottom">
        <div class="title">重点区域实时人数</div>
        <div class="keyAreaNum">
          <KeyAreaNum />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right_top">
        <div class="title">昨日重点区域人员排行榜TOP14</div>
        <key-area-top :active.sync="active"></key-area-top>
        <!-- <div class="keyAreaTop"></div> -->
      </div>
      <div class="right_bottom">
        <div class="title">员工7日平均体重变化趋势</div>
        <div class="sevenDaysWeightChange">
          <weight-change-chart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import Mood from "@/components/Mood/index.vue";
import KeyAreaNum from "@/components/KeyAreaNum/index.vue";
import WeightChangeChart from "@/components/WeightChangeChart/index.vue";
import KeyAreaTop from "@/components/KeyAreaTop/index.vue";
import FlatMap from "@/components/Floor-flat-map/routeMap.vue";
import HeatMap from "@/components/HeatMap/index.vue";
import LivePlayer from "@liveqing/liveplayer";
export default {
  name: "",
  components: {
    Mood,
    KeyAreaNum,
    WeightChangeChart,
    KeyAreaTop,
    FlatMap,
    LivePlayer,
    HeatMap
  },
  data() {
    let that = this;
    return {
      active: 0,
      activeFloor: 0,
      data1: [0.28],
      data2: [0.5],
      data3: [0.47],
      data4: [0.6],
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
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      },
      swiperOption1: {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        on: {
          slideChangeTransitionEnd: function(swiper) {
            that.activeFloor = this.activeIndex
          }
        }
      },
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
      colorHot: [
        { colorval: "#1F4C94", colornum: "<10" },
        { colorval: "#4FA4DF", colornum: "10-20" },
        { colorval: "#499453", colornum: "20-30" },
        { colorval: "#FCED6A", colornum: "30-40" },
        { colorval: "#EE9950", colornum: "40-50" },
        { colorval: "#C04233", colornum: "50-60" }
      ],
      floorMap: [1, 2, 3, 4, 5, 6, 7]
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwipers.$swiper;
    }
  },
  created() {
    //昨日重点区域人员排行榜TOP14
    // this.getYesterodayNum();
  },
  methods: {
    changeIndex (index) {
      this.swiper.slideTo(index, 1000, false);
      this.activeFloor = index
    },
    getYesterodayNum() {
      this.$api.dataDeck.yesterdayPeopleNumber().then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss">
.externalScreen {
  // background: #2B3036;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  & > div {
    margin-top: 25px;
    .title {
      color: #fff;
      font-family: PingFangSC-Medium;
      font-size: 18px;
      height: 42px;
      line-height: 42px;
      // background: linear-gradient(90deg,#192A52,#353F4B);
      // background: #374454;
      background: rgba(33, 67, 77, 0.3);
      margin-bottom: 10px;
    }
  }
  .left {
    width: 420px;
    & > div {
      width: 100%;
    }
    .thermodynamicChart,
    .keyPointRecognition,
    .sentimentAnalysis {
      padding: 15px;
      // background: #374454;
      background: rgba(33, 67, 77, 0.2);
      margin-bottom: 22px;
      box-sizing: border-box;
    }
    .thermodynamicChart {
      padding: 4px 10px 0 10px;
      .crowded-heat-map {
        height: 220px;
      }
      .swiper-container {
        height: 220px;
      }
      .canvas-heatmap {
        height: 220px;
        position: relative;
        .heat-threshold {
          display: flex;
          width: 230px;
          justify-content: space-between;
          position: absolute;
          left: 0;
          bottom: 0px;
          color: rgba(0, 252, 249, 0.85);
          div {
            width: 40px;
            // height: 4px;
            text-align: center;
            p {
              width: 18px;
              height: 4px;
              margin-left: 6px;
            }
            span {
              display: inline-block;
              padding-top: 5px;
              font-size: 12px;
            }
          }
        }
      }
      .floor-choose {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin: 10px 0;
        button {
          padding: 0;
          width: 50px;
          height: 26px;
          font-size: 14px;
          background: rgba(25, 37, 52, 1);
          border: none;
          border-radius: 3px;
          color: #5eadc8;
          text-align: center;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          -ms-border-radius: 3px;
          -o-border-radius: 3px;
        }
        button.active {
          background: rgba(25, 37, 52, 0.4);
          color: #fff;
        }
      }
    }
    .thermodynamicChart {
      height: 270px;
    }
    .keyPointRecognition {
      height: 236px;
      padding: 0;
    }
    .sentimentAnalysis {
      height: 214px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .center {
    width: 958px;
    & > div {
      width: 100%;
    }
    .keyAreaNum {
      height: 308px;
      // background: #374454;
      background: rgba(33, 67, 77, 0.2);
    }
    .center_top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;
      & > div {
        width: 222px;
        height: 75px;
        border-radius: 3px;
        // background: #374454;
        background: rgba(33, 67, 77, 0.2);
        margin-top: 15px;
        padding: 15px 30px;
        box-sizing: border-box;
        color: #fff;
        & > div:nth-child(2) {
          font-size: 28px;
          margin-top: 5px;
        }
      }
    }
    .center_center {
      height: 452px;
      width: 904px;
      margin: 0 auto;
      // background: #374454;
      // background: rgba(33, 67, 77, 0.2);
      margin-bottom: 5px;
      position: relative;
      // background: #2b3036;
      .swiper-container {
        width: 904px;
        height: 100%;
        z-index: 1;
        .swiper-slide {
          width: 100% !important;
        }
        .my-bullet {
          border-radius: 50%;
          width: 10px;
          height: 10px;
          margin: 0 8px;
          display: inline-block;
          background: null;
          border: 2px solid #405e83;
        }

        .my-bullet-active {
          background: #405e83;
          width: 12px;
          height: 12px;
        }
      }

      // .map {
      //   width: 100%;
      //   height: 100%;
      //   background: url("../../assets/floor/f1.png");
      // }
      .floorName {
        position: absolute;
        left: 55px;
        bottom: 20px;
        width: 156px;
        color: #fff;
        .name {
          height: 24px;
          width: 100%;
          text-align: center;
          line-height: 24px;
          background: rgba(87, 218, 233, 0.76);
          letter-spacing: 3px;
          font-size: 16px;
        }
        .floorNum {
          height: 30px;
          font-size: 28px;
          line-height: 30px;
          width: 100%;
          text-align: center;
          background: #3b5472;
        }
      }
      .icon {
        display: flex;
        color: #65c6e7;
        font-family: PingFang SC;
        position: absolute;
        z-index: 2;
        top: 20px;
        left: 50%;
        height: 30px;
        transform: translateX(-50%);
        & > div {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        img {
          width: 22px;
          height: 22px;
        }
        // line-height: 20px;
      }
    }
  }
  .right {
    width: 420px;
    & > div {
      width: 100%;
    }
    .keyAreaTop {
      height: 520px;
      padding: 15px;
      // background: #374454;
      background: rgba(33, 67, 77, 0.2);
      margin-bottom: 15px;
      box-sizing: border-box;
    }
    .sevenDaysWeightChange {
      height: 282px;
      // background: #374454;
      background: rgba(33, 67, 77, 0.2);
      padding: 15px;
      box-sizing: border-box;
    }
  }
}
@media screen and (min-height: 936px) {
  .externalScreen {
    & > div {
      margin-top: 10px;
      .title {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        margin-bottom: 5px;
      }
    }
    .left {
      .thermodynamicChart,
      .keyPointRecognition {
        margin-bottom: 5px;
      }
    }
    .center {
      .keyAreaNum {
        height: 240px;
      }
    }
    .right {
      .keyAreaTop {
        height: 500px;
        margin-bottom: 5px;
      }
      .sevenDaysWeightChange {
        height: 261px;
      }
    }
  }
}
@media screen and (min-height: 990px) {
  .externalScreen {
    & > div {
      margin-top: 25px;
      .title {
        height: 42px;
        line-height: 42px;
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
    .left {
      .thermodynamicChart,
      .keyPointRecognition {
        margin-bottom: 22px;
      }
    }
    .center {
      .keyAreaNum {
        height: 308px;
      }
    }
    .right {
      .keyAreaTop {
        height: 520px;
        margin-bottom: 15px;
      }
      .sevenDaysWeightChange {
        height: 282px;
      }
    }
  }
}
</style>