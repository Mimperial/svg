import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login' // 登录页
import Home from '@/views/index' // 主界面
import DataDeck from '@/views/dataDeck/index' // 数据驾驶舱
import Intelligent from '@/views/intelligentAnalysis/index' // 智能分析
import People from '@/views/peopleManagement/index' // 人员管理中心
// import OperationSpecification from '@/views/operationSpecification/index' // 操作规范
import Resource from '@/views/ResourceManagement/index' // 资源管理
import User from '@/views/UserManagement/index' // 用户管理

// 子路由
// import Visual from './data_deck.js' // 数据驾驶舱
import IntelligentAnalysis from './intelligent_analysis.js' // 智能分析
import PeopleMangement from './people_management.js' // 人员管理中心
import ResourceManagement from './resource_management.js' // 资源管理
import userManagement from './user_management.js' // 用户管理
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: 'index',
          name: 'index',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'visual_large_screen',
          name: 'dataDeck',
          component: DataDeck,
          meta: {
            title: '数据驾驶舱'
          }
        },
        {
          path: 'intelligent_analysis',
          name: 'intelligentAnalysis',
          component: Intelligent,
          redirect: '/home/intelligent_analysis/anomalousEvent',
          meta: {
            title: 'AI智能分析'
          },
          children: IntelligentAnalysis
        },
        {
          path: 'people_management',
          name: 'peopleManagement',
          component: People,
          redirect: '/home/people_management/meetingRecord',
          meta: {
            title: '人员管理中心'
          },
          children: PeopleMangement
        },
        {
          path: 'resource_management',
          name: 'ResourceManagement',
          component: Resource,
          redirect: '/home/resource_management/floor',
          meta: {
            title: '资源管理'
          },
          children: ResourceManagement
        },
        {
          path: 'user_management',
          name: 'UserManagement',
          component: User,
          redirect: '/home/user_management/user',
          meta: {
            title: '用户管理'
          },
          children: userManagement
        }
      ]
    }
  ]
})
