import { createSlice } from '@reduxjs/toolkit'

export const getBestSlice = createSlice({
	name: 'getBest',
	initialState: '0.00',
	reducers: {
		getBest: (_state, action) => {
			const solves = action.payload
			if (
				Math.min(...solves.filter((solve) => solve !== 'DNF')).toFixed(
					2
				) == Infinity
			) {
				return '0.00'
			} else {
				return Math.min(
					...solves.filter((solve) => solve !== 'DNF')
				).toFixed(2)
			}
		},
	},
})
export const { getBest } = getBestSlice.actions
export default getBestSlice.reducer
