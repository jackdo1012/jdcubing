import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import NotFound from "../NotFound"
import "./AlgList.scss"

function AlgList(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [fetchedData, setFetchedData] = useState({})
    const [group, setGroup] = useState(false)
    const { puzzle, type } = useParams()

    useEffect(() => {
        const fetchController = new AbortController()
        const myFunc = async () => {
            try {
                setIsLoading(true)
                const res = await fetch(`/data/algorithm/${puzzle}.json`, {
                    signal: fetchController.signal,
                })
                const data = await res.json()
                setFetchedData(data[type.toUpperCase()])
                setIsLoading(false)

                Object.entries(data[type.toUpperCase()]).forEach((value) => {
                    if (value[1].group !== undefined) {
                        setGroup(true)
                    }
                })
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.log(err)
                }
            }
        }
        myFunc()
        return () => {
            fetchController.abort()
        }
    }, [])

    return (
        <div className={props.className}>
            {!isLoading && fetchedData === undefined && (
                <NotFound className="not-found-no-nav" />
            )}
            {!isLoading && fetchedData !== undefined && <p>{puzzle}</p>}
            {isLoading && <p>Loading...</p>}
            {fetchedData !== undefined &&
                !isLoading &&
                Object.entries(fetchedData).map((value) => {
                    if (value[0] === "note") {
                        return (
                            <p
                                className="note"
                                key={props.generateKey.next().value}
                            >
                                {value[1]}
                            </p>
                        )
                    } else {
                        return null
                    }
                })}
            {fetchedData !== undefined && !isLoading && (
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Case</th>
                            {group && <th>Group</th>}
                            <th>Alg</th>
                        </tr>
                        {Object.entries(fetchedData).map(
                            (firstValue, index) => {
                                if (index !== 0 || firstValue[0] !== "note") {
                                    return (
                                        <tr
                                            key={props.generateKey.next().value}
                                        >
                                            <td>
                                                <Link
                                                    to={`/algorithm/${puzzle}/${type}/${firstValue[0]
                                                        .toLowerCase()
                                                        .replaceAll("/", "_")}`}
                                                >
                                                    {firstValue[0]}
                                                </Link>
                                            </td>
                                            {firstValue[1].img !==
                                                undefined && (
                                                <td>
                                                    <Link
                                                        to={`/algorithm/${puzzle}/${type}/${firstValue[0]
                                                            .toLowerCase()
                                                            .replaceAll(
                                                                "/",
                                                                "_"
                                                            )}`}
                                                    >
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}${firstValue[1].img}`}
                                                            alt=""
                                                        />
                                                    </Link>
                                                </td>
                                            )}
                                            {firstValue[1].group !==
                                                undefined && (
                                                <td>{firstValue[1].group}</td>
                                            )}
                                            <td>
                                                {firstValue[1].alg.map(
                                                    (thirdValue, index) => {
                                                        if (index <= 1) {
                                                            return (
                                                                <div
                                                                    key={
                                                                        props.generateKey.next()
                                                                            .value
                                                                    }
                                                                >
                                                                    {thirdValue}
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div
                                                                    key={
                                                                        props.generateKey.next()
                                                                            .value
                                                                    }
                                                                >
                                                                    ...
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                )}
                                            </td>
                                        </tr>
                                    )
                                } else {
                                    return null
                                }
                            }
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AlgList
