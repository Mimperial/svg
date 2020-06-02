<template>
    <div class="user module-user">
        <div class="top">
            <el-form :inline="true" :model="user" class="demo-form-inline">
              <el-form-item label="用户名称">
                <el-input v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="用户角色">
                <el-select v-model="user.role">
                  <el-option label="超级管理员" value="1"></el-option>
                  <el-option label="管理员" value="2"></el-option>
                  <el-option label="普通用户" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="searchUser">搜索</el-button>
              </el-form-item>
            </el-form>
            <div class="option">
              <el-button type="primary" @click="showUserDialog('创建')">创建</el-button>
              <el-button type="primary" @click="exportUser">导出</el-button>
            </div>
        </div>
        <div class="bottom">
          <el-table
            :data="userList"
            :header-cell-style="{'background':'#fff','text-align':'center','color':'#080808'}"
            :cell-style="{'text-align':'center'}"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名称">
            </el-table-column>
            <el-table-column
              prop="userRole"
              label="用户角色">
            </el-table-column>
            <!-- <el-table-column
              prop="createName"
              label="创建人">
            </el-table-column> -->
            <el-table-column
              prop="createTime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="option"
              label="操作">
              <template slot-scope="scope">
                <span class="edit" @click="showUserDialog('编辑',scope.row)"></span>
                <span class="remove" @click="deleteUser(scope.row)"></span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="total"
            :current-page="currentPage"
            :page-size="pagesize"
            @current-change="changeCurrent"
            >
          </el-pagination>
        </div>
        <user-dialog :option="option" :visible.sync="visible" :form="itemUser" @createUser="createUser"></user-dialog>
    </div>
</template>

<script>
import UserDialog from '@/components/UserDialog/index.vue'
export default {
  name: 'user',
  data () {
    return {
      userList: [],
      user: {
        name: '',
        role: '全部'
      },
      option: '',
      visible: false,
      itemUser: {},
      currentPage: 1,
      pagesize: 12,
      total: 0,
    }
  },
  components: {
    UserDialog
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      this.$api.user.userList({
        userName: this.user.name,
        userRole: this.user.role === '全部' ? '' : this.user.role,
        page: this.currentPage,
        rows: this.pagesize
      }).then(res => {
        if (res.code === 200) {
          this.userList = res.data.row
          this.total = res.data.total
        } else {
          this.userList = []
          this.total = 0
        }
      })
    },
    searchUser () {
      this.currentPage = 1
      this.getUserList()
    },
    showUserDialog (option, item) {
      this.visible = true
      this.option = option
      if (!item) {
        this.itemUser = {
          userName: '',
          userRole: '',
          password: ''
        }
      } else {
        let userRole
        if (item.userRole == '超级管理员') {
          userRole = '1'
        }
        if (item.userRole == '管理员') {
          userRole = '2'
        }
        if (item.userRole == '普通用户') {
          userRole = '3'
        }
        this.itemUser = {
          userName: item.username,
          userRole: userRole,
          password: '',
          id: item.id
        }
      }
    },
    createUser (data,option) {
      console.log(data)
      if (option === '创建') {
        this.$api.user.addUser(data).then(res => {
          if (res.code === 200) {
            this.visible = false
            this.$message({
              type: 'success',
              message: '创建用户成功'
            })
            this.getUserList()
          }
        })
      }
      if (option === '编辑') {
        data.id = this.itemUser.id
        this.$api.user.editUser(data).then(res => {
        if (res.code === 200) {
            this.visible = false
            this.$message({
              type: 'success',
              message: '编辑用户成功'
            })
            this.getUserList()
          }
        })
      }
    },
    deleteUser (item) {
      this.$confirm('是否确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.user.deleteUser({
          ids: parseInt(item.id)
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.currentPage = 1
            this.getUserList()
          } else {
            this.$message.error('删除失败!')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    changeCurrent(currentPage) {
      this.currentPage = currentPage;
      this.getUserList();
    },
    exportUser () {
      console.log('http://192.168.10.11:9100/user/export/excel?userName=' + this.user.name + '&userRole=' + (this.user.role === '全部'? '' : this.user.role))
      window.location.href = 'http://192.168.10.11:9100/user/export/excel?userName=' + this.user.name + '&userRole=' + (this.user.role === '全部'? '' : this.user.role)
    }
  }
}
</script>

<style lang="scss">
.user {
  // .top {
  //   .el-form-item__label {
  //       &::before {
  //           content: '';
  //           position: relative;
  //           top: 5px;
  //           right: 2px;
  //           display: inline-block;
  //           width: 16px;
  //           height: 16px;
  //           background: url('../../../assets/image/before.png') no-repeat;
  //       }
  //   }
  // }
  .bottom {
    .edit {
      display: inline-block;
      width: 25px;
      height: 25px;
      background-color: #2C6A85;
      border-radius:50% ;
      background-image: url('../../../assets/image/edit.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 13px 13px;
    }
    .remove {
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius:50% ;
      background-color: #2C6A85;
      background-image: url('../../../assets/image/close.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 11px 11px;
      margin-left: 10px;  
    }
  }
}
</style>
