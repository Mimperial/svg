import Mock from 'mockjs'

const Random = Mock.Random

let userList = []
for (let i = 0; i < 18; i++) {
  let newList = {
    'id': (i + 1),
    'username': Random.cname(),
    'userRole': '管理员' + (i + 1),
    'createName': Random.cname(),
    'createTime': Random.datetime()
  }
  userList.push(newList)
}

export default {
  // 获取列表
  getUserList: config => {
    const {username, userRole, page, rows} = JSON.parse(config.body)
    const mockList = userList.filter(user => {
      if ((username && user.username.indexOf(username) === -1) || (userRole && user.userRole !== userRole)) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < rows * page && index >= rows * (page - 1))
    return {
      code: 200,
      data: {
        total: mockList.length,
        row: pageList
      }
    }
  },
  // 删除用户
  deleteItemUser: config => {
    const { ids } = JSON.parse(config.body)
    userList = userList.filter(u => u.id !== ids[0])
    return {
      code: 200,
      data: {
        message: '删除成功'
      }
    }
  },
  // 增加用户
  addUser: config => {
    const {username, userRole} = JSON.parse(config.body)
    userList.unshift({
      'id': userList.length + 1,
      'username': username,
      'userRole': userRole,
      'createName': Random.cname(),
      'createTime': Random.datetime()
    })
    return {
      code: 200,
      data: {
        message: '创建成功'
      }
    }
  },
  // 编辑用户
  editUser: config => {
    const {id, username, userRole} = JSON.parse(config.body)
    userList.some(user => {
      if (user.id === id) {
        user.username = username
        user.address = userRole
        return true
      }
    })

    return {
      code: 200,
      data: {
        message: '创建成功'
      }
    }
  }
}
