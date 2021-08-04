import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeSession } from "../actions/changeSession"

function AllSolves() {
  const dispatch = useDispatch()
  const run = useSelector((state) => state.startOrStop)
  const plusTwo = useSelector((state) => state.plusTwo)
  const dnf = useSelector((state) => state.dnf)
  const best = useSelector((state) => state.getBest)
  const worst = useSelector((state) => state.getWorst)
  const session = useSelector((state) => state.session)
  const [timeList, setTimeList] = useState([])
  useEffect(() => {
    if (!run) {
      setTimeList(localStorage.getItem(`times${session}`).split(","))
    }
  }, [run, plusTwo, dnf, session])
  useEffect(() => {
    if (worst === "0.00" && best === "0.00") {
      setTimeList([])
    }
  }, [best, worst])
  const handleSessionChange = (session) => {
    dispatch(changeSession(session))
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan="2">
              <select
                value={session}
                onChange={(e) => handleSessionChange(e.target.value)}
              >
                <option value="1">Session 1</option>
                <option value="2">Session 2</option>
                <option value="3">Session 3</option>
                <option value="4">Session 4</option>
                <option value="5">Session 5</option>
                <option value="6">Session 6</option>
                <option value="7">Session 7</option>
                <option value="8">Session 8</option>
                <option value="9">Session 9</option>
                <option value="10">Session 10</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {timeList[timeList.length - 1] !== "" &&
            timeList.map((solve, index) => {
              return (
                <tr key={timeList.length - index}>
                  <td>{timeList.length - index}</td>
                  <td>{solve}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default AllSolves
