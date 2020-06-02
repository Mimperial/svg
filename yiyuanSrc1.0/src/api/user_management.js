/* 用户管理 */
import { post } from '@/utils/request.js'
import qs from 'qs'
export const user = {
    // login: (data) => post('/login', data), // 登录
    login: (data) => post('/login?username=' + data.username + '&password=' + data.password), // 登录
    userList: (data) => post('/user/findAll', data), // 获取用户列表
    addUser: (data) => post('/user/addUser', data), // 创建用户
    editUser: (data) => post('/user/update', data), // 编辑用户
    deleteUser: (data) => post('/user/delete?ids=' + data.ids), // 删除用户
}

export const role = {
    roleList: () => post('/user/role/findAll') // 获取角色列表
}