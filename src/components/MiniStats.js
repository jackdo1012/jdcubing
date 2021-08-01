import React from "react"
import { useSelector } from "react-redux"

const MiniStats = (props) => {
  const firstType = props.firstType
  const secondType = props.secondType
  const firstLength = props.firstLength
  const secondLength = props.secondLength
  const ao = useSelector((state) => state.ao)
  const mo = useSelector((state) => state.mo)
  return (
    <>
      <p>
        {firstType}
        {firstLength}: {firstType === "ao" ? ao : mo}
      </p>
      <p>
        {secondType}
        {secondLength}: {secondType === "ao" ? ao : mo}
      </p>
    </>
  )
}
export default MiniStats
