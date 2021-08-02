if (!localStorage.getItem("times")) {
  localStorage.setItem("times", [])
}
var solvesArray = localStorage.getItem("times").split(",")

export const submitTimeReducer = (state = solvesArray, action) => {
  switch (action.type) {
    case "SUBMIT": {
      var time = action.time
      if (action.time === "0.00") {
        return state
      } else if (action.time.includes(":")) {
        time = (
          Number(action.time.split(":")[0]) * 60 +
          Number(action.time.split(":")[1])
        ).toString()
        console.log(time)
      }
      solvesArray = localStorage.getItem("times")
      solvesArray = solvesArray ? solvesArray.split(",") : []
      solvesArray.unshift(time.toString())
      localStorage.setItem("times", solvesArray.toString())
      return solvesArray
    }
    default: {
      return state
    }
  }
}
