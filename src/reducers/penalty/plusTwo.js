export const plusTwoReducer = (state = "0:00", action) => {
  switch (action.type) {
    case "PLUS_TWO": {
      const solves = localStorage.getItem(`times${action.session}`).split(",")
      var newTime = [
        Number(solves[0].split(".")[0]) + 2,
        solves[0].split(".")[1],
      ].join(".")
      solves.shift()
      const newList = [newTime, ...solves]
      localStorage.setItem(`times${action.session}`, newList)
      if (newTime.split(".")[0].length === 1) {
        return "0" + newTime
      }
      return newTime
    }
    default: {
      return state
    }
  }
}
