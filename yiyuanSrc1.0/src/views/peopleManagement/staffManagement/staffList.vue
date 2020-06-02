<template>
  <div class="staff_list">
    <!-- 员工列表 -->
    <div class="top">
      <el-form :inline="true" :model="staffSearch" class="demo-form-inline">
        <el-form-item label="姓名/工号">
          <el-input
            placeholder="请输入内容"
            v-model="staffSearch.staffName"
            clearable
            class="meeting-name"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            v-model="staffSearch.department"
            filterable
            clearable
            placeholder="全部"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getStaffList()">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="option">
        <el-button class="export" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :cell-style="{ 'text-align': 'center' }"
        stripe
      >
        <el-table-column type="selection" label="全选" width="55">
        </el-table-column>
        <el-table-column prop="workerId" label="工号"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="gender" label="性别"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="department" label="部门"> </el-table-column>
        <el-table-column prop="position" label="岗位"> </el-table-column>
        <el-table-column prop="phone" label="联系方式"> </el-table-column>
        <el-table-column prop="picUrl" label="人员照片">
          <template slot-scope="scope">
            <img :src="scope.row.picUrl" alt="" width="68.5px" height="68px" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="门禁权限">
          <template slot-scope="scope">
            <i class="el-icon-search"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "staffList",
  data() {
    return {
      staffSearch: {
        staffName: "",
        department: ""
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 10,
      options: [
        {
          value: "选项2",
          label: "行政部"
        },
        {
          value: "选项3",
          label: "科研部"
        },
        {
          value: "选项4",
          label: "后勤部"
        }
      ],
      time: "",
      workNo: ""
    };
  },
  mounted() {
    this.getStaffList();
  },
  methods: {
    select() {
      let stausList = ["", "行政部", "科研部", "后勤部"];
      this.options = dealSelectOption(stausList);
    },
    getStaffList() {
      this.$api.staffManagement
        .staffList({
          name: this.staffSearch.staffName,
          workNo: this.workNo,
          department: this.staffSearch.department,
          page: this.currentPage,
          rows: this.pageSize
        })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data.row;
            this.total = res.data.total;
          } else if (res.code == 201) {
            this.tableData = [];
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
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getVisitoRecord();
    },
    exportExcel() {
      window.location.href =
        "http://192.168.10.39:9100/personnel/stuff/export/excel?name=" +
        this.staffSearch.staffName +
        "&workNo=" +
        this.workNo +
        "&department=" +
        this.staffSearch.department;
    }
  }
};
</script>

<style lang="scss">
.staff_list {
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
        // background: url('../../../assets/image/before.png') no-repeat;
      }
    }
  }
}
</style>
