import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startTimer, stopTimer } from "../reducers/startStopTimer"
import useTimer from "../hooks/useTimer"
import "./Timer.scss"

function Timer(props) {
	const timePressing = useRef(0)
	const dispatch = useDispatch()
	const timer = useTimer()
	const running = useSelector((state) => state.startOrStop)
	const setting = useSelector((state) => state.settingStatus)
	const keyupFunction = (e) => {
		if (e.code === "Space") {
			document.querySelector("#time-text").className = "running"
			timePressing.current++
			if (timePressing.current === 100) {
				timePressing.current = 0
			}
			if (!running && timePressing.current % 2 === 1) {
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
		document.querySelector("#time-text").className = "running"
		timePressing.current++
		if (timePressing.current === 100) {
			timePressing.current = 0
		}
		if (!running && timePressing.current % 2 === 1) {
			dispatch(startTimer())
		}
	}
	const touchstartFunction = () => {
		if (running) {
			dispatch(stopTimer())
		}
	}
	const touchstartReady = () => {
		if (!running) {
			document.querySelector("#time-text").className = "ready"
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
			document
				.querySelector(".timer")
				.addEventListener("touchstart", touchstartReady)
			return () => {
				document.removeEventListener("keyup", keyupFunction)
				document.removeEventListener("keypress", keypressFunction)
				document
					.querySelector(".timer")
					.removeEventListener("touchend", touchendFunction)
				document.removeEventListener("touchstart", touchstartFunction)
				document
					.querySelector(".timer")
					.removeEventListener("touchstart", touchstartReady)
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
