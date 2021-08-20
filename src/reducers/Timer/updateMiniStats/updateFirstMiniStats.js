import { createSlice } from '@reduxjs/toolkit'

export const updateFirstMiniSlice = createSlice({
	name: 'updateFirstMiniStat',
	initialState: ['ao', 5],
	reducers: {
		updateFirstMiniStat: (_state, action) => {
			const functionStorage = JSON.parse(localStorage.getItem('function'))
			functionStorage.firstType = action.payload.value
			functionStorage.firstLength = action.payload.amount
			localStorage.setItem('function', JSON.stringify(functionStorage))
			return [action.payload.value, action.payload.amount]
		},
	},
})
export const { updateFirstMiniStat } = updateFirstMiniSlice.actions
export default updateFirstMiniSlice.reducer
