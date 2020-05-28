<template>
  <div class="meeting_record">
    <!-- 会议记录 -->
    <div class="top">
      <el-form :inline="true" :model="area" class="demo-form-inline">
        <el-form-item label="会议名称">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable
            class="meeting-name"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            suffix-icon="el-icon-date"
            v-model="time"
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
    <!-- <div class="meeting-nav">
      <div>
        <sapn ><img src="../../../assets/image/double_slash.png" alt="" /> 会议名称 </sapn>
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable
        class="meeting-name"
      >
      </el-input>

      <span class="demonstration"><img src="../../../assets/image/double_slash.png" alt="" /> 时间</span>
      <el-date-picker
        suffix-icon="el-icon-date"
        v-model="time"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00', '08:00:00']"
      >
      </el-date-picker>

      <span class="meeting-status"><img src="../../../assets/image/double_slash.png" alt="" /> 会议状态</span>
      <el-select v-model="statusValue" filterable placeholder="全部">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button class="search-meeting">搜索</el-button>
      </div>
      <div>
        <el-button class="export">导出</el-button>
      </div>
      
    </div> -->
    <div class="bottom">
      <el-table
        ref="multipleTable"
        :data="meetingList"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          type="selection"
          label="全选"
          width="55"
        >
        </el-table-column>
        <el-table-column align="center" prop="meetingName" label="会议名称">
        </el-table-column>
        <el-table-column align="center" prop="area" label="会议地点">
        </el-table-column>
        <el-table-column align="center" prop="meetingDate" label="日期">
        </el-table-column>
        <el-table-column align="center" prop="startTime" label="时间">
        </el-table-column>
        <el-table-column align="center" prop="joinPerson" label="参会人员">
        </el-table-column>
        <el-table-column align="center" prop="status" label="会议状态">
        </el-table-column>
        <el-table-column align="center" prop="signPerson" label="签到人数">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <i class="el-icon-search"></i>
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
  </div>
</template>

<script>
export default {
  name: "meetingRecord",
  data() {
    return {
      input: "",
      meetingList: [],
      currentPage:1,
      options: [{
          value: '选项1',
          label: '黄金'
        }],
        time: '',
        statusValue: '',
    };
  },
  created () {
    this.getMeetingList()
  },
  methods: {
    getMeetingList () {
      this.$http.get('/personnel/meetings/findPersonByMeetingId').then(res => {
        this.meetingList = res.data
        console.log(this.meetingList)
      })
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

<style lang="scss" >
.meeting_record {
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
