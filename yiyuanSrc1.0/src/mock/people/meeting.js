import Mock from "mockjs";

const Random = Mock.Random;

let meetingList = [];
for (let i = 0; i < 35; i++) {
  let newList = {
    url: Random.id(),
    meetingDate: Random.date(),
    startTime: Random.datetime(),
    meetingName: Random.cname(),
    area: Random.region(),
    signPerson: Random.integer(),
    joinPerson: Random.integer(),
    status: Random.boolean()
  };
  meetingList.push(newList);
}
export default {
  // 获取列表
  getMeetingList: config => {
    const { page, rows } = JSON.parse(config.body);
    const tableData = meetingList.filter(
      (item, index) => index < rows * page && index >= rows * (page - 1)
    );
    return {
      code: 200,
      data: {
        total: meetingList.length,
        rows: tableData
      }
    };
  }
};
