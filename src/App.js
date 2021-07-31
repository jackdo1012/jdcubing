import "./App.scss"
import Function from "./components/Function"
import MiniStats from "./components/MiniStats"
import Penalty from "./components/Penalty"
import Stats from "./components/Stats"
import Timer from "./components/Timer"

function App() {
  return (
    <div className="App">
      <h1>Rubik Timer</h1>
      <Timer />
      <Penalty />
      <Function />
      <MiniStats />
      <Stats />
    </div>
  )
}

export default App
