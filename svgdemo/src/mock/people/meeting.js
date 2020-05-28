import Mock from 'mockjs'

const Random = Mock.Random

export const meetingData = () => {
  let meetingList = []
  for (let i = 0; i < 5; i++) {
    let newList = {
      'url': Random.id(),
      'meetingDate': Random.date(),
      'startTime': Random.datetime(),
      'meetingName': Random.cname(),
      'area': Random.region(),
      'signPerson': Random.integer(),
      'joinPerson': Random.integer(),
      'status': Random.boolean(),
    }
    meetingList.push(newList)
  }
  return meetingList
}