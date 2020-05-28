<template>
    <div class="role">
      <el-table
        :data="roleList"
        :header-cell-style="{'background':'#FAFAFA','text-align':'center'}"
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
      this.$http.get('/user/role/findAll').then(res => {
        this.roleList = res.data
        console.log(this.roleList)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.role {
  flex:1;
  padding: 20px;
  box-sizing: border-box;
}
</style>
