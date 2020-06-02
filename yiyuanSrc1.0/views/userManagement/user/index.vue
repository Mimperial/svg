<template>
    <div class="user module-user">
        <div class="top">
            <el-form :inline="true" :model="user" class="demo-form-inline">
              <el-form-item label="用户名称">
                <el-input v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="用户角色">
                <el-select v-model="user.role">
                  <el-option label="管理员1" value="管理员1"></el-option>
                  <el-option label="管理员2" value="管理员2"></el-option>
                  <el-option label="管理员3" value="管理员3"></el-option>
                  <el-option label="管理员4" value="管理员4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="searchUser">搜索</el-button>
              </el-form-item>
            </el-form>
            <div class="option">
              <el-button type="primary" @click="showUserDialog('创建')">创建</el-button>
              <el-button type="primary">导出</el-button>
            </div>
        </div>
        <div class="bottom">
          <el-table
            :data="userList"
            :header-cell-style="{'background':'rgba(1,38,63,1)','text-align':'center','color':'rgba(94,187,220,1)'}"
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
            <el-table-column
              prop="createName"
              label="创建人">
            </el-table-column>
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
      this.$http.post('/user/findAll',{
        username: this.user.name,
        userRole: this.user.role === '全部' ? '' : this.user.role,
        page: this.currentPage,
        rows: this.pagesize
      }).then(res => {
        this.userList = res.data.data.row
        this.total = res.data.data.total
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
          username: '',
          userRole: '',
          pwd: ''
        }
      } else {
        this.itemUser = {
          username: item.username,
          userRole: item.userRole,
          pwd: '',
          id: item.id
        }
      }
    },
    createUser (data,option) {
      if (option === '创建') {
        this.$http.post('/user/addUser', data).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.visible = false
            this.$message({
              type: 'success',
              message: '创建成功'
            })
            this.getUserList()
          }
        })
      }
      if (option === '编辑') {
        data.id = this.itemUser.id
        this.$http.post('/user/update', data).then((res) => {
          if (res.data.code === 200) {
            this.visible = false
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.getUserList()
          }
        })
      }
    },
    deleteUser (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/user/delete',{
          ids: [item.id]
        }).then(res => {
          if (res.data.code === 200) {
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
    }
  }
}
</script>

<style lang="scss">
.user {
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
  .bottom {
    .edit {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('../../../assets/image/edit.png') no-repeat;    
    }
    .remove {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('../../../assets/image/close.png') no-repeat;
      margin-left: 10px;  
    }
  }
}
</style>
