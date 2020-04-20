<template>
  <div class="visit_record">
    <!-- 访客记录 -->
    <div class="top">
      <el-form :inline="true" :model="area" class="demo-form-inline">
        <el-form-item label="姓名/工号">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable
            class="meeting-name"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="情绪">
          <el-select v-model="statusValue" filterable placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        :header-cell-style="{'background':'rgba(1,38,63,1)','text-align':'center','color':'rgba(94,187,220,1)'}"
        :cell-style="{'text-align':'center'}"
      >
        <el-table-column
          type="selection"
          label="全选"
          width="55"
        >
        </el-table-column>
        <el-table-column prop="date" label="来访日期"></el-table-column>
        <el-table-column prop="name" label="首次抓拍时间"></el-table-column>
        <el-table-column prop="address" label="首次抓拍图"></el-table-column>
        <el-table-column prop="address" label="最后抓拍时间"></el-table-column>
        <el-table-column prop="address" label="最后抓拍图"></el-table-column>
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
.visit_record {
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
