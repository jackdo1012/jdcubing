import { createSlice } from '@reduxjs/toolkit'

export const dnfSlice = createSlice({
	name: 'dnf',
	initialState: '0.00',
	reducers: {
		getDnf: (_state, action) => {
			var solves = localStorage
				.getItem(`times${action.payload}`)
				.split(',')
			solves.shift()
			localStorage.setItem(`times${action.payload}`, ['DNF', ...solves])
			return 'DNF'
		},
	},
})
export const { getDnf } = dnfSlice.actions
export default dnfSlice.reducer
