import { createSlice } from "@reduxjs/toolkit"
export const startStopTimerSlice = createSlice({
	name: "startOrStop",
	initialState: false,
	reducers: {
		startTimer: () => true,
		stopTimer: () => false,
	},
})
export const { startTimer, stopTimer } = startStopTimerSlice.actions
export default startStopTimerSlice.reducer
