export const changeSessionReducer = (state = 1, action) => {
  switch (action.type) {
    case "CHANGE_SESSION": {
      return action.session
    }
    default: {
      return state
    }
  }
}
