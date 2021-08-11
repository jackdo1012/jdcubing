import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBest } from "../reducers/getStats/getBest"
import { getWorst } from "../reducers/getStats/getWorst"
import { submitTime } from "../reducers/submitTime"

const useTimer = () => {
	const [minute, setMinute] = useState(0)
	const [second, setSecond] = useState(0)
	const [decisecond, setDecisecond] = useState(0)
	const [centisecond, setCentisecond] = useState(0)
	const [time, setTime] = useState("00.00")
	const run = useSelector((state) => state.startOrStop)
	const solves = useSelector((state) => state.submit)
	const numberOfSolves = useSelector((state) => state.numberOfSolves)
	const DNF = useSelector((state) => state.dnf)
	const plusTwo = useSelector((state) => state.plusTwo)
	const session = useSelector((state) => state.session)
	const [renderCount, setRenderCount] = useState(0)
	const dispatch = useDispatch()
	const reformatTime = (input) => {
		if (input < 10) {
			return "0" + input
		}
		return input
	}

	useEffect(() => {
		if (renderCount < 4) {
			setRenderCount(renderCount + 1)
		}

		var totalMinute = 0
		var totalSecond = 0
		var totalDecisecond = 0
		var totalCentisecond = 0
		if (run) {
			setMinute(0)
			setSecond(0)
			setDecisecond(0)
			setCentisecond(0)
			var minuteInterval = setInterval(() => {
				totalMinute++
				setMinute(totalMinute)
			}, 60000)
			var secondInterval = setInterval(() => {
				totalSecond++
				setSecond(totalSecond % 60)
			}, 1000)
			var decisecondInterval = setInterval(() => {
				totalDecisecond++
				setDecisecond(totalDecisecond % 10)
			}, 100)
			var centisecondInterval = setInterval(() => {
				totalCentisecond++
				setCentisecond(totalCentisecond % 10)
			}, 10)
		}
		if (!run) {
			if (minute >= 1) {
				let time = `${reformatTime(minute)}:${reformatTime(
					second
				)}.${decisecond}${centisecond}`
				dispatch(submitTime({ time, session }))
			} else {
				let time = `${reformatTime(second)}.${decisecond}${centisecond}`
				dispatch(submitTime({ time, session }))
			}
			clearInterval(minuteInterval)
			clearInterval(secondInterval)
			clearInterval(decisecondInterval)
			clearInterval(centisecondInterval)
		}
		return () => {
			clearInterval(minuteInterval)
			clearInterval(secondInterval)
			clearInterval(decisecondInterval)
			clearInterval(centisecondInterval)
		}
	}, [run])

	useEffect(() => {
		dispatch(getBest(localStorage.getItem(`times${session}`).split(",")))
		dispatch(getWorst(localStorage.getItem(`times${session}`).split(",")))
	}, [solves])

	useEffect(() => {
		if (plusTwo !== "0.00") {
			setTime(plusTwo)
		}
	}, [plusTwo])
	useEffect(() => {
		if (DNF !== "0.00") {
			setTime("DNF")
		}
	}, [DNF])
	useEffect(() => {
		if (minute >= 1) {
			setTime(
				`${reformatTime(minute)}:${reformatTime(
					second
				)}.${decisecond}${centisecond}`
			)
		} else {
			setTime(`${reformatTime(second)}.${decisecond}${centisecond}`)
		}
	}, [minute, second, decisecond, centisecond])
	if (renderCount > 3 && numberOfSolves === "0/0" && !run) {
		return "00.00"
	} else {
		return time
	}
}

export default useTimer
