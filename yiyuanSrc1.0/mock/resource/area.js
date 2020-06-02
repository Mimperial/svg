import Mock from 'mockjs'

const Random = Mock.Random

let areaList = []
for (let i = 0; i < 30; i++) {
  let newList = {
    'aid': Random.integer(1, 10),
    'floorId': Random.integer(1, 10) + '层',
    'areaType': '实验室',
    'areaName': '大厅',
    'coordinatesX': Random.float(1.00,180.00),
    'coordinatesY': Random.float(1.00,180.00),
    'creator': Random.cname(),
    'createTime': Random.datetime()
  }
  areaList.push(newList)
}

export default {
  // 获取列表
  getAreaList: config => {
    const {page, rows} = JSON.parse(config.body)
    const pageList = areaList.filter((item, index) => index < rows * page && index >= rows * (page - 1))
    return {
      code: 200,
      data: {
        total: areaList.length,
        row: pageList
      }
    }
  }
}