import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	getFirstAo,
	getFirstMo,
} from "../actions/getMiniStats/getFirstMiniStats"
import {
	getSecondAo,
	getSecondMo,
} from "../actions/getMiniStats/getSecondMiniStats"
import { hideSetting } from "../actions/showHideSetting"
import { updateFirstMiniStat } from "../actions/updateMiniStat/updateFirstMiniStat"
import { updateSecondMiniStat } from "../actions/updateMiniStat/updateSecondMiniStat"
import "./Setting.scss"

function Setting(props) {
	if (localStorage.getItem("function") === null) {
		localStorage.setItem(
			"function",
			JSON.stringify({
				font: 1,
				firstType: "ao",
				firstLength: 5,
				secondType: "mo",
				secondLength: 5,
			})
		)
	}

	const dispatch = useDispatch()
	const run = useSelector((state) => state.startOrStop)
	const settingStatus = useSelector((state) => state.settingStatus)
	const functionStorage = JSON.parse(localStorage.getItem("function"))
	const [font, setFont] = useState(functionStorage.font)
	const session = useSelector((state) => state.session)
	const [firstType, setFirstType] = useState(functionStorage.firstType)
	const [secondType, setSecondType] = useState(functionStorage.secondType)
	const [firstLength, setFirstLength] = useState(functionStorage.firstLength)
	const [secondLength, setSecondLength] = useState(
		functionStorage.secondLength
	)
	useEffect(() => {
		dispatch(updateFirstMiniStat(firstType, firstLength))
		dispatch(updateSecondMiniStat(secondType, secondLength))
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
	}, [firstType, secondType, firstLength, secondLength, font, run, session])
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
										onChange={(e) =>
											setFont(e.target.value)
										}
									>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
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
						</table>
						<button
							className="close-button"
							onClick={() => dispatch(hideSetting())}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="bi bi-x"
								viewBox="0 0 16 16"
							>
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
							</svg>
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Setting
