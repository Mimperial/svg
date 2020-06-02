/* 用户管理 */
export default [
  {
    path: 'user',
    component: () => import('@/views/userManagement/user/index.vue'),
    meta: {
      title: '用户管理'
    }
  },
  {
    path: 'role',
    component: () => import('@/views/userManagement/role/index.vue'),
    meta: {
      title: '角色管理'
    }
  }
]
