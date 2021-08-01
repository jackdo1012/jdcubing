import { combineReducers } from "redux"
import { averageReducer } from "./getAverage"
import { meanReducer } from "./getMean"
import { getSolvesReducer } from "./getNumberOfSolves"
import { startStopTimer } from "./startStopTimer"
import { submitTimeReducer } from "./submitTime"
import {
  updateFirstMiniReducer,
  updateSecondMiniReducer,
} from "./updateMiniStats"

const rootReducer = combineReducers({
  ao: averageReducer,
  mo: meanReducer,
  startOrStop: startStopTimer,
  submit: submitTimeReducer,
  getSolvesStats: getSolvesReducer,
  updateFirstStat: updateFirstMiniReducer,
  updateSecondStat: updateSecondMiniReducer,
})
export default rootReducer
