import { createSlice } from '@reduxjs/toolkit'

export const updateSecondMiniSlice = createSlice({
	name: 'updateSecondMiniStat',
	initialState: ['mo', 5],
	reducers: {
		updateSecondMiniStat: (_state, action) => {
			const functionStorage = JSON.parse(localStorage.getItem('function'))
			functionStorage.secondType = action.payload.value
			functionStorage.secondLength = action.payload.amount
			localStorage.setItem('function', JSON.stringify(functionStorage))
			return [action.payload.value, action.payload.amount]
		},
	},
})

export const { updateSecondMiniStat } = updateSecondMiniSlice.actions
export default updateSecondMiniSlice.reducer
