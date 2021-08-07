import { createSlice } from "@reduxjs/toolkit"
// export const submitTimeReducer = (state = [], action) => {
// 	switch (action.type) {
// 		case "SUBMIT": {
// 			var solvesArray = localStorage
// 				.getItem(`times${action.session}`)
// 				.split(",")

// 			var time = action.time
// 			if (action.time === "0.00") {
// 				return state
// 			} else if (action.time.includes(":")) {
// 				time = (
// 					Number(action.time.split(":")[0]) * 60 +
// 					Number(action.time.split(":")[1])
// 				).toString()
// 				console.log(time)
// 			}
// 			solvesArray = localStorage.getItem(`times${action.session}`)
// 			solvesArray = solvesArray ? solvesArray.split(",") : []
// 			solvesArray.unshift(time.toString())
// 			localStorage.setItem(
// 				`times${action.session}`,
// 				solvesArray.toString()
// 			)
// 			return solvesArray
// 		}
// 		default: {
// 			return state
// 		}
// 	}
// }
export const submitTimeSlice = createSlice({
	name: "submit",
	initialState: [],
	reducers: {
		submitTime: (state, action) => {
			var solvesArray = localStorage
				.getItem(`times${action.payload.session}`)
				.split(",")

			var time = action.payload.time
			if (time === "0.00") {
				return state
			} else if (time.includes(":")) {
				time = (
					Number(time.split(":")[0]) * 60 +
					Number(time.split(":")[1])
				).toString()
				console.log(time)
			}
			solvesArray = localStorage.getItem(`times${action.payload.session}`)
			solvesArray = solvesArray ? solvesArray.split(",") : []
			solvesArray.unshift(time.toString())
			localStorage.setItem(
				`times${action.payload.session}`,
				solvesArray.toString()
			)
			return solvesArray
		},
	},
})
export const { submitTime } = submitTimeSlice.actions
export default submitTimeSlice.reducer
