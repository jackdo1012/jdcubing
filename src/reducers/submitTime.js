if (!localStorage.getItem("times")) {
  localStorage.setItem("times", [])
}
var solvesArray = localStorage.getItem("times").split(",")

export const submitTimeReducer = (state = solvesArray, action) => {
  switch (action.type) {
    case "SUBMIT": {
      if (action.time === "0.00") {
        return state
      }
      solvesArray = localStorage.getItem("times")
      solvesArray = solvesArray ? solvesArray.split(",") : []
      solvesArray.unshift(action.time)
      localStorage.setItem("times", solvesArray.toString())
      return solvesArray
    }
    default: {
      return state
    }
  }
}
