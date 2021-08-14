import { createSlice } from '@reduxjs/toolkit'
export const startStopTimerSlice = createSlice({
	name: 'startOrStop',
	initialState: 'stop',
	reducers: {
		startTimer: () => 'start',
		stopTimer: () => 'stop',
		inspectTimer: () => 'inspect',
	},
})
export const { startTimer, stopTimer, inspectTimer } =
	startStopTimerSlice.actions
export default startStopTimerSlice.reducer
