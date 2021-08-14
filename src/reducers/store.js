import { configureStore } from '@reduxjs/toolkit'
import getFirstMiniStatReducer from './getMiniStats/getFirstMiniStat'
import getSecondMiniStatReducer from './getMiniStats/getSecondMiniStat'
import getNumberOfSolvesReducer from './getStats/getNumberOfSolves'
import startStopTimer from './startStopTimer'
import submitTimeReducer from './submitTime'
import updateFirstMiniReducer from './updateMiniStats/updateFirstMiniStats'
import updateSecondMiniReducer from './updateMiniStats/updateSecondMiniStats'
import getBestReducer from './getStats/getBest'
import getWorstReducer from './getStats/getWorst'
import dnfReducer from './penalty/dnf'
import plusTwoReducer from './penalty/plusTwo'
import changeSessionReducer from './changeSession'
import showHideSettingReducer from './showHideSetting'
import submitScramble from './submitScramble'

const store = configureStore({
	reducer: {
		firstMiniStats: getFirstMiniStatReducer,
		secondMiniStats: getSecondMiniStatReducer,
		startOrStop: startStopTimer,
		submit: submitTimeReducer,
		numberOfSolves: getNumberOfSolvesReducer,
		updateFirstMiniStat: updateFirstMiniReducer,
		updateSecondMiniStat: updateSecondMiniReducer,
		getBest: getBestReducer,
		getWorst: getWorstReducer,
		dnf: dnfReducer,
		plusTwo: plusTwoReducer,
		session: changeSessionReducer,
		settingStatus: showHideSettingReducer,
		scramble: submitScramble,
	},
})
export default store
