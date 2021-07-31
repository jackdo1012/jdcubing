import { combineReducers } from "redux"
import { averageReducer } from "./getAverage"
import { meanReducer } from "./getMean"
import { getSolvesReducer } from "./getNumberOfSolves"
import { startStopTimer } from "./startStopTimer"
import { submitTimeReducer } from "./submitTime"

const rootReducer = combineReducers({
  ao: averageReducer,
  mo: meanReducer,
  startOrStop: startStopTimer,
  submit: submitTimeReducer,
  getSolvesStats: getSolvesReducer,
})
export default rootReducer
