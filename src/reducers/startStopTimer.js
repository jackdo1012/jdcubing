export const startStopTimer = (state = false, action) => {
  switch (action.type) {
    case "START_TIMER": {
      return true
    }
    case "STOP_TIMER": {
      return false
    }
    default: {
      return state
    }
  }
}
