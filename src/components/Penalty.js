import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getFirstAo,
  getFirstMo,
} from "../actions/getMiniStats/getFirstMiniStats"
import {
  getSecondAo,
  getSecondMo,
} from "../actions/getMiniStats/getSecondMiniStats"
import { getBest } from "../actions/getStats/getBest"
import { getSolvesStats } from "../actions/getStats/getNumberOfSolves"
import { getWorst } from "../actions/getStats/getWorst"

function Penalty(props) {
  const firstType = props.firstType
  const secondType = props.secondType
  const firstLength = props.firstLength
  const secondLength = props.secondLength
  const dispatch = useDispatch()
  const renderCount = useRef(1)
  const [plusTwo, setPlusTwo] = useState("")
  const [dnf, setDnf] = useState("")
  const [runAvailable, setRunAvailable] = useState(true)
  const run = useSelector((state) => state.startOrStop)
  const resetMiniStats = () => {
    if (firstType === "ao") {
      dispatch(
        getFirstAo(localStorage.getItem("times").split(","), firstLength)
      )
    } else if (firstType === "mo") {
      dispatch(
        getFirstMo(localStorage.getItem("times").split(","), firstLength)
      )
    }
    if (secondType === "ao") {
      dispatch(
        getSecondAo(localStorage.getItem("times").split(","), secondLength)
      )
    } else if (secondType === "mo") {
      dispatch(
        getSecondMo(localStorage.getItem("times").split(","), secondLength)
      )
    }
  }
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
    resetMiniStats()
    dispatch(getBest(newList))
    dispatch(getWorst(newList))
  }
  const handleDnf = () => {
    const solves = localStorage.getItem("times").split(",")
    solves.shift()
    localStorage.setItem("times", ["DNF", ...solves])
    setRunAvailable(false)
    resetMiniStats()
    dispatch(getSolvesStats(localStorage.getItem("times").split(",")))
    dispatch(getBest(localStorage.getItem("times").split(",")))
    dispatch(getWorst(localStorage.getItem("times").split(",")))
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
