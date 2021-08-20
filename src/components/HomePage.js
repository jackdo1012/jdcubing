import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.scss'

function HomePage(props) {
	const [fetchedData, setFetchedData] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		const fetchController = new AbortController()
		const myFunc = async () => {
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
					setIsLoading(false)
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
			{!isLoading && <h1>Home Page</h1>}
			{isLoading && <p>Loading...</p>}
			{!isLoading && (
				<div className="puzzle-choose">
					{Object.entries(fetchedData).map((value) => {
						return (
							<Link
								key={props.generateKey.next().value}
								className={'link ' + value[1].class}
								to={`/algorithm/${value[0]}`}
							>
								<p key={props.generateKey.next().value}>
									{value[0]}
								</p>
								<img
									key={props.generateKey.next().value}
									src={`${process.env.PUBLIC_URL}/assets/img/${value[1].class}.png`}
									alt={value[0]}
								/>
							</Link>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default HomePage
