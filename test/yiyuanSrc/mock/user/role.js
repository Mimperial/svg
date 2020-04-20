import Mock from 'mockjs'

const Random = Mock.Random

export const roleData = () => {
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
  return roleList
}
