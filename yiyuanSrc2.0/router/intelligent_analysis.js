/* AI智能分析 */
export default [
    {
      path: 'anomalousEvent',
      name: 'anomalousEvent',
      component: () => import('@/views/intelligentAnalysis/anomalousEvent/index.vue'),
      meta: {
        title: '异常事件'
      }
    },
    {
      path: 'peopleMoveLine',
      name: 'peopleMoveLine',
      component: () => import('@/views/intelligentAnalysis/peopleMoveLine/index.vue'),
      meta: {
        title: '人员动线'
      }
    },
    {
      path: 'crowdDensity',
      name: 'crowdDensity',
      component: () => import('@/views/intelligentAnalysis/crowdDensity/index.vue'),
      meta: {
        title: '人群密度'
      }
    },
    {
      path: 'boneIdentification',
      name: 'boneIdentification',
      component: () => import('@/views/intelligentAnalysis/boneIdentification/index.vue'),
      meta: {
        title: '骨骼识别'
      }
    },
    {
      path: 'signData',
      name: 'signData',
      component: () => import('@/views/intelligentAnalysis/signData/signRecord.vue'),
      meta: {
        title: '体征数据'
      }
    },
    {
      path: 'signRecord',
      name: 'signRecord',
      component: () => import('@/views/intelligentAnalysis/signData/signRecord.vue'),
      meta: {
        title: '体征记录'
      }
    },
    {
      path: 'signAnalyse',
      name: 'signAnalyse',
      component: () => import('@/views/intelligentAnalysis/signData/signAnalyse.vue'),
      meta: {
        title: '体征分析'
      }
    },
  ]
  