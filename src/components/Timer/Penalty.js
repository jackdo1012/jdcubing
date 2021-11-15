import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFirstMiniStats } from "../../reducers/Timer/getMiniStats/getFirstMiniStat"
import { getSecondMiniStats } from "../../reducers/Timer/getMiniStats/getSecondMiniStat"
import { getBest } from "../../reducers/Timer/getStats/getBest"
import { getNumberOfSolves } from "../../reducers/Timer/getStats/getNumberOfSolves"
import { getWorst } from "../../reducers/Timer/getStats/getWorst"
import { getDnf } from "../../reducers/Timer/penalty/dnf"
import { getPlusTwo } from "../../reducers/Timer/penalty/plusTwo"
import "./Penalty.scss"

function Penalty(props) {
    const dispatch = useDispatch()
    const [renderCount, setRenderCount] = useState(1)
    const [plusTwo, setPlusTwo] = useState("")
    const [dnf, setDnf] = useState("")
    const [runAvailable, setRunAvailable] = useState(true)
    const run = useSelector((state) => state.startOrStop)
    const session = useSelector((state) => state.session)
    const numberOfSolves = useSelector((state) => state.numberOfSolves)
    const resetMiniStats = () => {
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
    useEffect(() => {
        setRunAvailable(true)
        if (renderCount < 4) {
            setRenderCount((renderCount) => renderCount + 1)
        }
        if (run === "stop") {
            setPlusTwo("+2")
            setDnf("DNF")
        } else {
            setPlusTwo("")
            setDnf("")
        }
    }, [run])
    const handlePlusTwo = () => {
        dispatch(getPlusTwo(session))
        setRunAvailable(false)
        resetMiniStats()
        dispatch(getBest(localStorage.getItem(`times${session}`).split(",")))
        dispatch(getWorst(localStorage.getItem(`times${session}`).split(",")))
    }
    const handleDnf = () => {
        dispatch(getDnf(session))
        setRunAvailable(false)
        resetMiniStats()
        dispatch(
            getNumberOfSolves(
                localStorage.getItem(`times${session}`).split(",")
            )
        )
        dispatch(getBest(localStorage.getItem(`times${session}`).split(",")))
        dispatch(getWorst(localStorage.getItem(`times${session}`).split(",")))
    }

    return (
        <div className={props.className}>
            {run === "stop" && numberOfSolves !== "0/0" && (
                <div className="outer-penalty">
                    {renderCount > 3 && runAvailable && (
                        <button
                            onClick={handlePlusTwo}
                            className="plus-two-btn">
                            {plusTwo}
                        </button>
                    )}
                    {renderCount > 3 && runAvailable && (
                        <button onClick={handleDnf} className="dnf-btn">
                            {dnf}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Penalty
