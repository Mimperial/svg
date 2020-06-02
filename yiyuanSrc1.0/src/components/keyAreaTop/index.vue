<template>
  <div class="keyAreaTop">
    <div class="topTime">
      <div
        v-for="(item, index) in time"
        :key="index"
        :class="index == active ? 'active': ''"
        @click="changeIndex(index)"
      >{{item}}</div>
    </div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,index) in data" :key="index">
        <ul class="keyAreaCon">
          <li v-for="(item, index) in item" :key="index">
            <div>
              <span class="num">{{index + 1}}</span>
              <span>{{item.pos}}</span>
            </div>
            <div>
              <span>人数:</span>
              <span>{{item.num}}</span>
            </div>
            <div>
              <span>使用率:</span>
              <span>{{item.usage}}</span>
            </div>
          </li>
        </ul>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "keyAreaTop",
  props: {
    active: 0
  },
  data() {
    let that = this;
    return {
      time: ["08:00-18:00", "18:00-24:00", "24:00-05:00"],
      data: [
        [
          {
            pos: "运动区",
            num: 10,
            usage: "80%"
          },
          {
            pos: "CAP实验室",
            num: 13,
            usage: "20%"
          },
          {
            pos: "运动区",
            num: 26,
            usage: "40%"
          },
          {
            pos: "CAP实验室",
            num: 15,
            usage: "20%"
          },
          {
            pos: "运动区",
            num: 10,
            usage: "10%"
          },
          {
            pos: "CAP实验室",
            num: 12,
            usage: "50%"
          },
          {
            pos: "运动区",
            num: 10,
            usage: "80%"
          },
          {
            pos: "CAP实验室",
            num: 20,
            usage: "60%"
          },
          {
            pos: "运动区",
            num: 10,
            usage: "20%"
          },
          {
            pos: "CAP实验室",
            num: 10,
            usage: "30%"
          },
          {
            pos: "运动区",
            num: 12,
            usage: "30%"
          },
          {
            pos: "CAP实验室",
            num: 10,
            usage: "80%"
          },
          {
            pos: "运动区",
            num: 11,
            usage: "80%"
          },
          {
            pos: "CAP实验室",
            num: 10,
            usage: "30%"
          }
        ],
        [
          {
            pos: "运动区1",
            num: 10,
            usage: "80%"
          },
          {
            pos: "CAP实验室1",
            num: 13,
            usage: "20%"
          },
          {
            pos: "运动区1",
            num: 26,
            usage: "40%"
          },
          {
            pos: "CAP实验室1",
            num: 15,
            usage: "20%"
          },
          {
            pos: "运动区1",
            num: 10,
            usage: "10%"
          },
          {
            pos: "CAP实验室1",
            num: 12,
            usage: "50%"
          },
          {
            pos: "运动区1",
            num: 10,
            usage: "80%"
          },
          {
            pos: "CAP实验室1",
            num: 20,
            usage: "60%"
          },
          {
            pos: "运动区1",
            num: 10,
            usage: "20%"
          },
          {
            pos: "CAP实验室1",
            num: 10,
            usage: "30%"
          },
          {
            pos: "运动区1",
            num: 12,
            usage: "30%"
          },
          {
            pos: "CAP实验室1",
            num: 10,
            usage: "80%"
          },
          {
            pos: "运动区1",
            num: 11,
            usage: "80%"
          },
          {
            pos: "CAP实验室1",
            num: 10,
            usage: "30%"
          }
        ],
        [
          {
            pos: "运动区2",
            num: 10,
            usage: "80%"
          },
          {
            pos: "CAP实验室2",
            num: 13,
            usage: "20%"
          },
          {
            pos: "运动区2",
            num: 26,
            usage: "40%"
          },
          {
            pos: "CAP实验室2",
            num: 15,
            usage: "20%"
          },
          {
            pos: "运动区2",
            num: 10,
            usage: "10%"
          },
          {
            pos: "CAP实验室2",
            num: 12,
            usage: "50%"
          },
          {
            pos: "运动区2",
            num: 10,
            usage: "80%"
          },
          {
            pos: "CAP实验室2",
            num: 20,
            usage: "60%"
          },
          {
            pos: "运动区2",
            num: 10,
            usage: "20%"
          },
          {
            pos: "CAP实验室2",
            num: 10,
            usage: "30%"
          },
          {
            pos: "运动区2",
            num: 12,
            usage: "30%"
          },
          {
            pos: "CAP实验室2",
            num: 10,
            usage: "80%"
          },
          {
            pos: "运动区2",
            num: 11,
            usage: "80%"
          },
          {
            pos: "CAP实验室2",
            num: 10,
            usage: "30%"
          }
        ]
      ],
      swiperOption: {
        autoplay: {
          delay: 120000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        loop: true,
        on: {
          slideChangeTransitionEnd: function(swiper) {
            if (this.activeIndex > 3) {
              that.$emit("update:active", 0);
            } else if (this.activeIndex < 1) {
               that.$emit("update:active", 2);
            }else {
              that.$emit("update:active", this.activeIndex - 1);
            }
          }
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  methods: {
    changeIndex(index) {
      this.swiper.slideTo(index + 1, 1000, false);
      this.$emit("update:active", index);
      // this.$emit("changeTime", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.topTime {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 2px solid #3c5473;
  height: 36px;
  & > div {
    line-height: 36px;
    width: 33.3%;
    text-align: center;
    cursor: pointer;
    color: #fff;
    border-right: 2px solid #3c5473;
    &:last-child {
      border: none;
    }
    &.active {
      color: #589eb6;
    }
  }
}
.keyAreaCon {
  margin-top: 15px;
  li {
    display: flex;
    color: #fff;
    height: 30px;
    line-height: 30px;
    font-family: PingFang SC;
    & > div:nth-child(1) {
      font-size: 14px;
      width: 42%;
      display: flex;
      align-items: center;
      .num {
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 13px;
        border-radius: 2px;
        // background: #ff3000;
        background: rgba(0, 255, 255, 0.36);
        margin-right: 5px;
        margin-left: 10px;
      }
    }
    & > div:nth-child(2) {
      width: 30%;
      font-size: 13px;
      span:first-child {
        color: #50a2c1;
      }
    }
    & > div:nth-child(3) {
      width: 25%;
      font-size: 13px;
      span:first-child {
        color: #50a2c1;
      }
    }
    &:nth-child(1) > div {
      .num {
        background: #ff3000;
      }
    }
    &:nth-child(2) > div {
      .num {
        background: #ff7c00;
      }
    }
    &:nth-child(3) > div {
      .num {
        background: #ff9c00;
      }
    }

    &:nth-child(odd) {
      background: rgba(40, 42, 44, 0.25);
      border-radius: 2px;
    }
  }
}
</style>