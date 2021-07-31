export const meanReducer = (state = "0:00", action) => {
  switch (action.type) {
    case "CALC_MO": {
      const number = action.num
      if (action.times.length >= number) {
        const newList = [...action.times].slice(0, number)
        var ans = 0
        for (let i = 0; i < newList.length; i++) {
          if (newList[i] === "DNF") {
            return "DNF"
          } else {
            newList[i] = Number(action.times[i])
            ans += newList[i]
          }
        }
        return (ans / number).toFixed(2)
      } else if (action.times.length === 0) {
        return "0:00"
      }
      return state
    }
    default: {
      return state
    }
  }
}
