const IntervalToNumber = {
  day : 1,
  week : 7,
  month : 30,
  year : 365,
}
export const getInterval = (interval : string) => {
  const now = new Date()
  if(!IntervalToNumber[interval])
    throw Error("interval의 형식이 올바르지 않습니다.")
  now.setDate(now.getDate() - IntervalToNumber[interval])
  return now
}