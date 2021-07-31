import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAo, getMo } from "../actions/getMiniStats"
import { getSolvesStats } from "../actions/getNumberOfSolves"

function Stats() {
  const dispatch = useDispatch()
  const solves = useSelector((state) => state.submit)
  const solvesStats = useSelector((state) => state.getSolvesStats)
  useEffect(() => {
    dispatch(getSolvesStats(solves))
  }, [solves])
  const handleResetSolves = () => {
    localStorage.setItem("times", [])
    dispatch(getSolvesStats([]))
    dispatch(getAo([], 5))
    dispatch(getMo([], 5))
  }
  return (
    <>
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
            <td>0:00</td>
          </tr>
          <tr>
            <td>Worst: </td>
            <td>0:00</td>
          </tr>
          <tr>
            <td>Reset: </td>
            <td>
              <button onClick={handleResetSolves}>Reset solves</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Stats
