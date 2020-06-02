import { post, get } from '@/utils/request.js'
import { user, role } from './user_management.js'
import { floor, area, device, arithmetic } from './resource_management.js'
import { usageRate, staffManagement, visitorRecord, meetingRecord } from './people_management.js'
import { abnormalEvents, locusOrbit, crowdDensity, skeletonRecognition, bodySign } from './intelligent_analysis.js'
import { select } from './select.js'
import { dataDeck } from './data_deck.js'
// import resource from './user_management.js'
export const api = {
    user,
    role,
    floor,
    area,
    device,
    arithmetic,
    usageRate,
    staffManagement,
    visitorRecord,
    meetingRecord,
    select,
    dataDeck,
    abnormalEvents,
    locusOrbit,
    crowdDensity,
    skeletonRecognition,
    bodySign
}
export default {
    install(Vue) {
        Vue.prototype.$api = api
    }
}
