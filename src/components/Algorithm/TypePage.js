import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './TypePage.scss'
import { Link } from 'react-router-dom'

export default function TypePage(props) {
	const { puzzle } = useParams()
	const [fetchedData, setFetchedData] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		const fetchController = new AbortController()
		let myFunc = async () => {
			try {
				setIsLoading(true)
				const res = await fetch('/data/sets.json', {
					signal: fetchController.signal,
				})
				const data = await res.json()
				setFetchedData(data)
				setIsLoading(false)
			} catch (err) {
				if (err.name !== 'AbortError') {
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
			<h1>{puzzle}</h1>
			<div className="type-list">
				{isLoading && <p>Loading...</p>}
				{!isLoading &&
					Object.entries(fetchedData[puzzle]).map((value, index) => {
						if (index !== 0) {
							return (
								<Link
									to={`/algorithm/${puzzle}/${value[0].toLowerCase()}`}
									className="type-list-row"
								>
									<p key={value[0]}>{value[0]}</p>
									<img
										src={`${
											process.env.PUBLIC_URL
										}/assets/img/${puzzle}/${value[0].toLowerCase()}.png`}
										alt="logo"
									/>
								</Link>
							)
						}
					})}
			</div>
		</div>
	)
}
