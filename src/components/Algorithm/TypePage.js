import React, { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import "./TypePage.scss"
import { Link } from "react-router-dom"
import NotFound from "../NotFound"

export default function TypePage(props) {
    const { puzzle } = useParams()
    const [fetchedData, setFetchedData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchController = new AbortController()
        let myFunc = async () => {
            try {
                setIsLoading(true)
                const res = await fetch("/data/sets.json", {
                    signal: fetchController.signal,
                })
                const data = await res.json()
                setFetchedData(data)
                setIsLoading(false)
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
            {isLoading && <p>Loading...</p>}
            {fetchedData[puzzle] !== undefined && <h1>{puzzle}</h1>}
            {!isLoading && fetchedData[puzzle] === undefined && (
                <NotFound className="not-found-no-nav" />
            )}
            <div className="type-list">
                {!isLoading &&
                    fetchedData[puzzle] !== undefined &&
                    Object.entries(fetchedData[puzzle]).map((value, index) => {
                        if (index !== 0) {
                            return (
                                <Link
                                    to={`/algorithm/${puzzle}/${value[0].toLowerCase()}`}
                                    className="type-list-row"
                                    key={props.generateKey.next().value}
                                >
                                    <p key={value[0]}>{value[0]}</p>
                                    <img
                                        src={`${
                                            process.env.PUBLIC_URL
                                        }/assets/img/${puzzle.replace(
                                            " ",
                                            "%20"
                                        )}/${value[0].toLowerCase()}.png`}
                                        alt="logo"
                                    />
                                </Link>
                            )
                        }
                        return ""
                    })}
            </div>
        </div>
    )
}
