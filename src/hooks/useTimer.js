import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBest } from '../reducers/Timer/getStats/getBest'
import { getWorst } from '../reducers/Timer/getStats/getWorst'
import { submitTime } from '../reducers/Timer/submitTime'
import { getDnf } from '../reducers/Timer/penalty/dnf'
import { getPlusTwo } from '../reducers/Timer/penalty/plusTwo'

const useTimer = () => {
	const inspectionInterval = useRef(0)
	const inspectTime = useRef(0)
	const [minute, setMinute] = useState(0)
	const [second, setSecond] = useState(0)
	const [decisecond, setDecisecond] = useState(0)
	const [centisecond, setCentisecond] = useState(0)
	const [time, setTime] = useState('00.00')
	const [renderCount, setRenderCount] = useState(0)
	const run = useSelector((state) => state.startOrStop)
	const solves = useSelector((state) => state.submit)
	const numberOfSolves = useSelector((state) => state.numberOfSolves)
	const DNF = useSelector((state) => state.dnf)
	const plusTwo = useSelector((state) => state.plusTwo)
	const session = useSelector((state) => state.session)
	const dispatch = useDispatch()
	const reformatTime = (input) => {
		if (input < 10) {
			return '0' + input
		}
		return input
	}

	useEffect(() => {
		if (renderCount < 4) {
			setRenderCount(renderCount + 1)
		}

		if (run === 'inspect') {
			inspectTime.current = 15
			setTime(inspectTime.current)
			inspectionInterval.current = setInterval(() => {
				inspectTime.current--
				setTime(inspectTime.current)
				if (inspectTime.current === -1) {
					setTime('+2')
				} else if (inspectTime.current === -2) {
					setTime('DNF')
					clearInterval(inspectionInterval.current)
				}
			}, 1000)
		} else if (run === 'start') {
			clearInterval(inspectionInterval.current)
			let totalMinute = 0
			let totalSecond = 0
			let totalDecisecond = 0
			let totalCentisecond = 0
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
		} else if (run === 'stop') {
			clearInterval(centisecondInterval)
			clearInterval(decisecondInterval)
			clearInterval(secondInterval)
			clearInterval(minuteInterval)
			if (minute >= 1) {
				let time = `${reformatTime(minute)}:${reformatTime(
					second
				)}.${decisecond}${centisecond}`
				dispatch(submitTime({ time, session }))
				setTime(time)
			} else {
				let time = `${reformatTime(second)}.${decisecond}${centisecond}`
				dispatch(submitTime({ time, session }))
				setTime(time)
			}
			if (inspectTime.current === -1) {
				dispatch(getPlusTwo(session))
			} else if (inspectTime.current === -2) {
				dispatch(getDnf(session))
			}
		}
		return () => {
			clearInterval(minuteInterval)
			clearInterval(secondInterval)
			clearInterval(decisecondInterval)
			clearInterval(centisecondInterval)
		}
	}, [run])

	useEffect(() => {
		dispatch(getBest(localStorage.getItem(`times${session}`).split(',')))
		dispatch(getWorst(localStorage.getItem(`times${session}`).split(',')))
	}, [solves])

	useEffect(() => {
		if (plusTwo !== '0.00') {
			setTime(plusTwo)
		}
	}, [plusTwo])
	useEffect(() => {
		if (DNF !== '0.00') {
			setTime('DNF')
		}
	}, [DNF])
	useEffect(() => {
		if (run === 'start') {
			if (minute >= 1) {
				setTime(
					`${reformatTime(minute)}:${reformatTime(
						second
					)}.${decisecond}${centisecond}`
				)
			} else {
				setTime(`${reformatTime(second)}.${decisecond}${centisecond}`)
			}
		}
		if (run === 'stop') {
			setTime(time)
		}
	}, [run, minute, second, decisecond, centisecond])
	if (renderCount >= 3 && numberOfSolves === '0/0' && run === 'stop') {
		return '00.00'
	} else {
		return time
	}
}

export default useTimer
