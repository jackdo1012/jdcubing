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
import { getPlusTwo } from "../actions/penalty/plusTwo"
import { getDnf } from "../actions/penalty/dnf"

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
    dispatch(getPlusTwo())
    setRunAvailable(false)
    resetMiniStats()
    dispatch(getBest(localStorage.getItem("times").split(",")))
    dispatch(getWorst(localStorage.getItem("times").split(",")))
  }
  const handleDnf = () => {
    dispatch(getDnf())
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
