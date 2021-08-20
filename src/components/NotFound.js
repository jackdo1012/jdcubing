import React from 'react'
import NavBar from './NavBar'
import './NotFound.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSadTear } from '@fortawesome/free-solid-svg-icons'

function NotFound(props) {
	function* generateKey() {
		let i = 0
		while (true) {
			i++
			yield i
		}
	}
	return (
		<div className={props.className}>
			{props.className !== 'not-found-no-nav' && (
				<NavBar className="nav" generateKey={generateKey()} />
			)}
			<div className="not-found-page">
				<p>
					4<FontAwesomeIcon icon={faSadTear} />4
				</p>
				<p>Error: 404 page not found</p>
				<p>Sorry, the page you're looking for can't be found</p>
			</div>
		</div>
	)
}

export default NotFound
