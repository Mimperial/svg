/* 人员管理中心 */
export default [
    {
      path: 'usageRate',
      component: () => import('@/views/peopleManagement/usageRate/usageRateRecord.vue'),
      meta: {
        title: '使用率'
      }
    },
    {
      path: 'usageRateRecord',
      component: () => import('@/views/peopleManagement/usageRate/usageRateRecord.vue'),
      meta: {
        title: '使用率记录'
      }
    },
    {
      path: 'usageRateAnalyse',
      component: () => import('@/views/peopleManagement/usageRate/usageRateAnalyse.vue'),
      meta: {
        title: '使用率分析'
      }
    },
    {
      path: 'staffManagement',
      component: () => import('@/views/peopleManagement/staffManagement/goThroughRecord.vue'),
      meta: {
        title: '员工管理'
      }
    },
    {
      path: 'goThroughRecord',
      component: () => import('@/views/peopleManagement/staffManagement/goThroughRecord.vue'),
      meta: {
        title: '通行记录'
      }
    },
    {
      path: 'staffList',
      component: () => import('@/views/peopleManagement/staffManagement/staffList.vue'),
      meta: {
        title: '员工列表'
      }
    },
    {
      path: 'visitoRecord',
      component: () => import('@/views/peopleManagement/visitoRecord/index.vue'),
      meta: {
        title: '访客记录'
      }
    },
    {
      path: 'meetingRecord',
      component: () => import('@/views/peopleManagement/meetingRecord/index.vue'),
      meta: {
        title: '会议记录'
      }
    },
  ]