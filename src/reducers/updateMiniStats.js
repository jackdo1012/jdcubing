export const updateFirstMiniReducer = (state = ["ao", 5], action) => {
  switch (action.type) {
    case "UPDATE_FIRST_MINI": {
      const functionStorage = JSON.parse(localStorage.getItem("function"))
      functionStorage.firstType = action.value
      functionStorage.firstLength = action.amount
      localStorage.setItem("function", JSON.stringify(functionStorage))
      return [action.value, action.amount]
    }
    default: {
      return state
    }
  }
}
export const updateSecondMiniReducer = (state = ["mo", 5], action) => {
  switch (action.type) {
    case "UPDATE_SECOND_MINI": {
      const functionStorage = JSON.parse(localStorage.getItem("function"))
      functionStorage.secondType = action.value
      functionStorage.secondLength = action.amount
      localStorage.setItem("function", JSON.stringify(functionStorage))
      return [action.value, action.amount]
    }
    default: {
      return state
    }
  }
}
