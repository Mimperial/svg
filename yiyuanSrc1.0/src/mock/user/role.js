import Mock from 'mockjs'

const Random = Mock.Random

let roleList = []
for (let i = 0; i < 5; i++) {
  let newList = {
    'id': Random.id(),
    'role': Random.cname(),
    'grant': Random.cparagraph(1),
    'createTime': Random.datetime()
  }
  roleList.push(newList)
}

export default {
  // 获取列表
  getRoleList: config => {
    return {
      code: 200,
      data: {
        total: roleList.length,
        row: roleList
      }
    }
  }
}
