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
      />
      <Stats
        firstType={firstType}
        secondType={secondType}
        firstLength={firstLength}
        secondLength={secondLength}
      />
    </div>
  )
}

export default App
