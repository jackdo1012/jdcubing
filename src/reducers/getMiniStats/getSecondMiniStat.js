import { createSlice } from '@reduxjs/toolkit'
export const getSecondMiniStatSlice = createSlice({
	name: 'getSecondMiniStat',
	initialState: '0.00',
	reducers: {
		getSecondMiniStats: (_state, action) => {
			if (
				JSON.parse(localStorage.getItem('function')).secondType === 'ao'
			) {
				const number = JSON.parse(
					localStorage.getItem('function')
				).secondLength
				const solves = action.payload
				if (solves.length >= number && number >= 3) {
					var newList = [...solves].slice(0, number)
					var count = 0
					for (let i = 0; i < newList.length; i++) {
						if (solves[i] === 'DNF') {
							count++
						} else {
							newList[i] = Number(solves[i])
						}
					}
					if (count <= 1) {
						newList = newList.filter((solve) => solve !== 'DNF')
						newList.sort((a, b) => a - b)
						if (count === 0) {
							newList.shift()
							newList.pop()
						} else {
							newList.shift()
						}
						const total = newList.reduce((a, b) => a + b)
						return (total / (number - 2)).toFixed(2)
					} else {
						return 'DNF'
					}
				} else if (solves.length === 0) {
					return '0.00'
				}
				return '0.00'
			} else {
				const number = JSON.parse(
					localStorage.getItem('function')
				).secondLength
				const solves = action.payload
				if (solves.length >= number) {
					const newList = [...solves].slice(0, number)
					var ans = 0
					for (let i = 0; i < newList.length; i++) {
						if (newList[i] === 'DNF') {
							return 'DNF'
						} else {
							newList[i] = Number(solves[i])
							ans += newList[i]
						}
					}
					return (ans / number).toFixed(2)
				} else if (solves.length === 0) {
					return '0.00'
				}
				return '0.00'
			}
		},
	},
})
export const { getSecondMiniStats } = getSecondMiniStatSlice.actions
export default getSecondMiniStatSlice.reducer
