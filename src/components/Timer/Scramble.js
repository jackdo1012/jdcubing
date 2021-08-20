import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Scramble.scss'
import Scrambo from 'scrambo'
import { submitScramble } from '../../reducers/Timer/submitScramble'

function Scramble(props) {
	if (localStorage.getItem('scramble-type') === null) {
		localStorage.setItem('scramble-type', '3')
	}
	const dispatch = useDispatch()
	const run = useSelector((state) => state.startOrStop)
	const [scrambleType, setScrambleType] = useState(
		localStorage.getItem('scramble-type')
	)
	const [scramble, setScramble] = useState('')
	useEffect(() => {
		const scrambleList = localStorage.getItem('scramble')
		if (run === 'stop') {
			if (scrambleList === null) {
				localStorage.setItem('scramble', [scramble])
			} else if (scramble !== '') {
				localStorage.setItem(
					'scramble',
					[scramble].concat(scrambleList)
				)
			}
		}
	}, [run])
	useEffect(() => {
		if (run === 'stop') {
			switch (scrambleType) {
				case '2': {
					document.querySelector('.scramble-text').id = 'two'
					let newScram = new Scrambo()
						.type(`${scrambleType}${scrambleType}${scrambleType}`)
						.length(9)
						.get(1)
						.join(' ')
					dispatch(submitScramble({ type: '2', scramble: newScram }))
					setScramble(newScram)
					break
				}
				case '3': {
					document.querySelector('.scramble-text').id = 'three'
					let newScram = new Scrambo()
						.type(`${scrambleType}${scrambleType}${scrambleType}`)
						.length(21)
						.get(1)
						.join(' ')
					dispatch(submitScramble({ type: '3', scramble: newScram }))
					setScramble(newScram)
					break
				}
				case '4': {
					document.querySelector('.scramble-text').id = 'four'
					const scrambleArray = new Scrambo()
						.type(`${scrambleType}${scrambleType}${scrambleType}`)
						.length(42)
						.get(1)
					const newFormatScramble = [...scrambleArray][0].split(' ')
					for (let i = 0; i < newFormatScramble.length; i++) {
						if (
							newFormatScramble[i] ===
							newFormatScramble[i].toLowerCase()
						) {
							if (newFormatScramble[i].includes("'")) {
								newFormatScramble[i] =
									newFormatScramble[i]
										.substring(0, 1)
										.toUpperCase() + "w'"
							} else if (newFormatScramble[i].includes('2')) {
								newFormatScramble[i] =
									newFormatScramble[i]
										.substring(0, 1)
										.toUpperCase() + 'w2'
							} else {
								newFormatScramble[i] =
									newFormatScramble[i].toUpperCase()
							}
						}
					}

					dispatch(
						submitScramble({
							type: '4',
							scramble: newFormatScramble.join(' '),
						})
					)
					setScramble(newFormatScramble.join(' '))
					break
				}
				case '5': {
					document.querySelector('.scramble-text').id = 'five'
					const scrambleArray = new Scrambo()
						.type(`${scrambleType}${scrambleType}${scrambleType}`)
						.length(60)
						.get(1)
					const newFormatScramble = [...scrambleArray][0].split(' ')
					for (let i = 0; i < newFormatScramble.length; i++) {
						if (
							newFormatScramble[i] ===
							newFormatScramble[i].toLowerCase()
						) {
							if (newFormatScramble[i].includes("'")) {
								newFormatScramble[i] =
									newFormatScramble[i]
										.substring(0, 1)
										.toUpperCase() + "w'"
							} else if (newFormatScramble[i].includes('2')) {
								newFormatScramble[i] =
									newFormatScramble[i]
										.substring(0, 1)
										.toUpperCase() + 'w2'
							} else {
								newFormatScramble[i] =
									newFormatScramble[i].toUpperCase()
							}
						}
					}
					dispatch(
						submitScramble({
							type: '5',
							scramble: newFormatScramble.join(' '),
						})
					)
					setScramble(newFormatScramble.join(' '))
					break
				}
				case 'oh': {
					document.querySelector('.scramble-text').id = 'oh'
					let newScram = new Scrambo()
						.type(`333`)
						.length(20)
						.get(1)
						.join(' ')
					dispatch(submitScramble({ type: 'oh', scramble: newScram }))
					setScramble(newScram)
					break
				}
				case 'mega': {
					document.querySelector('.scramble-text').id = 'mega'
					let newScram = new Scrambo()
						.type(`minx`)
						.length(77)
						.get(1)
						.join(' ')
					dispatch(
						submitScramble({ type: 'mega', scramble: newScram })
					)
					setScramble(newScram)
					break
				}
				case 'pyra': {
					document.querySelector('.scramble-text').id = 'pyra'
					let newScram = new Scrambo()
						.type(`pyram`)
						.length(11)
						.get(1)
						.join(' ')
					dispatch(
						submitScramble({ type: 'pyra', scramble: newScram })
					)
					setScramble(newScram)
					break
				}
				case 'ske': {
					document.querySelector('.scramble-text').id = 'ske'
					let newScram = new Scrambo()
						.type(`skewb`)
						.length(8)
						.get(1)
						.join(' ')
					dispatch(
						submitScramble({ type: 'ske', scramble: newScram })
					)
					setScramble(newScram)
					break
				}
			}
		}
	}, [run, scrambleType])
	return (
		<div className={props.className}>
			{run === 'stop' && (
				<div className="outer">
					<div className="selection">
						<span>Scramble: </span>
						<select
							value={scrambleType}
							onChange={(e) => {
								setScrambleType(e.target.value)
								localStorage.setItem(
									'scramble-type',
									e.target.value
								)
							}}
							onFocus={() => {
								if (
									window.matchMedia('(min-width: 1024px)')
										.matches
								) {
									document
										.querySelector('.selection select')
										.blur()
								}
							}}
						>
							<option value="2">2x2</option>
							<option value="3">3x3</option>
							<option value="4">4x4</option>
							<option value="5">5x5</option>
							<option value="oh">3x3 OH</option>
							<option value="mega">Megaminx</option>
							<option value="pyra">Pyraminx</option>
							<option value="ske">Skewb</option>
						</select>
					</div>
					<p className="scramble-text">{scramble}</p>
				</div>
			)}
		</div>
	)
}
export default Scramble
