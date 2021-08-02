import useTimer from "../hooks/useTimer"
import React, { useEffect } from "react"
import { startTimer, stopTimer } from "../actions/startStopTimer"
import { useDispatch, useSelector } from "react-redux"

var timePressing = 0
function Timer() {
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
    <>
      <p>{timer}</p>
    </>
  )
}

export default Timer
