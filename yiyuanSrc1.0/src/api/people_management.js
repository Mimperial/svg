/* 人员管理中心 */
import { post, get } from '@/utils/request.js'

export const usageRate = {
    usageRateList: (data) => post('/personnel/utilizationRate', data), // 获取使用率表格
    lookDetail: (data) => post('/personnel/utilizationRate/detail', data), // 获取使用率查看
}

export const staffManagement = {
    goThroughRecord: (data) => post('/personnel/trafficRecord', data), // 通行记录
    staffList: (data) => post('/personnel/stuff', data), // 员工列表
}

export const visitorRecord = {
    visitorRecord: (data) => post('/personnel/visitor', data), // 访客记录
}

export const meetingRecord = {
    meetingRecord: (data) => post('/personnel/meetings', data), // 会议记录
    findPersonByMeetingId: (data) => post('/personnel/meetings/findPersonByMeetingId', data), // 人员相关
}