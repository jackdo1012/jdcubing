import { configureStore } from "@reduxjs/toolkit"
import getFirstMiniStatReducer from "./getMiniStats/getFirstMiniStat"
import getSecondMiniStatReducer from "./getMiniStats/getSecondMiniStat"
import getNumberOfSolvesReducer from "./getStats/getNumberOfSolves"
import startStopTimer from "./startStopTimer"
import submitTimeReducer from "./submitTime"
import updateFirstMiniReducer from "./updateMiniStats/updateFirstMiniStats"
import updateSecondMiniReducer from "./updateMiniStats/updateSecondMiniStats"
import getBestReducer from "./getStats/getBest"
import getWorstReducer from "./getStats/getWorst"
import dnfReducer from "./penalty/dnf"
import plusTwoReducer from "./penalty/plusTwo"
import changeSessionReducer from "./changeSession"
import showHideSettingReducer from "./showHideSetting"

const store = configureStore({
	reducer: {
		firstMiniStats: getFirstMiniStatReducer, // with redux toolkit
		secondMiniStats: getSecondMiniStatReducer, // with redux toolkit
		startOrStop: startStopTimer, // with redux toolkit
		submit: submitTimeReducer,
		numberOfSolves: getNumberOfSolvesReducer, // with redux toolkit
		updateFirstMiniStat: updateFirstMiniReducer, // with redux toolkit
		updateSecondMiniStat: updateSecondMiniReducer, // with redux toolkit
		getBest: getBestReducer, // with redux toolkit
		getWorst: getWorstReducer, // with redux toolkit
		dnf: dnfReducer, // with redux toolkit
		plusTwo: plusTwoReducer, // with redux toolkit
		session: changeSessionReducer, // with redux toolkit
		settingStatus: showHideSettingReducer, // with redux toolkit
	},
})
export default store
