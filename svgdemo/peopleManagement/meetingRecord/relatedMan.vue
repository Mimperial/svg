<template>
  <div>
    <!-- 会议记录--人员相关弹窗 -->
    <div class="meeting-nav">
      <div>
        <el-radio-group v-model="radioMan" size="medium">
      <el-radio-button label="会议记录" ></el-radio-button>
      <el-radio-button label="查看"></el-radio-button>
    </el-radio-group>
      </div>
      <div>
        <el-button class="export">导出</el-button>
      </div>
      
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
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
        <el-table-column align="center" prop="url" label="人员照片">
        </el-table-column>
        <el-table-column align="center" prop="serialNum" label="编号">
        </el-table-column>
        <el-table-column align="center" prop="workNo" label="工号">
        </el-table-column>
        <el-table-column align="center" prop="name" label="人员姓名">
        </el-table-column>
        <el-table-column align="center" prop="sex" label="性别">
        </el-table-column>
        <el-table-column align="center" prop="age" label="年龄">
        </el-table-column>
        <el-table-column align="center" prop="department" label="部门">
        </el-table-column>
        <el-table-column align="center" prop="post" label="岗位">
        </el-table-column>
        <el-table-column align="center" prop="phone" label="联系方式">
        </el-table-column>
        <el-table-column align="center" prop="signInStatus" label="签到状态">
         </el-table-column>
        <el-table-column align="center" prop="firstPicTime" label="抓拍时间">
         </el-table-column>
        <el-table-column align="center" prop="firstUrl" label="抓拍图">
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
      radioMan: "会议记录",
      tableData: [],
      currentPage:1,
      options: [{
          value: '选项1',
          label: '黄金'
        }],
        time: '',
        statusValue: '',
    };
  },
  mounted(){

  },
  methods:{
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

</style>
