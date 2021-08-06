export const dnfReducer = (state = "0:00", action) => {
  switch (action.type) {
    case "DNF": {
      const solves = localStorage.getItem(`times${action.session}`).split(",")
      solves.shift()
      localStorage.setItem(`times${action.session}`, ["DNF", ...solves])
      return "DNF"
    }
    default: {
      return state
    }
  }
}
