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
import { updateFirstMiniStat } from "../actions/updateMiniStat/updateFirstMiniStat"
import { updateSecondMiniStat } from "../actions/updateMiniStat/updateSecondMiniStat"

function Function() {
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
  const functionStorage = JSON.parse(localStorage.getItem("function"))
  const [font, setFont] = useState(functionStorage.font)
  const [firstType, setFirstType] = useState(functionStorage.firstType)
  const [secondType, setSecondType] = useState(functionStorage.secondType)
  const [firstLength, setFirstLength] = useState(functionStorage.firstLength)
  const [secondLength, setSecondLength] = useState(functionStorage.secondLength)
  const [functionOn, setFunctionOn] = useState(false)
  useEffect(() => {
    dispatch(updateFirstMiniStat(firstType, firstLength))
    dispatch(updateSecondMiniStat(secondType, secondLength))
    if (firstType === "ao") {
      dispatch(
        getFirstAo(localStorage.getItem("times").split(","), firstLength)
      )
    } else if (firstType === "mo") {
      dispatch(
        getFirstMo(localStorage.getItem("times").split(","), firstLength)
      )
    }
    if (secondType === "ao") {
      dispatch(
        getSecondAo(localStorage.getItem("times").split(","), secondLength)
      )
    } else if (secondType === "mo") {
      dispatch(
        getSecondMo(localStorage.getItem("times").split(","), secondLength)
      )
    }
  }, [firstType, secondType, firstLength, secondLength, font, run])
  useEffect(() => {
    setFunctionOn(false)
  }, [run])
  const handleFunctionClick = () => {
    setFunctionOn(!functionOn)
  }
  return (
    <>
      {!run && (
        <button onClick={handleFunctionClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-sliders"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
            />
          </svg>
        </button>
      )}
      {functionOn && (
        <table>
          <thead>
            <tr>
              <th colSpan="2">Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Font</td>
              <td>
                <select value={font} onChange={(e) => setFont(e.target.value)}>
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
              <td>Stats 1 type</td>
              <td>
                <select
                  value={firstType}
                  onChange={(e) => setFirstType(e.target.value)}
                >
                  <option value="ao">Average</option>
                  <option value="mo">Mean</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Stats 1 length</td>
              <td>
                <input
                  type="number"
                  value={firstLength}
                  onChange={(e) => setFirstLength(e.target.value)}
                  min="3"
                  max="100"
                />
              </td>
            </tr>
            <tr>
              <td>Stats 2 type</td>
              <td>
                <select
                  value={secondType}
                  onChange={(e) => setSecondType(e.target.value)}
                >
                  <option value="ao">Average</option>
                  <option value="mo">Mean</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Stats 2 length</td>
              <td>
                <input
                  type="number"
                  value={secondLength}
                  onChange={(e) => setSecondLength(e.target.value)}
                  min="3"
                  max="100"
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  )
}

export default Function
