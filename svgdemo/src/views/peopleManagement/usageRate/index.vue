<template>
  <div>
    <!-- 使用率 -->
    <div class="meeting-nav">
      <div>
        <span class="meeting-status"
          ><img src="../../../assets/image/double_slash.png" alt="" />
          区域</span
        >
        <el-select v-model="areaValue" filterable placeholder="全部">
          <el-option
            v-for="item in areaOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span class="meeting-status"
          ><img src="../../../assets/image/double_slash.png" alt="" />
          时段</span
        >
        <el-select v-model="timeFrameValue" filterable placeholder="全部">
          <el-option
            v-for="item in timeFrameOptions"
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
        <el-table-column align="center" prop="date" label="来访日期">
        </el-table-column>
        <el-table-column align="center" prop="name" label="首次抓拍时间">
        </el-table-column>
        <el-table-column align="center" prop="address" label="首次抓拍图">
        </el-table-column>
        <el-table-column align="center" prop="address" label="最后抓拍时间">
        </el-table-column>
        <el-table-column align="center" prop="address" label="最后抓拍图">
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
      tableData: [],
      currentPage:1,
      options: [
        {
          value: "选项1",
          label: "黄金"
        }
      ],
      timeFrameOptions: [
        {
          value: "选项1",
          label: "黄金"
        }
      ],
      time: "",
      areaValue: "",
      timeFrameValue: ""
    };
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  }
};
</script>

<style lang="scss"></style>
