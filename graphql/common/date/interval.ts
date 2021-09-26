const IntervalToNumber = {
  day : 1,
  weak : 7,
  mounth : 30,
  year : 365,
}
export const intervalFuncs = (interval : string) => {
  const now = new Date()
  if(!IntervalToNumber[interval])
    throw Error("interval의 형식이 올바르지 않습니다.")
  now.setDate(now.getDate() - IntervalToNumber[interval])
  return now
}