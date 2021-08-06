import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { hideSetting, showSetting } from "./actions/showHideSetting"
import "./App.scss"
import AllSolves from "./components/AllSolves"
import MiniStats from "./components/MiniStats"
import Penalty from "./components/Penalty"
import Setting from "./components/Setting"
import Stats from "./components/Stats"
import Timer from "./components/Timer"

function App() {
	const dispatch = useDispatch()
	const [settingOn, setSettingOn] = useState(false)
	const run = useSelector((state) => state.startOrStop)
	const firstType = useSelector((state) => state.updateFirstStat)[0]
	const secondType = useSelector((state) => state.updateSecondStat)[0]
	const firstLength = useSelector((state) => state.updateFirstStat)[1]
	const secondLength = useSelector((state) => state.updateSecondStat)[1]
	const session = useSelector((state) => state.session)
	const settingStatus = useSelector((state) => state.settingStatus)

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
				<div className="mobile-navbar">
					<h1>JD Timer</h1>
					<button
						className="mobile-navbar__setting"
						onClick={handleSettingClick}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-gear-wide-connected"
							viewBox="0 0 16 16"
						>
							<path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
						</svg>
					</button>

					<label htmlFor="light-dark">
						<div className="light-dark__button">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="bi bi-moon-fill"
								viewBox="0 0 16 16"
							>
								<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="bi bi-brightness-high-fill"
								viewBox="0 0 16 16"
							>
								<path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
							</svg>
							<div className="light-dark__button--inside"></div>
						</div>
					</label>
				</div>
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
				</div>
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
			</div>
		</>
	)
}

export default App
