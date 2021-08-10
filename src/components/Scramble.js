import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ScrambleGenerator from "scrambo"
import "./Scramble.scss"

function Scramble(props) {
	const run = useSelector((state) => state.startOrStop)
	const [scramble, setScramble] = useState("")
	useEffect(() => {
		const scrambleList = localStorage.getItem("scramble")
		if (!run) {
			if (scrambleList === null) {
				localStorage.setItem("scramble", [scramble])
			} else if (scramble !== "") {
				localStorage.setItem(
					"scramble",
					[scramble].concat(scrambleList)
				)
			}
			setScramble(new ScrambleGenerator().get(1))
		}
	}, [run])
	return (
		<div className={props.className}>
			{!run && (
				<div className="outer">
					<p class="scramble-text">{scramble}</p>
				</div>
			)}
		</div>
	)
}
export default Scramble
