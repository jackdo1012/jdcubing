export const averageReducer = (state = "0:00", action) => {
  switch (action.type) {
    case "CALC_AO": {
      const number = action.num
      if (action.times.length >= number && number >= 3) {
        var newList = [...action.times].slice(0, number)
        var count = 0
        for (let i = 0; i < newList.length; i++) {
          if (action.times[i] === "DNF") {
            count++
          } else {
            newList[i] = Number(action.times[i])
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
      } else if (action.times.length === 0) {
        return "0:00"
      }
      return "0:00"
    }
    default: {
      return state
    }
  }
}
