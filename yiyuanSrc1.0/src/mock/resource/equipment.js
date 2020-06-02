import Mock from 'mockjs'

const Random = Mock.Random

let equipmentList = []
  for (let i = 0; i < 34; i++) {
    let newList = {
      'id': i,
      'equipId': Random.integer(1, 20) + '层',
      'name': '摄像头' + (i + 1),
      'equipType': '枪机' + i,
      'equipUrl': 'rtsp://admin:ad123456@192.168.10.67:554',
      'equipIp': '192.168.10.75',
      'area': '大厅' + i,
      'equipDiscription': '设备' + i,
      'equipStatus': '在线',
      'creator': Random.cname(),
      'createTime': Random.datetime()
    }
    equipmentList.push(newList)
  }

export default {
  // 获取列表
  getEquipmentList: config => {
    const {page, rows} = JSON.parse(config.body)
    const pageList = equipmentList.filter((item, index) => index < rows * page && index >= rows * (page - 1))
    return {
      code: 200,
      data: {
        total: equipmentList.length,
        row: pageList
      }
    }
  }
}
