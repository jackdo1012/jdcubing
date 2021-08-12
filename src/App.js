import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { hideSetting, showSetting } from "./reducers/showHideSetting"
import "./App.scss"
import AllSolves from "./components/AllSolves"
import MiniStats from "./components/MiniStats"
import Penalty from "./components/Penalty"
import Setting from "./components/Setting"
import Stats from "./components/Stats"
import Timer from "./components/Timer"
import Scramble from "./components/Scramble"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { faLightbulb, faMoon } from "@fortawesome/free-regular-svg-icons"
import ScramblePic from "./components/ScramblePic"

function App() {
	const dispatch = useDispatch()
	const [settingOn, setSettingOn] = useState(false)
	const run = useSelector((state) => state.startOrStop)
	const firstType = useSelector((state) => state.updateFirstMiniStat)[0]
	const secondType = useSelector((state) => state.updateSecondMiniStat)[0]
	const firstLength = useSelector((state) => state.updateFirstMiniStat)[1]
	const secondLength = useSelector((state) => state.updateSecondMiniStat)[1]
	const session = useSelector((state) => state.session)
	const settingStatus = useSelector((state) => state.settingStatus.state)

	useEffect(() => {
		if (!run) {
			setSettingOn(false)
		}
	}, [run])

	if (!localStorage.getItem(`times${session}`)) {
		localStorage.setItem(`times${session}`, [])
	}

	const formatToTwoDigit = (time) => {
		if (time.length === 1) {
			return `0${time}`
		} else {
			return time
		}
	}

	const formatTime = (time) => {
		if (Number(time) >= 60) {
			time = time.toString()
			return `${formatToTwoDigit(
				Math.floor(Number(time.split(".")[0]) / 60).toString()
			)}:${formatToTwoDigit(
				(Number(time.split(".")[0]) % 60).toString()
			)}.${time.split(".")[1]}`
		} else {
			return time
		}
	}

	const handleSettingClick = () => {
		if (settingStatus) {
			dispatch(hideSetting())
		} else if (!settingStatus) {
			dispatch(showSetting())
		}
	}

	return (
		<>
			<input
				type="checkbox"
				id="light-dark"
				style={{ visibility: "hidden", display: "none" }}
			/>
			<div className="App">
				{!run && (
					<div className="navbar">
						<h1>JD Timer</h1>
						<button
							className="navbar__setting"
							onClick={handleSettingClick}
						>
							<FontAwesomeIcon icon={faCog} />
						</button>

						<label htmlFor="light-dark">
							<div className="light-dark__button">
								<FontAwesomeIcon
									className="light-dark__icon moon"
									icon={faMoon}
								/>
								<FontAwesomeIcon
									className="light-dark__icon sun"
									icon={faLightbulb}
								/>
								<div className="light-dark__button--inside"></div>
							</div>
						</label>
					</div>
				)}
				<div className="main">
					<Timer className="timer" />
					<Penalty
						firstType={firstType}
						secondType={secondType}
						firstLength={firstLength}
						secondLength={secondLength}
						className="penalty"
					/>

					<Setting className="setting" settingOn={settingOn} />
					<MiniStats
						firstType={firstType}
						secondType={secondType}
						firstLength={firstLength}
						secondLength={secondLength}
						formatTime={formatTime}
						className="mini-stats"
					/>
					<Stats
						firstType={firstType}
						secondType={secondType}
						firstLength={firstLength}
						secondLength={secondLength}
						formatTime={formatTime}
						className="stats"
					/>
					<AllSolves className="all-solves" formatTime={formatTime} />
					<Scramble className="scramble" />
					<ScramblePic className="scramble-pic" />
				</div>
				{/* {!run && (
					<div className="footer">
						<a
							href="https://ongdev.link/jdcubing"
							rel="noreferrer"
							target="_blank"
						>
							Youtube
						</a>
						<br />
						<a
							href="https://ongdev.link/jd1012"
							rel="noreferrer"
							target="_blank"
						>
							Facebook
						</a>
					</div>
				)} */}
			</div>
		</>
	)
}

export default App
