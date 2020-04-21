import Mock from 'mockjs'
import userAPI from './user/user.js'
import roleAPI from './user/role.js'
import floorAPI from './resource/floor.js'
import areaAPI from './resource/area.js'
import equipmentAPI from './resource/equipment.js'
import arithmeticAPI from './resource/arithmetic.js'

import { relatedData } from './people/relatedman.js'
import meetingAPI from './people/meeting.js'
Mock.setup({
    timeout: '300-600'
})
// 用户模块
// 用户
Mock.mock('http://localhost:8080/user/findAll', 'post', userAPI.getUserList) // 查询
Mock.mock('http://localhost:8080/user/delete', 'post', userAPI.deleteItemUser) // 删除
Mock.mock('http://localhost:8080/user/addUser', 'post', userAPI.addUser) // 创建
Mock.mock('http://localhost:8080/user/update', 'post', userAPI.editUser) // 创建

// 角色
Mock.mock('http://localhost:8080/user/role/findAll', 'post', roleAPI.getRoleList)

// 资源模块
// 区域管理 - 楼层管理
Mock.mock('http://localhost:8080/resource/floor/findAll', 'post', floorAPI.getFloorList)

// 区域管理 - 区域管理
Mock.mock('http://localhost:8080/resource/area/findAll', 'post', areaAPI.getAreaList)

// 设备管理
Mock.mock('http://localhost:8080/resource/device/findAll', 'post', equipmentAPI.getEquipmentList)

// 算法管理
Mock.mock('http://localhost:8080/resource/algorithm/findAll', 'post', arithmeticAPI.getArithmeticList)

export const relatedmanList = Mock.mock('http://localhost:8080/personnel/meetings/findPersonByMeetingId', 'get', relatedData)

// 人员模块--会议
Mock.mock('http://localhost:8080/personnel/meetings/findPersonByMeetingId', 'post', meetingAPI.getMeetingList)
