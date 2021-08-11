import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startTimer, stopTimer } from "../reducers/startStopTimer"
import useTimer from "../hooks/useTimer"
import "./Timer.scss"

var timePressing = 0
function Timer(props) {
	const dispatch = useDispatch()
	const timer = useTimer()
	const running = useSelector((state) => state.startOrStop)
	const setting = useSelector((state) => state.settingStatus)
	const keyupFunction = (e) => {
		if (e.code === "Space") {
			document.querySelector("#time-text").className = "running"
			timePressing++
			if (timePressing === 100) {
				timePressing = 0
			}
			if (!running && timePressing % 2 === 1) {
				dispatch(startTimer())
			}
		}
	}
	const keypressFunction = (e) => {
		if (e.code === "Space") {
			if (!running) {
				document.querySelector("#time-text").className = "ready"
			}
			if (running) {
				dispatch(stopTimer())
			}
		}
	}
	const touchendFunction = () => {
		timePressing++
		if (timePressing === 100) {
			timePressing = 0
		}
		if (!running && timePressing % 2 === 1) {
			dispatch(startTimer())
		}
	}
	const touchstartFunction = () => {
		if (running) {
			dispatch(stopTimer())
		}
	}
	useEffect(() => {
		if (!setting) {
			document.addEventListener("keyup", keyupFunction)
			document.addEventListener("keypress", keypressFunction)
			document
				.querySelector(".timer")
				.addEventListener("touchend", touchendFunction)
			document.addEventListener("touchstart", touchstartFunction)
			return () => {
				document.removeEventListener("keyup", keyupFunction)
				document.removeEventListener("keypress", keypressFunction)
				document
					.querySelector(".timer")
					.removeEventListener("touchend", touchendFunction)
				document.removeEventListener("touchstart", touchstartFunction)
			}
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
