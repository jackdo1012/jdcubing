export const getWorst = (solves) => {
  return {
    type: "GET_WORST",
    solves,
  }
}
