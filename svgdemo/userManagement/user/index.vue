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
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button>搜索</el-button>
              </el-form-item>
            </el-form>
            <div class="option">
              <el-button type="primary" @click="createUser">创建</el-button>
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
                <span class="edit" @click="editUser(scope.row)"></span>
                <span class="remove" @click="deleteUser(scope.row)"></span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :total="20"
            >
          </el-pagination>
        </div>
        <user-dialog :option="option" :visible.sync="visible" :form="itemUser"></user-dialog>
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
      itemUser: {}
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
      this.$http.get('/user/findAll').then(res => {
        this.userList = res.data
      })
    },
    createUser () {
      this.visible = true
      this.option = '创建'
      this.itemUser = {}
    },
    editUser (item) {
      this.visible = true
      this.option = '编辑'
      this.itemUser = item
    },
    deleteUser (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
