<template>
  <div class="meeting_record">
    <!-- 会议记录 -->
    <div class="top">
      <el-form :inline="true" :model="meeting" class="demo-form-inline">
        <el-form-item label="会议名称">
          <el-input
            placeholder="请输入内容"
            v-model="meeting.meetingId"
            clearable
            class="meeting-name"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="10">
            <el-date-picker
            v-model="meeting.startTime"
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
            v-model="meeting.endTime"
            type="datetime"
            value-format="timestamp"
            placeholder="选择结束时间"
            default-time="23:59:59"
          >
          </el-date-picker>
          </el-col>
          
        </el-form-item>
        
        <el-form-item label="会议状态">
          <el-select
            v-model="meeting.statusValue"
            filterable
            clearable
            placeholder="全部"
          >
            <el-option
              v-for="item in meeting.meetOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getMeetingList()">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="option">
        <el-button class="export" type="primary" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        ref="multipleTable"
        :data="meetingList"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background':'#fff','text-align':'center','color':'#000'}"
        :cell-style="{ 'text-align': 'center' }"
        stripe
      >
        <el-table-column type="selection" label="全选" width="55">
        </el-table-column>
        <el-table-column prop="meetingName" label="会议名称"></el-table-column>
        <el-table-column prop="meetingPlace" label="会议地点"></el-table-column>
        <el-table-column prop="meetingDay" label="日期"></el-table-column>
        <el-table-column prop="meetingTime" label="时间"></el-table-column>
        <el-table-column prop="meetingStaff" label="参会人员"></el-table-column>
        <el-table-column
          prop="meetingStatus"
          label="会议状态"
        ></el-table-column>
        <el-table-column prop="signedNum" label="签到人数"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="lookMeetingRelated(scope.row.id)"
              type="text"
              size="small"
              ><i class="el-icon-search"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      width="80%"
      height="100%"
      center
      :visible.sync="meetingPersonVisibale"
    >
      <div class="meeting-person">
        
        <div class="tabPage">
        <span >会议记录</span>
        <span>查看</span>
      </div>
        <el-button class="export" type="primary" @click="exportExcel">导出</el-button>
      </div>
      <div class="bottom">
        <el-table
          ref="multipleTable"
          :data="relatedManList"
          style="width: 100%"
          :header-cell-style="{'background':'#fff','text-align':'center','color':'#000'}"
          :cell-style="{ 'text-align': 'center' }"
          stripe
        >
          <el-table-column
            type="selection"
            label="全选"
            width="55"
          ></el-table-column>
          <el-table-column prop="picUrl" label="人员照片"></el-table-column>
          <el-table-column prop="workerId" label="工号"></el-table-column>
          <el-table-column prop="name" label="人员姓名"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="position" label="岗位"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
          <el-table-column prop="signInStatus" label="签到状态" ></el-table-column>
          <el-table-column prop="captureTime" label="抓拍时间" >
          <template slot-scope="scope" v-show="scope.row.captureTime == null">
            --
          </template>
          </el-table-column>
          <el-table-column prop="captureUrl" label="抓拍图">
            <template slot-scope="scope" v-show="scope.row.captureUrl == null">
            --
          </template>
          <template slot-scope="scope" v-show="scope.row.captureUrl !== null">
            <img :src="scope.row.captureUrl" alt="">
          </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="detailCurrentChange"
          :current-page="detailCurrentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="relatedManTotal"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { getToken } from "@/utils/auth.js";
import { dealSelectOption } from "@/commonjs/selectOption.js"
export default {
  name: "meetingRecord",
  data() {
    return {
      input: "",
      meeting: {
        meetingId: "",
        startTime: "",
        endtime:'',
        statusValue:'',
        meetOptions:[]
      },
      meetingList: [],
      relatedManList: [],
      currentPage: 1,
      detailCurrentPage: 1,
      pagesize: 2,
      total: 1,
      relatedManTotal: 1,
      options: [
        {
          value: "选项1",
          label: "黄金"
        }
      ],
      time: "",
      statusValue: "",
      meetingPersonVisibale: false
    };
  },
  created() {
    let stausList = [
          "",
          "未开始",
          "进行中",
          "已结束",
        ];
      this.meeting.meetOptions = dealSelectOption(stausList)
      this.getMeetingList();
  },
  methods: {
    getMeetingList() {
      let _this = this;
      _this.$api.meetingRecord
        .meetingRecord({
          name: _this.meeting.meetingId,
          startTime:_this.meeting.startTime,
          endTime:_this.meeting.endTime,
          status:_this.meeting.statusValue,
          page: _this.currentPage,
          rows: _this.pagesize
        })
        .then(res => {
          if (res.code == 200) {
            _this.meetingList = res.data.row;
            _this.total = res.data.total;
          }else if (res.code == 201) {
            _this.meetingList = [];
            _this.total = 0;
          }else{
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'warning'
            });
          }
        });
    },
    lookMeetingRelated(meetingId) {
      this.meetingPersonVisibale = true;
      this.$api.meetingRecord.findPersonByMeetingId({
        page: this.detailCurrentPage,
        rows: this.pagesize,
        meetingId: meetingId
      }).then(res => {
        if(res.code == 200){
          this.relatedManList = res.data.row;
          this.relatedManTotal = res.data.total;
        }else{
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'warning'
            });
          }
        
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getMeetingList();
    },
    detailCurrentChange(currentPage) {
      this.detailCurrentPage = currentPage;
      this.lookMeetingRelated();
    },
    exportExcel () {
      if(this.meeting.startTime == "" || this.meeting.endtime == ""){
        this.$message({
              showClose: true,
              message: "导出时，开始时间和截止时间不能为空",
              type: 'warning'
            });
      }else{
                 window.location.href='http://192.168.10.39:9100/personnel/trafficRecord/export/excel?meetingName=' + this.meeting.meetingId + '&startTime=' + this.meeting.startTime + '&endTime=' + this.meeting.endtime + '&status' + this.statusValue

      }
      
    }
  }
};
</script>

<style lang="scss">
.meeting_record {
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
  .meeting-person {
    display: flex;
    justify-content: space-between;
    .export {
      width: 100px;
      height: 34px;
      background: #378FA5;
      border-radius: 4px;
    }
  }
  .tabPage {
      font-size: 12px;
      border: 1px solid #21839B;
      width: 130px;
      height: 28px;
      display: flex;
      border-radius: 2px;
      span {
        width: 50%;
        text-align: center;
        line-height: 28px;
        cursor: pointer;
        color: #21839B;
        &:first-child {
          border-right: 1px solid rgba(43, 242, 244, 1);
          background: #21839B;
          color: #fff;
        }
      }
    }
}
</style>
