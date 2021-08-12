import { createSlice } from "@reduxjs/toolkit"
export const scrambleSlice = createSlice({
	name: "scramble",
	initialState: "",
	reducers: {
		submitScramble: (_state, action) => {
			return {
				type: action.payload.type,
				scramble: action.payload.scramble,
			}
		},
	},
})

export const { submitScramble } = scrambleSlice.actions
export default scrambleSlice.reducer
