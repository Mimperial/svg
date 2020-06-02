/* 数据驾驶舱 */
import {post,get} from '@/utils/request.js'

export const dataDeck = {
    yesterdayPeopleNumber: () => post('/webSocket/yesterdayPeopleNumber')
}