import React, { useState } from 'react'
import UserSearch from './components/UserSearch'
import { getReposByUser } from './api'
import { CSSTransition } from 'react-transition-group';

export default function Battle () {
  const [firstUsername, setFirstUsername] = useState(null)
  const [secondUsername, setSecondUsername] = useState(null)
  const [result, setResult] = useState(null)
  const [displayResult, setDisplayResult] = useState(false)
  const [displayFight, setDisplayFight] = useState(true)

  const startBattle = () => {
    if (firstUsername && secondUsername) {
      Promise.all([
        getReposByUser(firstUsername),
        getReposByUser(secondUsername)
      ]).then(([reposByFirstUser, reposBySecondUser]) => {
        const firstUserStarCount = reposByFirstUser.reduce((total, current) => {
          return total + current.stargazers_count
        }, 0)  
        const secondUserStarCount = reposBySecondUser.reduce((total, current) => {
          return total + current.stargazers_count
        }, 0)
        if(firstUserStarCount > secondUserStarCount) {
          setResult(`${firstUsername} is da best with ${firstUserStarCount} stars.`)
        } else if (firstUserStarCount < secondUserStarCount) {
          setResult(`${secondUsername} is da best with ${secondUserStarCount} stars.`)
        } else {
          setResult(`Draw. Both user has ${firstUserStarCount} stars`)
        }
        console.log(`First user: ${firstUserStarCount} Second user: ${secondUserStarCount}`)
        setDisplayFight(false)
      })
    }
    // console.log('what')
    // setResult(`Draw. Both user has 0 stars`)
  }

  const onFirstSearch = (username) => {
    setFirstUsername(username)
    newBattle()
  }

  const onSecondSearch = (username) => {
    setSecondUsername(username)
    newBattle()
  }

  const newBattle = () => {
    setResult(null)
    setDisplayResult(false)
  }

  // disabled={!(firstUsername && secondUsername)}
  return (
    <div>
      <h1 className='text-align-center'>Battle page</h1>
      <div className='flex justify-center'>
        <UserSearch userChanged={onFirstSearch}/>
        <div className='battle-wrapper' >
          <CSSTransition in={displayFight} timeout={1000} classNames='fade-in' unmountOnExit onExited={() => setDisplayResult(true)}>
            <button className='button' onClick={startBattle} >Fight!</button> 
          </CSSTransition>
          {/* { !!result && <button className='button' onClick={newBattle}>New battle</button> } */}
          <CSSTransition in={displayResult} timeout={1000} delay=""classNames='fade-in' unmountOnExit onExited={() => setDisplayFight(true)}>
            <div className='battle-wrapper__result'>
              <div className="m-b-1">{result}</div>
              <img src="sword.png"/>
            </div>
          </CSSTransition>
        </div>
        <UserSearch userChanged={onSecondSearch}/>
      </div>
    </div>
  )
}
