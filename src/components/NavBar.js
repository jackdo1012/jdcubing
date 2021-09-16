import {
  faBars,
  faCaretDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NavBar.scss'

function NavBar(props) {
  const location = useLocation()
  const [fetchedData, setFetchedData] = useState({})
  useEffect(() => {
    const fetchController = new AbortController()
    const myFunc = async () => {
      try {
        const res = await fetch('/data/sets.json', {
          signal: fetchController.signal,
        })
        const data = await res.json()
        setFetchedData(data)
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
      <div className="hamburger">
        <label htmlFor="open-nav">
          <FontAwesomeIcon icon={faBars} />
        </label>
      </div>
      <input type="checkbox" id="open-nav" />
      <label htmlFor="open-nav">
        <div className="dark-layer"></div>
      </label>
      <div className="nav-item">
        <div
          className={`home-page-link${
            location.pathname.includes('home') ? ' active' : ''
          }`}
        >
          <Link to="/">Jack Do</Link>
        </div>
        <div
          className={`algorithm-link${
            location.pathname.includes('algorithm') ? ' active' : ''
          }`}
        >
          <label htmlFor="open-sub-nav">
            <p>
              Algorithm <FontAwesomeIcon icon={faCaretDown} />
            </p>
          </label>
          <input type="checkbox" id="open-sub-nav" />
          <div className="sub-nav">
            {Object.entries(fetchedData).map((value) => {
              return (
                <div
                  className="sub-nav-title"
                  key={props.generateKey.next().value}
                >
                  <label htmlFor={value[0]}>
                    <p>{value[0]} </p>
                    {window.matchMedia('(max-width: 800px)').matches ? (
                      <FontAwesomeIcon icon={faCaretDown} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretRight} />
                    )}
                  </label>
                  <input type="checkbox" id={value[0]} />
                  <div
                    className="sub-nav2"
                    key={props.generateKey.next().value}
                  >
                    {Object.keys(value[1]).map((value2) => {
                      if (value2 !== 'class') {
                        return (
                          <a
                            href={`/algorithm/${
                              value[0]
                            }/${value2.toLowerCase()}`}
                            className="sub-nav2-link"
                            key={props.generateKey.next().value}
                          >
                            {value2}
                          </a>
                        )
                      }
                      return ''
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="timer-link">
          <Link to="/timer">Timer</Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar
