export const getAo = (solves, number) => {
  return {
    type: "CALC_AO",
    times: solves,
    num: number,
  }
}
export const getMo = (solves, number) => {
  return {
    type: "CALC_MO",
    times: solves,
    num: number,
  }
}
