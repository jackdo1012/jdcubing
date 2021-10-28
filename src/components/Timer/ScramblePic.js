import React, { useEffect, useState } from "react"
import Cubid from "cubid"
import "./ScramblePic.scss"
import { convertToText } from "number-to-text"
import "number-to-text/converters/en-us"
import { useSelector } from "react-redux"

function ScramblePic(props) {
    const scramble = useSelector((state) => state.scramble)
    const run = useSelector((state) => state.startOrStop)
    const [scrambleString, setScrambleString] = useState("")
    useEffect(() => {
        if (
            scramble.scramble !== undefined &&
            (scramble.type === "2" || scramble.type === "3")
        ) {
            setScrambleString(scramble.scramble)
        }
    }, [scramble])
    const cube = new Cubid(scrambleString)

    return (
        <div className={props.className}>
            {run === "stop" && (
                <div className="outer-scramble-pic">
                    {(scramble.type === "3" || scramble.type === "2") && (
                        <table className="diagram">
                            <tbody>
                                <tr>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                    <td
                                        id={convertToText(
                                            cube.contents[0]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[1]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[2]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                </tr>
                                {scramble.type === "3" && (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td
                                            id={convertToText(
                                                cube.contents[3]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                        <td
                                            style={{ backgroundColor: "white" }}
                                        ></td>
                                        <td
                                            id={convertToText(
                                                cube.contents[5]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )}
                                <tr>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                    <td
                                        id={convertToText(
                                            cube.contents[6]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[7]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[8]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                </tr>
                                <tr>
                                    <td
                                        id={convertToText(
                                            cube.contents[9]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[10]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[11]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    <td
                                        id={convertToText(
                                            cube.contents[12]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[13]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[14]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    <td
                                        id={convertToText(
                                            cube.contents[15]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[16]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[17]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    <td
                                        id={convertToText(
                                            cube.contents[53]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[52]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[51]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                </tr>
                                {scramble.type === "3" && (
                                    <tr>
                                        <td
                                            id={convertToText(
                                                cube.contents[18]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                        <td
                                            style={{
                                                backgroundColor: "#ffaa00",
                                            }}
                                        ></td>
                                        <td
                                            id={convertToText(
                                                cube.contents[20]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                        <td
                                            id={convertToText(
                                                cube.contents[21]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                        <td
                                            style={{
                                                backgroundColor: "#00dd00",
                                            }}
                                        ></td>
                                        <td
                                            id={convertToText(
                                                cube.contents[23]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                        <td
                                            id={convertToText(
                                                cube.contents[24]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                        <td
                                            style={{ backgroundColor: "red" }}
                                        ></td>
                                        <td
                                            id={convertToText(
                                                cube.contents[26]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                        <td
                                            id={convertToText(
                                                cube.contents[50]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                        <td
                                            style={{
                                                backgroundColor: "#0400fe",
                                            }}
                                        ></td>
                                        <td
                                            id={convertToText(
                                                cube.contents[48]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td
                                        id={convertToText(
                                            cube.contents[27]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[28]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[29]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    <td
                                        id={convertToText(
                                            cube.contents[30]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[31]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[32]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    <td
                                        id={convertToText(
                                            cube.contents[33]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[34]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[35]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    <td
                                        id={convertToText(
                                            cube.contents[47]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[46]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[45]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                    <td
                                        id={convertToText(
                                            cube.contents[36]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[37]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[38]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                </tr>
                                {scramble.type === "3" && (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td
                                            id={convertToText(
                                                cube.contents[39]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                        <td
                                            style={{
                                                backgroundColor: "yellow",
                                            }}
                                        ></td>
                                        <td
                                            id={convertToText(
                                                cube.contents[41]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )}
                                <tr>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                    <td
                                        id={convertToText(
                                            cube.contents[42]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    {scramble.type === "3" && (
                                        <td
                                            id={convertToText(
                                                cube.contents[43]
                                            ).replace(" ", "-")}
                                        >
                                            00
                                        </td>
                                    )}
                                    <td
                                        id={convertToText(
                                            cube.contents[44]
                                        ).replace(" ", "-")}
                                    >
                                        00
                                    </td>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                    <td></td>
                                    {scramble.type === "3" && <td></td>}
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    {scramble.type !== "3" && scramble.type !== "2" && (
                        <p>No Support</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default ScramblePic
