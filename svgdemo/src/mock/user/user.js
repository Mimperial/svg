import Mock from 'mockjs'

const Random = Mock.Random

export const userData = () => {
  let userList = []
  for (let i = 0; i < 12; i++) {
    let newList = {
      'username': Random.cname(),
      'userRole': Random.cname(),
      'createName': Random.cname(),
      'createTime': Random.datetime()
    }
    userList.push(newList)
  }
  return userList
}
