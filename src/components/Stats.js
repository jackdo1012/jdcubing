import React, { useEffect } from "react"
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
import "./Stats.scss"

function Stats(props) {
	const firstType = props.firstType
	const secondType = props.secondType
	const firstLength = props.firstLength
	const secondLength = props.secondLength
	const formatTime = props.formatTime
	const dispatch = useDispatch()
	const solves = useSelector((state) => state.submit)
	const solvesStats = useSelector((state) => state.getSolvesStats)
	const run = useSelector((state) => state.startOrStop)
	const best = useSelector((state) => state.getBest)
	const worst = useSelector((state) => state.getWorst)
	const session = useSelector((state) => state.session)
	const plusTwo = useSelector((state) => state.plusTwo)
	const dnf = useSelector((state) => state.dnf)
	useEffect(() => {
		dispatch(
			getSolvesStats(localStorage.getItem(`times${session}`).split(","))
		)
		dispatch(getBest(localStorage.getItem(`times${session}`).split(",")))
		dispatch(getWorst(localStorage.getItem(`times${session}`).split(",")))
	}, [solves, session, plusTwo, dnf])
	const handleResetSolves = () => {
		localStorage.setItem(`times${session}`, [])
		dispatch(getSolvesStats([]))
		dispatch(getBest([0]))
		dispatch(getWorst([0]))
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
	return (
		<div className={props.className}>
			{!run && (
				<table>
					<thead>
						<tr>
							<th>Stats</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Solves: {solvesStats}</td>
						</tr>
						<tr>
							<td>Best: {formatTime(best)}</td>
						</tr>
						<tr>
							<td>Worst: {formatTime(worst)}</td>
						</tr>
						<tr>
							<td>
								Reset:{" "}
								<button onClick={handleResetSolves}>
									Reset solves
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	)
}

export default Stats
