export const getSolvesReducer = (state = "0/0", action) => {
  switch (action.type) {
    case "GET_SOLVES_STATS": {
      const solvesDone = action.solves.length
      const solvesComplete = [...action.solves].filter(
        (solve) => solve !== "DNF"
      ).length
      for (let solve of action.solves) {
        if (solve === "") {
          return "0/0"
        }
      }
      return `${solvesComplete}/${solvesDone}`
    }
    default: {
      return state
    }
  }
}
