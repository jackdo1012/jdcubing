import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFirstMiniStats } from '../../reducers/Timer/getMiniStats/getFirstMiniStat'
import { getSecondMiniStats } from '../../reducers/Timer/getMiniStats/getSecondMiniStat'

import { hideSetting } from '../../reducers/Timer/showHideSetting'
import { updateFirstMiniStat } from '../../reducers/Timer/updateMiniStats/updateFirstMiniStats'
import { updateSecondMiniStat } from '../../reducers/Timer/updateMiniStats/updateSecondMiniStats'
import './Setting.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Setting(props) {
	if (localStorage.getItem('function') === null) {
		localStorage.setItem(
			'function',
			JSON.stringify({
				font: 1,
				firstType: 'ao',
				firstLength: 5,
				secondType: 'mo',
				secondLength: 5,
			})
		)
	}

	const dispatch = useDispatch()
	const run = useSelector((state) => state.startOrStop)
	const settingStatus = useSelector((state) => state.settingStatus)
	const functionStorage = JSON.parse(localStorage.getItem('function'))
	const [font, setFont] = useState(functionStorage.font)
	const session = useSelector((state) => state.session)
	const [firstType, setFirstType] = useState(functionStorage.firstType)
	const [secondType, setSecondType] = useState(functionStorage.secondType)
	const [firstLength, setFirstLength] = useState(functionStorage.firstLength)
	const [secondLength, setSecondLength] = useState(
		functionStorage.secondLength
	)
	useEffect(() => {
		dispatch(updateFirstMiniStat({ value: firstType, amount: firstLength }))
		dispatch(
			updateSecondMiniStat({ value: secondType, amount: secondLength })
		)
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
	}, [firstType, secondType, firstLength, secondLength, font, run, session])
	useEffect(() => {
		document.querySelector('.time').style.fontFamily = `lcd${font}`
	}, [font])
	return (
		<div className={props.className}>
			{settingStatus && (
				<button
					className="blur"
					onClick={() => dispatch(hideSetting())}
				></button>
			)}
			{settingStatus && (
				<div className="setting-page">
					<div className="setting-table">
						<table>
							<tbody>
								<tr>
									<th colSpan="2" className="title">
										Setting
									</th>
								</tr>
								<tr>
									<td>Font:</td>
									<td>
										<select
											value={font}
											onChange={(e) => {
												setFont(e.target.value)
												const localStorageList =
													JSON.parse(
														localStorage.getItem(
															'function'
														)
													)
												localStorageList.font =
													e.target.value
												localStorage.setItem(
													'function',
													JSON.stringify(
														localStorageList
													)
												)
											}}
										>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Stats 1 type:</td>
									<td>
										<select
											value={firstType}
											onChange={(e) =>
												setFirstType(e.target.value)
											}
										>
											<option value="ao">Average</option>
											<option value="mo">Mean</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Stats 1 length: </td>
									<td>
										<input
											type="number"
											value={firstLength}
											onChange={(e) =>
												setFirstLength(e.target.value)
											}
											min="3"
											max="100"
										/>
									</td>
								</tr>
								<tr>
									<td>Stats 2 type: </td>
									<td>
										<select
											value={secondType}
											onChange={(e) =>
												setSecondType(e.target.value)
											}
										>
											<option value="ao">Average</option>
											<option value="mo">Mean</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>Stats 2 length: </td>
									<td>
										<input
											type="number"
											value={secondLength}
											onChange={(e) =>
												setSecondLength(e.target.value)
											}
											min="3"
											max="100"
										/>
									</td>
								</tr>
							</tbody>
						</table>
						<button
							className="close-button"
							onClick={() => dispatch(hideSetting())}
						>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Setting
