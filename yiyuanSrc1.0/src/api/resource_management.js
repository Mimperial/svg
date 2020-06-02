/* 资源管理 */
import { post, get } from '@/utils/request.js'
export const floor = {
    floorList: (data) => post('/resource/floor/findAll', data), // 获取列表
    addFloor: (data) => post('/resource/floor/add', data), // 新建楼层
    editFloor: (data) => post('/resource/floor/update', data), // 编辑楼层
    deleteFloor: (data) => post('/resource/floor/delete?ids=' + data.ids), // 删除楼层
    exportFloor: () => get('/resource/floor/export/excel') // 导出楼层excel
}

export const area = {
    areaList: (data) => post('/resource/area/findAll', data),
    deleteArea: (data) => post('/resource/area/delete?ids=' + data.ids),
    addArea: (data) => post('/resource/area/add', data),
    editArea: (data) => post('/resource/area/update', data),
    findOne: (data) => post('/resource/area/findOne', data),
    exportArea: (data) => post('/resource/area/export/excel', data) // 导出区域excel
}

export const device = {
    deviceList: (data) => post('/resource/device/findAll', data), // 获取列表
    findOne: (data) => post('/resource/device/findOne?id='+ data.id), // 查找某一个设备
    addDevice: (data) => post('/resource/device/add', data), // 新增设备
    editDevice: (data) => post('/resource/device/update', data), // 编辑设备
    deleteDevice: (data) => post('/resource/device/delete?ids=' + data.ids), // 删除设备
    exportDevice: (data) => post('/resource/device/export/excel', data), // 导出设备excel
    testDeviceIP: (data) => post('/resource/device/streamTest?equipUrl=' + data.equipUrl)
}

export const arithmetic = {
    arithmeticList: (data) => post('/resource/algorithm/findAll', data),
    addArithmetic: (data) => post('/resource/algorithm/add', data), // 新增算法
    deleteArithmetic: (data) => post('/resource/algorithm/delete?ids=' + data.ids),
    editArithmetic: (data) => post('/resource/algorithm/update', data), // 编辑算法
    exportArithmetic: (data) => post('/resource/algorithm/export/excel', data) // 导出算法excel
}