import { createSlice } from "@reduxjs/toolkit"
export const getNumberOfSolvesSlice = createSlice({
	name: "numberOfSolves",
	initialState: "0/0",
	reducers: {
		getNumberOfSolves: (_state, action) => {
			const solvesDone = action.payload.length
			const solvesComplete = [...action.payload].filter(
				(solve) => solve !== "DNF"
			).length
			for (let solve of action.payload) {
				if (solve === "") {
					return "0/0"
				}
			}
			return `${solvesComplete}/${solvesDone}`
		},
	},
})
export const { getNumberOfSolves } = getNumberOfSolvesSlice.actions
export default getNumberOfSolvesSlice.reducer
