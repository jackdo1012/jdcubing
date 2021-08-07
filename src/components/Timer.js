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

	useEffect(() => {
		document.addEventListener("keyup", (e) => {
			if (e.code === "Space") {
				timePressing++
				if (timePressing === 100) {
					timePressing = 0
				}
				if (!running && timePressing % 2 === 1) {
					dispatch(startTimer())
				}
			}
		})
		document.addEventListener("keypress", (e) => {
			if (e.code === "Space") {
				if (running) {
					dispatch(stopTimer())
				}
			}
		})
	}, [running, dispatch])
	return (
		<div className={props.className}>
			<p>{timer}</p>
		</div>
	)
}

export default Timer
