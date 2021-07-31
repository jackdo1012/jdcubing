import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAo, getMo } from "../actions/getMiniStats"
import { getSolvesStats } from "../actions/getNumberOfSolves"

function Penalty() {
  const dispatch = useDispatch()
  const renderCount = useRef(1)
  const [plusTwo, setPlusTwo] = useState("")
  const [dnf, setDnf] = useState("")
  const [runAvailable, setRunAvailable] = useState(true)
  const run = useSelector((state) => state.startOrStop)
  const solves = useSelector((state) => state.submit)
  useEffect(() => {
    setRunAvailable(true)
    if (renderCount.current < 4) {
      renderCount.current++
    }
    if (!run) {
      setPlusTwo("+2")
      setDnf("DNF")
    } else {
      setPlusTwo("")
      setDnf("")
    }
  }, [run])
  const handlePlusTwo = () => {
    const solves = localStorage.getItem("times").split(",")
    var newTime = [
      Number(solves[0].split(".")[0]) + 2,
      solves[0].split(".")[1],
    ].join(".")
    solves.shift()
    const newList = [newTime, ...solves]
    localStorage.setItem("times", newList)
    setRunAvailable(false)
    dispatch(getAo(localStorage.getItem("times").split(","), 5))
    dispatch(getMo(localStorage.getItem("times").split(","), 5))
  }
  const handleDnf = () => {
    const solves = localStorage.getItem("times").split(",")
    solves.shift()
    localStorage.setItem("times", ["DNF", ...solves])
    setRunAvailable(false)
    dispatch(getAo(localStorage.getItem("times").split(","), 5))
    dispatch(getMo(localStorage.getItem("times").split(","), 5))
    dispatch(getSolvesStats(localStorage.getItem("times").split(",")))
  }

  return (
    <>
      {renderCount.current > 3 && runAvailable && (
        <button onClick={handlePlusTwo}>{plusTwo}</button>
      )}
      {renderCount.current > 3 && runAvailable && (
        <button onClick={handleDnf}>{dnf}</button>
      )}
    </>
  )
}

export default Penalty
