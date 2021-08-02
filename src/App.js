import { useSelector } from "react-redux"

import "./App.scss"
import Function from "./components/Function"
import MiniStats from "./components/MiniStats"
import Penalty from "./components/Penalty"
import Stats from "./components/Stats"
import Timer from "./components/Timer"

function App() {
  const firstType = useSelector((state) => state.updateFirstStat)[0]
  const secondType = useSelector((state) => state.updateSecondStat)[0]
  const firstLength = useSelector((state) => state.updateFirstStat)[1]
  const secondLength = useSelector((state) => state.updateSecondStat)[1]

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
      )}:${formatToTwoDigit((Number(time.split(".")[0]) % 60).toString())}.${
        time.split(".")[1]
      }`
    } else {
      return time
    }
  }

  return (
    <div className="App">
      <h1>Rubik Timer</h1>
      <Timer />
      <Penalty
        firstType={firstType}
        secondType={secondType}
        firstLength={firstLength}
        secondLength={secondLength}
      />
      <Function />
      <MiniStats
        firstType={firstType}
        secondType={secondType}
        firstLength={firstLength}
        secondLength={secondLength}
        formatTime={formatTime}
      />
      <Stats
        firstType={firstType}
        secondType={secondType}
        firstLength={firstLength}
        secondLength={secondLength}
        formatTime={formatTime}
      />
    </div>
  )
}

export default App
