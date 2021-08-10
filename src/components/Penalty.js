import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFirstMiniStats } from "../reducers/getMiniStats/getFirstMiniStat"
import { getSecondMiniStats } from "../reducers/getMiniStats/getSecondMiniStat"
import { getBest } from "../reducers/getStats/getBest"
import { getNumberOfSolves } from "../reducers/getStats/getNumberOfSolves"
import { getWorst } from "../reducers/getStats/getWorst"
import { getDnf } from "../reducers/penalty/dnf"
import { getPlusTwo } from "../reducers/penalty/plusTwo"
import "./Penalty.scss"

function Penalty(props) {
	const dispatch = useDispatch()
	const [renderCount, setRenderCount] = useState(1)
	const [plusTwo, setPlusTwo] = useState("")
	const [dnf, setDnf] = useState("")
	const [runAvailable, setRunAvailable] = useState(true)
	const run = useSelector((state) => state.startOrStop)
	const session = useSelector((state) => state.session)
	const resetMiniStats = () => {
		dispatch(
			getFirstMiniStats(
				localStorage.getItem(`times${session}`).split(",")
			)
		)
		dispatch(
			getSecondMiniStats(
				localStorage.getItem(`times${session}`).split(",")
			)
		)
	}
	useEffect(() => {
		setRunAvailable(true)
		if (renderCount < 4) {
			setRenderCount(renderCount + 1)
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
			getNumberOfSolves(
				localStorage.getItem(`times${session}`).split(",")
			)
		)
		dispatch(getBest(localStorage.getItem(`times${session}`).split(",")))
		dispatch(getWorst(localStorage.getItem(`times${session}`).split(",")))
	}

	return (
		<div className={props.className}>
			{renderCount > 3 && runAvailable && (
				<button onClick={handlePlusTwo} className="plus-two-btn">
					{plusTwo}
				</button>
			)}
			{renderCount > 3 && runAvailable && (
				<button onClick={handleDnf} className="dnf-btn">
					{dnf}
				</button>
			)}
		</div>
	)
}

export default Penalty
