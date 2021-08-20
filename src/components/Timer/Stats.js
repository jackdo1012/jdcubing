import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBest } from '../../reducers/Timer/getStats/getBest'
import { getWorst } from '../../reducers/Timer/getStats/getWorst'
import { getNumberOfSolves } from '../../reducers/Timer/getStats/getNumberOfSolves'
import './Stats.scss'
import { getSecondMiniStats } from '../../reducers/Timer/getMiniStats/getSecondMiniStat'
import { getFirstMiniStats } from '../../reducers/Timer/getMiniStats/getFirstMiniStat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Stats(props) {
	const formatTime = props.formatTime
	const dispatch = useDispatch()
	const solves = useSelector((state) => state.submit)
	const solvesStats = useSelector((state) => state.numberOfSolves)
	const run = useSelector((state) => state.startOrStop)
	const best = useSelector((state) => state.getBest)
	const worst = useSelector((state) => state.getWorst)
	const session = useSelector((state) => state.session)
	const plusTwo = useSelector((state) => state.plusTwo)
	const dnf = useSelector((state) => state.dnf)
	useEffect(() => {
		dispatch(
			getNumberOfSolves(
				localStorage.getItem(`times${session}`).split(',')
			)
		)
		dispatch(getBest(localStorage.getItem(`times${session}`).split(',')))
		dispatch(getWorst(localStorage.getItem(`times${session}`).split(',')))
	}, [solves, session, plusTwo, dnf])
	const handleResetSolves = () => {
		localStorage.setItem(`times${session}`, [])
		localStorage.setItem(`scramble`, '')
		dispatch(getNumberOfSolves([]))
		dispatch(getBest([0]))
		dispatch(getWorst([0]))
		dispatch(
			getFirstMiniStats(
				localStorage.getItem(`times${session}`).split(',')
			)
		)
		dispatch(
			getSecondMiniStats(
				localStorage.getItem(`times${session}`).split(',')
			)
		)
	}
	return (
		<div className={props.className}>
			{run === 'stop' && (
				<div className="stats-table">
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
									Reset solves:{' '}
									<button onClick={handleResetSolves}>
										<FontAwesomeIcon icon={faTimes} />
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}

export default Stats
