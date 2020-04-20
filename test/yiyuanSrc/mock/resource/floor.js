import Mock from 'mockjs'

const Random = Mock.Random

export const floorData = () => {
  let floorList = []
  for (let i = 0; i < 12; i++) {
    let newList = {
      'floorId': Random.integer(1, 15) + '层',
      'ichnography': Random.image(),
      'cubicChart': Random.image(),
      'creator': Random.cname(),
      'createTime': Random.datetime()
    }
    floorList.push(newList)
  }
  return floorList
}
