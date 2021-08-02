export const getFirstAo = (solves, number) => {
  return {
    type: "CALC_FIRST_AO",
    times: solves,
    num: number,
  }
}
export const getFirstMo = (solves, number) => {
  return {
    type: "CALC_FIRST_MO",
    times: solves,
    num: number,
  }
}
