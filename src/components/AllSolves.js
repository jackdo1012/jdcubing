import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function AllSolves() {
  const run = useSelector((state) => state.startOrStop)
  const plusTwo = useSelector((state) => state.plusTwo)
  const dnf = useSelector((state) => state.dnf)
  const best = useSelector((state) => state.getBest)
  const worst = useSelector((state) => state.getWorst)
  const [timeList, setTimeList] = useState([])
  useEffect(() => {
    if (!run) {
      setTimeList(localStorage.getItem("times").split(","))
    }
  }, [run, plusTwo, dnf])
  useEffect(() => {
    if (worst === "0.00" && best === "0.00") {
      setTimeList([])
    }
  }, [best, worst])
  return (
    <>
      <ul>
        {timeList[timeList.length - 1] !== "" &&
          timeList.map((solve, index) => {
            return (
              <li key={timeList.length - index}>
                {timeList.length - index}. {solve}
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default AllSolves
