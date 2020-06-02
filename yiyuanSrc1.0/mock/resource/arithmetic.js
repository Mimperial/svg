import Mock from 'mockjs'

const Random = Mock.Random

let arithmeticList = []
for (let i = 0; i < 28; i++) {
  let newList = {
    'id': i,
    'equipId': i,
    'name': '摄像头' + (i + 1),
    'equipType': '枪机' + i,
    'floor': i + 1,
    'aiType': '人脸' + i,
    'area': '大厅' + i,
    'algorithmTask': 'xxxxxxxxxxxxxxx',
    'algorithmParams': 'xxxxxxxxxxxxxxx',
    'algorithmStatus': '在线'
  }
  arithmeticList.push(newList)
}

export default {
  // 获取列表
  getArithmeticList: config => {
    const {page, rows} = JSON.parse(config.body)
    const pageList = arithmeticList.filter((item, index) => index < rows * page && index >= rows * (page - 1))
    return {
      code: 200,
      data: {
        total: arithmeticList.length,
        row: pageList
      }
    }
  }
}
