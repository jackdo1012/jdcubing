export const getBestReducer = (state = "0:00", action) => {
  switch (action.type) {
    case "GET_BEST": {
      const solves = action.solves
      if (
        Math.min(...solves.filter((solve) => solve !== "DNF")).toFixed(2) ==
        Infinity
      ) {
        return "0.00"
      } else {
        return Math.min(...solves.filter((solve) => solve !== "DNF")).toFixed(2)
      }
    }
    default: {
      return state
    }
  }
}
export const getWorstReducer = (state = "0:00", action) => {
  switch (action.type) {
    case "GET_BEST": {
      const solves = action.solves
      if (solves.includes("DNF")) {
        return "DNF"
      } else {
        return Math.max(...solves).toFixed(2)
      }
    }
    default: {
      return state
    }
  }
}
