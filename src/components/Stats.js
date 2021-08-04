import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getFirstAo,
  getFirstMo,
} from "../actions/getMiniStats/getFirstMiniStats"
import {
  getSecondAo,
  getSecondMo,
} from "../actions/getMiniStats/getSecondMiniStats"
import { getBest } from "../actions/getStats/getBest"
import { getSolvesStats } from "../actions/getStats/getNumberOfSolves"
import { getWorst } from "../actions/getStats/getWorst"

function Stats(props) {
  const firstType = props.firstType
  const secondType = props.secondType
  const firstLength = props.firstLength
  const secondLength = props.secondLength
  const formatTime = props.formatTime
  const dispatch = useDispatch()
  const solves = useSelector((state) => state.submit)
  const solvesStats = useSelector((state) => state.getSolvesStats)
  const run = useSelector((state) => state.startOrStop)
  const best = useSelector((state) => state.getBest)
  const worst = useSelector((state) => state.getWorst)
  const session = useSelector((state) => state.session)
  useEffect(() => {
    dispatch(getSolvesStats(localStorage.getItem(`times${session}`).split(",")))
    dispatch(getBest(localStorage.getItem(`times${session}`).split(",")))
    dispatch(getWorst(localStorage.getItem(`times${session}`).split(",")))
  }, [solves, session])
  const handleResetSolves = () => {
    localStorage.setItem(`times${session}`, [])
    dispatch(getSolvesStats([]))
    dispatch(getBest([0]))
    dispatch(getWorst([0]))
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
  }
  return (
    <>
      {!run && (
        <table>
          <thead>
            <tr>
              <th colSpan="2">Stats</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Solves: </td>
              <td>{solvesStats}</td>
            </tr>
            <tr>
              <td>Best: </td>
              <td>{formatTime(best)}</td>
            </tr>
            <tr>
              <td>Worst: </td>
              <td>{formatTime(worst)}</td>
            </tr>
            <tr>
              <td>Reset: </td>
              <td>
                <button onClick={handleResetSolves}>Reset solves</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  )
}

export default Stats
