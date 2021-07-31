import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { submitTime } from "../actions/submitTime"
import { getAo, getMo } from "../actions/getMiniStats"

const reformatTime = (input) => {
  if (input < 10) {
    return "0" + input
  }
  return input
}

const useTimer = () => {
  const [time, setTime] = useState("0.00")
  const run = useSelector((state) => state.startOrStop)
  const dispatch = useDispatch()
  const solves = useSelector((state) => state.submit)

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
    if (!run) {
      dispatch(getAo(solves, 5))
      dispatch(getMo(solves, 5))
    }
  }, [solves])
  return time
}
export default useTimer
