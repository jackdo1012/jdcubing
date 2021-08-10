import React from "react"
import { useSelector } from "react-redux"
import "./MiniStats.scss"

const MiniStats = (props) => {
	const firstType = props.firstType
	const secondType = props.secondType
	const firstLength = props.firstLength
	const secondLength = props.secondLength
	const formatTime = props.formatTime
	const run = useSelector((state) => state.startOrStop)
	const firstMiniStats = useSelector((state) => state.firstMiniStats)
	const secondMiniStats = useSelector((state) => state.secondMiniStats)
	return (
		<div className={props.className}>
			{!run && (
				<p className="first-mini-stats">
					{firstType}
					{firstLength}: {formatTime(firstMiniStats)}
				</p>
			)}
			{!run && (
				<p className="second-mini-stats">
					{secondType}
					{secondLength}: {formatTime(secondMiniStats)}
				</p>
			)}
		</div>
	)
}
export default MiniStats
