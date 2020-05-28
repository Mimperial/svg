import Mock from 'mockjs'
import { userData } from './user/user.js'
import { roleData } from './user/role.js'
import { floorData } from './resource/floor.js'
import { relatedman } from './people/relatedman.js'
import { meetingData } from './people/meeting.js'

export const userList = Mock.mock('http://localhost:8080/user/findAll', 'get', userData)
export const roleList = Mock.mock('http://localhost:8080/user/role/findAll', 'get', roleData)
export const floorList = Mock.mock('http://localhost:8080/resource/floor/findAll', 'get', floorData)
export const relatedmanList = Mock.mock('http://localhost:8080/personnel/meetings/findPersonByMeetingId', 'get', relatedman)
export const meetingList = Mock.mock('http://localhost:8080/personnel/meetings/findPersonByMeetingId', 'get', meetingData)

