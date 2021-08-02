export const getSecondAo = (solves, number) => {
  return {
    type: "CALC_SECOND_AO",
    times: solves,
    num: number,
  }
}
export const getSecondMo = (solves, number) => {
  return {
    type: "CALC_SECOND_MO",
    times: solves,
    num: number,
  }
}
