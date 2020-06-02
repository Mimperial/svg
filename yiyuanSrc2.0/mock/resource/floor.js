import Mock from 'mockjs'

const Random = Mock.Random

let floorList = []
for (let i = 0; i < 25; i++) {
  let newList = {
    'floorId': Random.integer(1, 15) + '层',
    'ichnography': Random.image(),
    'cubicChart': Random.image(),
    'creator': Random.cname(),
    'createTime': Random.datetime()
  }
  floorList.push(newList)
}

export default {
  // 获取列表
  getFloorList: config => {
    const {page, rows} = JSON.parse(config.body)
    const pageList = floorList.filter((item, index) => index < rows * page && index >= rows * (page - 1))
    return {
      code: 200,
      data: {
        total: floorList.length,
        row: pageList
      }
    }
  }
}