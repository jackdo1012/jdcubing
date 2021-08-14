import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startTimer, stopTimer, inspectTimer } from '../reducers/startStopTimer'
import useTimer from '../hooks/useTimer'
import './Timer.scss'
// import { submitTime } from "../reducers/submitTime"
// import { getDnf } from "../reducers/penalty/dnf"

function Timer(props) {
	const timePressing = useRef(0)
	const readyToRun = useRef(false)
	const dispatch = useDispatch()
	const timer = useTimer()
	const running = useSelector((state) => state.startOrStop)
	const setting = useSelector((state) => state.settingStatus)

	// Function for space bar
	const keyupFunction = (e) => {
		if (e.code === 'Space') {
			document.querySelector('#time-text').className = 'running'
			timePressing.current++
			if (timePressing.current === 100) {
				timePressing.current = 0
			}
			if (timePressing.current % 3 === 1) {
				readyToRun.current = true
				dispatch(inspectTimer())
			}
			if (readyToRun.current && timePressing.current % 3 === 2) {
				dispatch(startTimer())
			}
		}
	}
	const keypressFunction = (e) => {
		if (e.code === 'Space') {
			if (timePressing.current % 3 === 1) {
				document.querySelector('#time-text').className = 'ready'
			}
			if (timePressing.current % 3 === 2) {
				dispatch(stopTimer())
			}
		}
	}

	// Function for mobile device
	const touchendFunction = () => {
		document.querySelector('#time-text').className = 'running'
		timePressing.current++
		if (timePressing.current === 100) {
			timePressing.current = 0
		}
		if (readyToRun.current && timePressing.current % 3 === 2) {
			dispatch(startTimer())
		}
		if (timePressing.current % 3 === 1) {
			readyToRun.current = true
			dispatch(inspectTimer())
		}
	}
	const touchstartFunction = () => {
		if (timePressing.current % 3 === 2) {
			dispatch(stopTimer())
		}
	}
	const touchstartReady = () => {
		if (timePressing.current % 3 === 1) {
			document.querySelector('#time-text').className = 'ready'
		}
	}
	// main
	useEffect(() => {
		if (running !== 'stop') {
			document.querySelector('.timer').style.gridColumn = '1/13'
			document.querySelector('.timer').style.gridRow = '1/13'
		} else if (running === 'stop') {
			if (window.matchMedia('(min-width: 1024px)').matches) {
				document.querySelector('.timer').style.gridColumn = '3/11'
				document.querySelector('.timer').style.gridRow = '6/8'
			} else {
				document.querySelector('.timer').style.gridColumn = '3/11'
				document.querySelector('.timer').style.gridRow = '3/4'
			}
		}
		// Event listeners
		if (!setting) {
			document.addEventListener('keyup', keyupFunction)
			document.addEventListener('keypress', keypressFunction)
			document
				.querySelector('.timer')
				.addEventListener('touchend', touchendFunction)
			document.addEventListener('touchstart', touchstartFunction)
			document
				.querySelector('.timer')
				.addEventListener('touchstart', touchstartReady)
		}
		return () => {
			document.removeEventListener('keyup', keyupFunction)
			document.removeEventListener('keypress', keypressFunction)
			document
				.querySelector('.timer')
				.removeEventListener('touchend', touchendFunction)
			document.removeEventListener('touchstart', touchstartFunction)
			document
				.querySelector('.timer')
				.removeEventListener('touchstart', touchstartReady)
		}
	}, [running])
	return (
		<div className={props.className}>
			<p className="time" id="time-text">
				{timer}
			</p>
		</div>
	)
}

export default Timer
