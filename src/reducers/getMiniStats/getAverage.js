export const firstAverageReducer = (state = "0.00", action) => {
  switch (action.type) {
    case "CALC_FIRST_AO": {
      const number = action.num
      const solves = action.times
      if (solves.length >= number && number >= 3) {
        var newList = [...solves].slice(0, number)
        var count = 0
        for (let i = 0; i < newList.length; i++) {
          if (solves[i] === "DNF") {
            count++
          } else {
            newList[i] = Number(solves[i])
          }
        }
        if (count <= 1) {
          newList = newList.filter((solve) => solve !== "DNF")
          newList.sort((a, b) => a - b)
          if (count === 0) {
            newList.shift()
            newList.pop()
          } else {
            newList.shift()
          }
          const total = newList.reduce((a, b) => a + b)
          return (total / (number - 2)).toFixed(2)
        } else {
          return "DNF"
        }
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
export const secondAverageReducer = (state = "0.00", action) => {
  switch (action.type) {
    case "CALC_SECOND_AO": {
      const number = action.num
      const solves = action.times
      if (solves.length >= number && number >= 3) {
        var newList = [...solves].slice(0, number)
        var count = 0
        for (let i = 0; i < newList.length; i++) {
          if (solves[i] === "DNF") {
            count++
          } else {
            newList[i] = Number(solves[i])
          }
        }
        if (count <= 1) {
          newList = newList.filter((solve) => solve !== "DNF")
          newList.sort((a, b) => a - b)
          if (count === 0) {
            newList.shift()
            newList.pop()
          } else {
            newList.shift()
          }
          const total = newList.reduce((a, b) => a + b)
          return (total / (number - 2)).toFixed(2)
        } else {
          return "DNF"
        }
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
