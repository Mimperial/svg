/* 资源管理 */
export default [
  {
    path: 'floor',
    name: 'floor',
    component: () => import('@/views/resourceManagement/district/floor.vue'),
    meta: {
      title: '楼层管理'
    }
  },
  {
    path: 'area',
    name: 'area',
    component: () => import('@/views/resourceManagement/district/area.vue'),
    meta: {
      title: '区域管理'
    }
  },
  {
    path: 'equipment',
    name: 'equipment',
    component: () => import('@/views/resourceManagement/equipment/index.vue'),
    meta: {
      title: '设备管理'
    }
  },
  {
    path: 'arithmetic',
    name: 'arithmetic',
    component: () => import('@/views/resourceManagement/arithmetic/index.vue'),
    meta: {
      title: 'AI算法管理'
    }
  }
]
