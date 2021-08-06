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
	const firstAo = useSelector((state) => state.firstAverage)
	const firstMo = useSelector((state) => state.firstMean)
	const secondAo = useSelector((state) => state.secondAverage)
	const secondMo = useSelector((state) => state.secondMean)
	return (
		<div className={props.className}>
			{!run && (
				<p>
					{firstType}
					{firstLength}:{" "}
					{firstType === "ao"
						? formatTime(firstAo)
						: formatTime(firstMo)}
				</p>
			)}
			{!run && (
				<p>
					{secondType}
					{secondLength}:{" "}
					{secondType === "ao"
						? formatTime(secondAo)
						: formatTime(secondMo)}
				</p>
			)}
		</div>
	)
}
export default MiniStats
