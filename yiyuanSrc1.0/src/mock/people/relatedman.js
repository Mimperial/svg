import Mock from 'mockjs'

const Random = Mock.Random

export const relatedData = () => {
  let relatedList = []
  for (let i = 0; i < 5; i++) {
    let newList = {
      'url': Random.id(),
      'serialNum': Random.cname(),
      'workNo': Random.cparagraph(1),
      'name': Random.datetime(),
      'sex': Random.datetime(),
      'age': Random.datetime(),
      'department': Random.datetime(),
      'post': Random.datetime(),
      'phone': Random.datetime(),
      'signInStatus': Random.datetime(),
      'firstUrl': Random.datetime(),
    }
    relatedList.push(newList)
  }
  return relatedList
}