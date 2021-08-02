export const firstMeanReducer = (state = "0.00", action) => {
  switch (action.type) {
    case "CALC_FIRST_MO": {
      const number = action.num
      const solves = action.times
      if (solves.length >= number) {
        const newList = [...solves].slice(0, number)
        var ans = 0
        for (let i = 0; i < newList.length; i++) {
          if (newList[i] === "DNF") {
            return "DNF"
          } else {
            newList[i] = Number(solves[i])
            ans += newList[i]
          }
        }
        return (ans / number).toFixed(2)
      } else if (solves.length === 0) {
        return "0.00"
      }
      return "0:.0"
    }
    default: {
      return state
    }
  }
}
export const secondMeanReducer = (state = "0.00", action) => {
  switch (action.type) {
    case "CALC_SECOND_MO": {
      const number = action.num
      const solves = action.times
      if (solves.length >= number) {
        const newList = [...solves].slice(0, number)
        var ans = 0
        for (let i = 0; i < newList.length; i++) {
          if (newList[i] === "DNF") {
            return "DNF"
          } else {
            newList[i] = Number(solves[i])
            ans += newList[i]
          }
        }
        return (ans / number).toFixed(2)
      } else if (solves.length === 0) {
        return "0.00"
      }
      return "0.00"
    }
    default: {
      return state
    }
  }
}
