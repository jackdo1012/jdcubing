export const getBest = (solves) => {
  return {
    type: "GET_BEST",
    solves,
  }
}
