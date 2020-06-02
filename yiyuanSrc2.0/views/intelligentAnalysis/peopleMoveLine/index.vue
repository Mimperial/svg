<template>
  <div class="people-move-line">
    <!-- 人员动线 -->
    <div class="move-line">
      <div class="left-box">
        <div class="img-upload">
          <div class="conatiner">
            <div class="add">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="headPicFile" :src="headPicFile" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <p>建议上传照片格式为png，大小不超过20M</p>
        </div>

        <el-form :model="peopleMoveLine" class="form-move-line">
          <div class="column">
            <el-form-item label="楼层">
              <el-select
                v-model="peopleMoveLine.floor"
                filterable
                placeholder="请选择楼层"
                @change="handleFloorClick(peopleMoveLine.floor)"
              >
                <el-option
                  v-for="(item, index) in floorOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工姓名">
              <el-input
                placeholder="请输入员工姓名"
                v-model="peopleMoveLine.staffName"
                clearable
                class="meeting-name"
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="column">
            <el-form-item label="起始时间">
              <el-date-picker
                v-model="peopleMoveLine.starTime"
                type="datetime"
                placeholder="选择开始时间"
                default-time="12:00:00"
                value-format="timestamp"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="终止时间">
              <el-date-picker
                v-model="peopleMoveLine.endTime"
                type="datetime"
                placeholder="选择结束时间"
                value-format="timestamp"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
        <div class="search">
          <el-button @click="getPeopleMoveLineList">搜索</el-button>
        </div>
        <div>
          <el-table
            :data="moveLineTableData"
            stripe
            style="width: 100%"
            :header-cell-style="{
              background: '#fff',
              'text-align': 'center',
              color: '#000'
            }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="alarmTime" label="时间" width="110px"> </el-table-column>
            <el-table-column prop="area" label="区域"> </el-table-column>
            <el-table-column prop="alarmUrl" label="抓拍图"> 
              <template slot-scope="scope">
            <img :src="scope.row.alarmUrl" alt="" width="40px" height="40px">
          </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="total"
            class="move-line-pagination"
          >
          </el-pagination>
        </div>
      </div>
      <div class="right-box">
        <!-- <img v-lazy="require(floorImg)" alt="楼层平面图" /> -->
        <!-- <img src="../../../assets/floor/1.png" alt="楼层平面图" /> -->
        <flatMap :src="imgSrc"></flatMap>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import flatMap from "@/components/Floor-flat-map/index.vue";
export default {
  name: "peopleMoveLine",
  data() {
    return {
      floorImg: "",
      headPicFile: "",
      peopleMoveLine: {
        floor: "",
        staffName: "",
        time: "",
        starTime: "",
        endTime: ""
      },
      floorOptions: [],
      moveLineTableData: [],
      pageSize:10,
      currentPage:1,
      total:1,
      html: "/static/pointhbg.html",
      imgSrc: "",
      canvas: "",
      
    };
  },
  components: {
    flatMap
  },
  created() {
    this.getFloorSelect();
  },
  mounted() {
    this.getFloor();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.headPicFile = URL.createObjectURL(file.raw);
      console.log(this.headPicFile)
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isPNG && isLt2M;
    },
    
    getFloor() {
      let floorOptionsArr = [];
      for (let i = 1; i < 8; i++) {
        let floorObj = {
          value: i,
          label: i + "层"
        };
        floorOptionsArr.push(floorObj);
      }
      this.floorOptions = floorOptionsArr;
    },
    // 获取全部楼层
    getFloorSelect() {
      this.$api.select.floor().then(res => {
        if (res.code === 200) {
          this.floorOptions = res.data;
        }
      });
    },
    // 通过楼层显示对应的平面地图
    handleFloorClick(fid) {
      this.floorOptions.forEach(item => {
        if (fid == item.name) {
          // this.imgSrc =  item.alternate
          console.log('../../assets/flat-map-svg/f' + item.name.slice(0, item.name.length - 1) + '.svg')
          this.imgSrc = require("../../../assets/flat-map-svg/f" +
            item.name.slice(0, item.name.length - 1) +
            ".svg");
          console.log(item.alternate);
          $("#canvas").attr(
            "style",
            "background : url(" +
              "http://192.168.10.93:4456/upload/rj-user-resource/" +
              item.alternate +
              ");background-size:100% 100%"
          );
        }
      });
    },
    getPeopleMoveLineList() {
      this.$api.abnormalEvents
        .abnormalEventsList({
          picFile: this.headPicFile,
          floorId: this.peopleMoveLine.floor,
          name: this.peopleMoveLine.staffName,
          startTime: this.peopleMoveLine.starTime,
          endTime: this.peopleMoveLine.endTime,
          page: this.currentPage,
          rows: this.pageSize
        })
        .then(res => {
          if (res.code == 200) {
            this.moveLineTableData = res.data.row;
            this.total = res.data.total;
          } else if (res.code == 201) {
            this.moveLineTableData = [];
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
    }
  }
};
</script>

<style lang="scss" scoped>
.move-line {
  display: flex;
  justify-content: space-between;
}
.left-box {
  width: 481px;
  // height: 897px;
  background: #fff;
  border-radius: 10px;
  .move-line-pagination {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 86px;
    height: 86px;
    line-height: 86px;
    text-align: center;
    z-index: 999;
    border: 1px solid #8c939d;
    border-radius: 6px;
    margin-bottom: 8px;
  }
  .avatar {
    width: 86px;
    height: 86px;
    display: block;
  }
  .img-upload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 180px;
    
    .avatar-uploader-icon:hover {
      color: #dedede;
    }
  }
  .form-move-line {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }
  .column {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
  }
  .search {
    display: flex;
    justify-content: center;
    margin: 0px 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #378586;
  }
}
.right-box {
  // background: url('../../../assets/floor/1.png') no-repeat center;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  margin-left: 5px;
  text-align: center;
  position: relative;
  img {
    margin-top: 10%;
  }
}
.el-form .el-form-item {
  width: 189px !important;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px !important;
}
.el-select .el-input__inner {
  background: #164e66 !important;
  border: 1px solid #2bf2f4;
}
.el-button {
  width: 60px;
  height: 30px;
  margin-top: 15px;
  padding: 0;
  border-radius: 0;
  color: #fff;
  background: #5da4b6;
  border: none;
}
</style>
