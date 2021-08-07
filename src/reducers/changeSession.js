import { createSlice } from "@reduxjs/toolkit"
// export const changeSessionReducer = (state = 1, action) => {
// 	switch (action.type) {
// 		case "CHANGE_SESSION": {
// 			return action.session
// 		}
// 		default: {
// 			return state
// 		}
// 	}
// }

export const changeSessionSlice = createSlice({
	name: "session",
	initialState: 1,
	reducers: {
		changeSession: (_state, action) => action.payload,
	},
})
export const { changeSession } = changeSessionSlice.actions
export default changeSessionSlice.reducer
