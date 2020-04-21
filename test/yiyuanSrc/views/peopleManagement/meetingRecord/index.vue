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
          <el-date-picker
            suffix-icon="el-icon-date"
            v-model="meeting.time"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
          >
          </el-date-picker>
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
        :data="meetingList"
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
        <el-table-column prop="meetingName" label="会议名称"></el-table-column>
        <el-table-column prop="area" label="会议地点"></el-table-column>
        <el-table-column prop="meetingDate" label="日期"></el-table-column>
        <el-table-column prop="startTime" label="时间"></el-table-column>
        <el-table-column prop="joinPerson" label="参会人员"></el-table-column>
        <el-table-column prop="status" label="会议状态"></el-table-column>
        <el-table-column prop="signPerson" label="签到人数"></el-table-column>
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
        <el-button type="text">查看--人员相关</el-button>
        <el-button class="export">导出</el-button>
      </div>
      <div class="bottom">
        <el-table
          ref="multipleTable"
          :data="relatedManList"
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
          <el-table-column
            type="selection"
            label="全选"
            width="55"
          ></el-table-column>
          <el-table-column prop="url" label="人员照片"></el-table-column>
          <el-table-column prop="serialNum" label="编号"></el-table-column>
          <el-table-column prop="workNo" label="工号"></el-table-column>
          <el-table-column prop="name" label="人员姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="post" label="岗位"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
          <el-table-column
            prop="signInStatus"
            label="签到状态"
          ></el-table-column>
          <el-table-column
            prop="firstPicTime"
            label="抓拍时间"
          ></el-table-column>
          <el-table-column prop="firstUrl" label="抓拍图"></el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="detailCurrentChange"
          :current-page="detailCurrentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="detailTotal"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "meetingRecord",
  data() {
    return {
      input: "",
      meeting: {
        meetingId: '',
        time:''
      },
      meetingList: [],
      relatedManList: [],
      currentPage: 1,
      detailCurrentPage: 1,
      pagesize:2,
      total:1,
      detailTotal:1,
      options: [
        {
          value: "选项1",
          label: "黄金"
        }
      ],
      time: "",
      statusValue: "",
      meetingPersonVisibale: false,
      
    };
  },
  created() {
    this.getMeetingList();
  },
  methods: {
    getMeetingList() {
      this.$http.post("/personnel/meetings/findPersonByMeetingId",
      { page:this.currentPage,
        rows:this.pagesize
      }).then(res => {
        this.meetingList = res.data.data.rows;
        this.total = res.data.data.total
      });
    },
    lookMeetingRelated(meetingId) {
      this.meetingPersonVisibale = true;
      this.$http.get("/personnel/meetings/findPersonByMeetingId").then(res => {
        this.relatedManList = res.data;
        console.log(this.relatedManList);
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getMeetingList();
    },
    detailCurrentChange(currentPage) {
      this.detailCurrentPage = currentPage;
      // this.getMeetingList();
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
        background: url("../../../assets/image/before.png") no-repeat;
      }
    }
  }
  .meeting-person {
    display: flex;
    justify-content: space-between;
    .export {
      width: 100px;
      height: 34px;
      background: rgba(0, 247, 255, 1);
      border-radius: 4px;
    }
  }
}
</style>
