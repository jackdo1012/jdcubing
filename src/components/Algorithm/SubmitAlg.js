import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './SubmitAlg.scss'
import emailjs, { init } from 'emailjs-com'

const SubmitAlg = (props) => {
	const [name, setName] = useState('')
	const [puzzle, setPuzzle] = useState('3x3')
	const [sets, setSets] = useState('OLL')
	const [cases, setCases] = useState('')
	const [alg, setAlg] = useState('')
	const [fetchedData, setFetchedData] = useState({})
	const [fetchedCase, setFetchedCase] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const history = useHistory()
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
				setIsLoading(false)
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
	useEffect(() => {
		const fetchController = new AbortController()
		const myFunc = async () => {
			try {
				const res = await fetch(`/data/algorithm/${puzzle}.json`, {
					signal: fetchController.signal,
				})
				const data = await res.json()
				setFetchedCase(data)
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
	}, [puzzle])
	const specialChar = /[`!@#$%^&*_+\-=\[\]{};:"\\|,.<>\/?~]/
	const specialChar2 = /[`!@#$%^&*()+\-=\[\]{};:"\\|,.<>\/?~]/
	const handleSubmit = (e) => {
		if (
			!specialChar.test(alg) &&
			!specialChar2.test(name) &&
			alg !== '' &&
			name !== ''
		) {
			console.log('submitted')
			document
				.querySelectorAll('select, input')
				.forEach((value) => (value.disabled = true))
			history.push('/')
			document.cookie =
				'submit=true; expires=' + new Date(9999, 1, 1).toUTCString()
			init(process.env.REACT_APP_EMAILJS_USER_ID)
			emailjs.send(
				process.env.REACT_APP_EMAILJS_SERVICE_ID,
				process.env.REACT_APP_EMAILJS_TEMPLATES_ID,
				{
					name: name,
					puzzle: puzzle,
					sets: sets,
					cases: cases,
					alg: alg,
				}
			)
		} else {
			alert('Invalid alg or name')
		}
	}
	return (
		<div className={props.className}>
			<h1>Submit Algorithm</h1>
			{!isLoading && (
				<form onSubmit={handleSubmit}>
					<p>Name</p>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Character & number"
						name="name"
					/>
					<p>Type of puzzle</p>
					<select
						value={puzzle}
						onChange={(e) => {
							setPuzzle(e.target.value)
							setSets(Object.keys(fetchedData[e.target.value])[1])
						}}
						name="puzzle"
					>
						{Object.keys(fetchedData).map((value) => (
							<option>{value}</option>
						))}
					</select>
					<p>Algorithm Sets</p>
					<select
						value={sets}
						onChange={(e) => setSets(e.target.value)}
						name="sets"
					>
						{Object.keys(fetchedData[puzzle])
							.filter((a) => a !== 'class')
							.map((value) => (
								<option>{value}</option>
							))}
					</select>
					<p>Case</p>
					<select
						value={cases}
						onChange={(e) => setCases(e.target.value)}
						name="cases"
					>
						{fetchedCase[sets] !== undefined &&
							Object.keys(fetchedCase[sets]).map((value) => {
								if (value !== 'note') {
									return <option>{value}</option>
								}
							})}
					</select>
					<p>Algorithm</p>
					<input
						type="text"
						value={alg}
						onChange={(e) => {
							setAlg(e.target.value)
						}}
						name="alg"
					/>
					<input type="submit" value="Submit" className="submit" />
				</form>
			)}
		</div>
	)
}

export default SubmitAlg
