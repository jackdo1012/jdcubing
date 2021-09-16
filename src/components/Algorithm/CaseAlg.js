import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NotFound from '../NotFound'
import './CaseAlg.scss'

function CaseAlg(props) {
  const { puzzle, type, cases } = useParams()
  const [fetchedData, setFetchedData] = useState([])
  const [permutation, setPermutation] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchController = new AbortController()
    const myFunc = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`/data/algorithm/${puzzle}.json`, {
          signal: fetchController.signal,
        })
        const data = await res.json()

        Object.entries(data[type.toUpperCase()]).forEach((value) => {
          if (value[0].toLowerCase() === cases.replace('_', '/')) {
            setPermutation(value[0])
            setFetchedData(value[1])
          }
        })
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
  console.log(fetchedData)
  return (
    <div className={props.className}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && fetchedData['alg'] === undefined && (
        <NotFound className="not-found-no-nav" />
      )}
      {!isLoading && fetchedData['alg'] !== undefined && (
        <div className="case">
          <p className="case__title">{`${type.toUpperCase()} ${permutation}`}</p>
          <img
            src={`${process.env.PUBLIC_URL}${fetchedData.img}`}
            alt="case-img"
            className="case__img"
          />
          <p className="author">Author: {fetchedData['author'].join(', ')}</p>
          <ul className="case__alg-list">
            {fetchedData['alg'].map((value) => {
              return <li>{value}</li>
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CaseAlg
