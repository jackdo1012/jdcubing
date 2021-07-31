import React from "react"
import { useSelector } from "react-redux"

const MiniStats = () => {
  const ao = useSelector((state) => state.ao)
  const mo = useSelector((state) => state.mo)
  return (
    <>
      <p>ao5: {ao}</p>
      <p>mo5: {mo}</p>
    </>
  )
}
export default MiniStats
