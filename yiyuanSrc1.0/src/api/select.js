// 所有下拉数据
import { post } from '@/utils/request.js'

export const select = {
    floor: () => post('/resource/floor/dropdown'),
    area: () => post('/resource/area/dropdown'),
    areaType: () => post('/resource/area/areaTypeDropdown'),
    device: (data) => post('/resource/device/dropdown',data),
    deviceType: () => post('/resource/device/equipmentTypeDropdown')
}