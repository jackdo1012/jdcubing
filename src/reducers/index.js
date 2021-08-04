import { combineReducers } from "redux"
import {
  firstAverageReducer,
  secondAverageReducer,
} from "./getMiniStats/getAverage"
import { firstMeanReducer, secondMeanReducer } from "./getMiniStats/getMean"
import { getSolvesReducer } from "./getStats/getNumberOfSolves"
import { startStopTimer } from "./startStopTimer"
import { submitTimeReducer } from "./submitTime"
import {
  updateFirstMiniReducer,
  updateSecondMiniReducer,
} from "./updateMiniStats/updateMiniStats"
import { getBestReducer, getWorstReducer } from "./getStats/getBestAndWorst"
import { dnfReducer } from "./penalty/dnf"
import { plusTwoReducer } from "./penalty/plusTwo"
import { changeSessionReducer } from "./changeSession"

const rootReducer = combineReducers({
  firstAverage: firstAverageReducer,
  firstMean: firstMeanReducer,
  secondAverage: secondAverageReducer,
  secondMean: secondMeanReducer,
  startOrStop: startStopTimer,
  submit: submitTimeReducer,
  getSolvesStats: getSolvesReducer,
  updateFirstStat: updateFirstMiniReducer,
  updateSecondStat: updateSecondMiniReducer,
  getBest: getBestReducer,
  getWorst: getWorstReducer,
  dnf: dnfReducer,
  plusTwo: plusTwoReducer,
  session: changeSessionReducer,
})
export default rootReducer
