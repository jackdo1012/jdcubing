import React, { useState } from "react"

function Function() {
  const [firstType, setFirstType] = useState("ao")
  return (
    <>
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
              <select>
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
              <select value={firstType}>
                <option value="ao">Average</option>
                <option value="mo">Mean</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Stats 1 length</td>
            <td>
              <input type="number" placeholder="1" min="1" max="100" />
            </td>
          </tr>
          <tr>
            <td>Stats 2 type</td>
            <td>
              <select>
                <option value="ao">Average</option>
                <option value="mo">Mean</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Stats 2 length</td>
            <td>
              <input type="number" placeholder="1" min="1" max="100" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Function
