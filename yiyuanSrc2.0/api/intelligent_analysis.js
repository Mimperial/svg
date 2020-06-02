/* AI智能分析 */
import { post, get } from '@/utils/request.js'

export const abnormalEvents = {
    abnormalEventsList: (data) => post('/ai/abnormalEvents/findAll', data), // 获取异常事件表格
}

export const locusOrbit = {
    locusOrbitImg: (data) => post('/ai/locusOrbit/findAll', data), // 人员动线图
    locusOrbitList: (data) => post('/ai/locusOrbit/table/findAll', data), // 人员动线表格
}

export const crowdDensity = {
    crowdDensityList: (data) => post('/ai/crowdDensity', data), // 人群密度
}

export const skeletonRecognition = {
    skeletonRecognitionList: (data) => post('/ai/skeletonRecognition', data), // 骨骼识别
}

export const bodySign = {
    bodySignList: (data) => post('/ai/bodySign', data), // 体征数据
    bodySignTodayChart: (data) => post('/ai/bodySign/single/today', data), // 个体今日数据
    bodySignHistoryChart: (data) => post('ai/bodySign/single/history', data), // 个体历史数据
    signWeight: (data) => post('/ai/weight', data), // 体重记录
    emotionRecord: (data) => post('/ai/emotion', data), // 情绪记录
}