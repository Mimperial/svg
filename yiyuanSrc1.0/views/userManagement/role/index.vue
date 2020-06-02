<template>
    <div class="role">
      <div class="bottom">
        <el-table
          :data="roleList"
          :header-cell-style="{'background':'rgba(1,38,63,1)','text-align':'center','color':'rgba(94,187,220,1)'}"
          :cell-style="{'text-align':'center'}"
          stripe
          style="width: 100%">
          <el-table-column
            prop="role"
            label="角色名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="grant"
            label="权限范围">
          </el-table-column>
        </el-table>
      </div>
     
    </div>
</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      roleList: []
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      this.$http.post('/user/role/findAll').then(res => {
        this.roleList = res.data.data.row
        console.log(this.roleList)
      })
    }
  }
}
</script>

<style lang="scss">
.role {
  flex:1;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  padding-left: 20px;
  .bottom {
    flex: 1;
    background: rgba(22,78,102,.25);
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
