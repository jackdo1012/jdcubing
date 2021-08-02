import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBest } from "../actions/getStats/getBest"
import { getWorst } from "../actions/getStats/getWorst"
import { submitTime } from "../actions/submitTime"

const reformatTime = (input) => {
  if (input < 10) {
    return "0" + input
  }
  return input
}

const useTimer = () => {
  const [time, setTime] = useState("0.00")
  const run = useSelector((state) => state.startOrStop)
  const solves = useSelector((state) => state.submit)
  const DNF = useSelector((state) => state.dnf)
  const plusTwo = useSelector((state) => state.plusTwo)
  const dispatch = useDispatch()

  useEffect(() => {
    var totalSecond = 0
    if (run) {
      var interval = setInterval(() => {
        ++totalSecond
        if (totalSecond / 6000 < 1) {
          setTime(
            `${reformatTime(Math.floor(totalSecond / 100))}.${reformatTime(
              totalSecond % 100
            )}`
          )
        } else {
          setTime(
            `${reformatTime(Math.floor(totalSecond / 6000))}:${reformatTime(
              Math.floor(totalSecond / 100) % 60
            )}.${totalSecond % 100}`
          )
        }
      }, 10)
    }
    if (!run) {
      dispatch(submitTime(time))
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [run])

  useEffect(() => {
    dispatch(getBest(solves))
    dispatch(getWorst(solves))
  }, [solves])

  useEffect(() => {
    if (plusTwo !== "0:00") {
      setTime(plusTwo)
    }
  }, [plusTwo])
  useEffect(() => {
    if (DNF !== "0:00") {
      setTime("DNF")
    }
  }, [DNF])

  return time
}
export default useTimer
