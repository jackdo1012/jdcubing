import React, { useEffect, useState } from 'react'
import './MainPage.scss'
import { useHistory } from 'react-router-dom'

export default function MainPage(props) {
	const [fetchedData, setFetchedData] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const history = useHistory()
	const handleRedirect = (firstValue, secondValue) => {
		history.push(`/algorithm/${firstValue}/${secondValue}`)
	}
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
			<h1>Algorithm</h1>
			{isLoading && <p>Loading...</p>}
			{!isLoading &&
				Object.entries(fetchedData).map((value) => (
					<div
						className={
							Object.values(value[1])[0] +
							' type-of-alg-container'
						}
					>
						<input type="checkbox" id={value[0]} />
						<label htmlFor={value[0]}>{value[0]}</label>
						<div className="type-of-alg">
							{Object.entries(value[1]).map(
								(secondValue, index) => {
									if (index !== 0) {
										return (
											<div
												onClick={() => {
													handleRedirect(
														value[0],
														secondValue[0]
													)
												}}
												className="type-of-alg-row"
											>
												<p>{secondValue[0]}</p>
												<p>{secondValue[1]} cases</p>
											</div>
										)
									}
								}
							)}
						</div>
					</div>
				))}
		</div>
	)
}
