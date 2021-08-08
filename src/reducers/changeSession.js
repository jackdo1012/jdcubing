import { createSlice } from "@reduxjs/toolkit"

export const changeSessionSlice = createSlice({
	name: "session",
	initialState: 1,
	reducers: {
		changeSession: (_state, action) => action.payload,
	},
})
export const { changeSession } = changeSessionSlice.actions
export default changeSessionSlice.reducer
