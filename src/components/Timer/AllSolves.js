import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeSession } from "../../reducers/Timer/changeSession"
import "./AllSolves.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { getNumberOfSolves } from "../../reducers/Timer/getStats/getNumberOfSolves"
import { getBest } from "../../reducers/Timer/getStats/getBest"
import { getWorst } from "../../reducers/Timer/getStats/getWorst"
import { getFirstMiniStats } from "../../reducers/Timer/getMiniStats/getFirstMiniStat"
import { getSecondMiniStats } from "../../reducers/Timer/getMiniStats/getSecondMiniStat"

function AllSolves(props) {
    const dispatch = useDispatch()
    const run = useSelector((state) => state.startOrStop)
    const plusTwo = useSelector((state) => state.plusTwo)
    const dnf = useSelector((state) => state.dnf)
    const best = useSelector((state) => state.getBest)
    const worst = useSelector((state) => state.getWorst)
    const session = useSelector((state) => state.session)
    const [timeList, setTimeList] = useState(
        localStorage.getItem(`times${session}`).split(",")
    )
    useEffect(() => {
        if (worst === "0.00" && best === "0.00") {
            setTimeList([])
        }
        if (run === "stop") {
            setTimeList(localStorage.getItem(`times${session}`).split(","))
        }
    }, [run, plusTwo, dnf, session, best, worst])
    const handleSessionChange = (session) => {
        dispatch(changeSession(Number(session)))
    }
    const formatTime = (time) => {
        if (time === "DNF") {
            return "DNF"
        }
        if (time.split(".")[1].length < 2) {
            time = `${time.split(".")[0]}.${time.split(".")[1]}0`
        }
        if (time.split(".")[0].length >= 2 || time.includes(":")) {
            return time
        } else {
            return "0" + time
        }
    }
    const handleDeleteSolve = (itemIndex) => {
        const newSolveList = [...timeList]
        const newScrambleList = [...localStorage.getItem("scramble").split(",")]
        newSolveList.splice(itemIndex, 1)
        newScrambleList.splice(itemIndex, 1)
        setTimeList(newSolveList)
        localStorage.setItem(`times${session}`, newSolveList)
        localStorage.setItem("scramble", newScrambleList)
        dispatch(getNumberOfSolves(newSolveList))
        dispatch(getBest(newSolveList))
        dispatch(getWorst(newSolveList))
        dispatch(
            getFirstMiniStats(
                localStorage.getItem(`times${session}`).split(",")
            )
        )
        dispatch(
            getSecondMiniStats(
                localStorage.getItem(`times${session}`).split(",")
            )
        )
    }
    return (
        <div className={props.className}>
            {run === "stop" && (
                <div className="solves-table">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2">
                                    <select
                                        value={session}
                                        onChange={(e) =>
                                            handleSessionChange(e.target.value)
                                        }
                                        onFocus={() => {
                                            if (
                                                window.matchMedia(
                                                    "(min-width: 1024px)"
                                                ).matches
                                            ) {
                                                document
                                                    .querySelector("select")
                                                    .blur()
                                            }
                                        }}>
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
                                            <td
                                                onClick={() =>
                                                    alert(
                                                        `Time: ${
                                                            localStorage
                                                                .getItem(
                                                                    `times${session}`
                                                                )
                                                                .split(",")[
                                                                index
                                                            ]
                                                        }\nScramble: ${
                                                            localStorage
                                                                .getItem(
                                                                    `scramble`
                                                                )
                                                                .split(",")[
                                                                index
                                                            ]
                                                        }`
                                                    )
                                                }>
                                                {props.formatTime(
                                                    formatTime(solve)
                                                )}
                                            </td>
                                            <td
                                                onClick={() => {
                                                    handleDeleteSolve(index)
                                                }}>
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AllSolves
