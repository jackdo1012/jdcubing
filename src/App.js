import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import './App.scss'
import AlgList from './components/Algorithm/AlgList'
import CaseAlg from './components/Algorithm/CaseAlg'
import SubmitAlg from './components/Algorithm/SubmitAlg'
import TypePage from './components/Algorithm/TypePage'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import NotFound from './components/NotFound'
import MainTimer from './components/Timer'

function App() {
	function* generateKey() {
		let i = 0
		while (true) {
			i++
			yield i
		}
	}
	return (
		<Router>
			<Route path={['/home', '/algorithm']}>
				<NavBar className="nav" generateKey={generateKey()} />
			</Route>
			<Switch>
				<Route exact path="/">
					<Redirect to="/home" />
				</Route>
				<Route exact path="/home">
					<HomePage className="home-page" generateKey={generateKey()} />
				</Route>
				<Route exact path="/timer">
					<MainTimer />
				</Route>
				<Route exact path="/algorithm/:puzzle">
					<TypePage className="type-page" />
				</Route>
				<Route exact path="/algorithm/:puzzle/:type">
					<AlgList className="alg-list" />
				</Route>
				<Route exact path="/algorithm/:puzzle/:type/:cases">
					<CaseAlg className="case-algorithm" />
				</Route>
				{!document.cookie.includes('submit=true') && (
					<Route>
						<NavBar className="nav" generateKey={generateKey()} />
						<SubmitAlg className="submit-alg" />
					</Route>
				)}
				<Route path="*">
					<NotFound className="not-found" />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
