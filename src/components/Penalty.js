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
import { getDnf } from "../actions/penalty/dnf"
import { getPlusTwo } from "../actions/penalty/plusTwo"
import "./Penalty.scss"

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
	const session = useSelector((state) => state.session)
	const resetMiniStats = () => {
		if (firstType === "ao") {
			dispatch(
				getFirstAo(
					localStorage.getItem(`times${session}`).split(","),
					firstLength
				)
			)
		} else if (firstType === "mo") {
			dispatch(
				getFirstMo(
					localStorage.getItem(`times${session}`).split(","),
					firstLength
				)
			)
		}
		if (secondType === "ao") {
			dispatch(
				getSecondAo(
					localStorage.getItem(`times${session}`).split(","),
					secondLength
				)
			)
		} else if (secondType === "mo") {
			dispatch(
				getSecondMo(
					localStorage.getItem(`times${session}`).split(","),
					secondLength
				)
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
		dispatch(getPlusTwo(session))
		setRunAvailable(false)
		resetMiniStats()
		dispatch(getBest(localStorage.getItem(`times${session}`).split(",")))
		dispatch(getWorst(localStorage.getItem(`times${session}`).split(",")))
	}
	const handleDnf = () => {
		dispatch(getDnf(session))
		setRunAvailable(false)
		resetMiniStats()
		dispatch(
			getSolvesStats(localStorage.getItem(`times${session}`).split(","))
		)
		dispatch(getBest(localStorage.getItem(`times${session}`).split(",")))
		dispatch(getWorst(localStorage.getItem(`times${session}`).split(",")))
	}

	return (
		<div className={props.className}>
			{renderCount.current > 3 && runAvailable && (
				<button onClick={handlePlusTwo}>{plusTwo}</button>
			)}
			{renderCount.current > 3 && runAvailable && (
				<button onClick={handleDnf}>{dnf}</button>
			)}
		</div>
	)
}

export default Penalty
